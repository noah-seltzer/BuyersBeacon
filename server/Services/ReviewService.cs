using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.DTOs;

namespace server.Services
{
    public class ReviewService : IReviewService
    {
        private readonly ApplicationDbContext _context;

        public ReviewService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Review> CreateReviewAsync(Guid userId, Guid reviewerId, CreateReviewDto reviewDto)
        {
            // Create a new review
            var review = new Review
            {
                UserId = userId,
                ReviewerId = reviewerId,
                Rating = reviewDto.Rating,
                CreatedAt = DateTime.UtcNow
            };

            _context.Reviews.Add(review);

            // Process tags
            if (reviewDto.TagNames != null && reviewDto.TagNames.Count > 0)
            {
                foreach (var tagName in reviewDto.TagNames)
                {
                    // Find existing tag or create a new one
                    var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Name == tagName);
                    if (tag == null)
                    {
                        tag = new Tag { Name = tagName };
                        _context.Tags.Add(tag);
                        await _context.SaveChangesAsync(); // Save to get the TagId
                    }

                    // Create ReviewTag relationship
                    var reviewTag = new ReviewTag
                    {
                        ReviewId = review.ReviewId,
                        TagId = tag.TagId
                    };
                    _context.ReviewTags.Add(reviewTag);
                }
            }

            await _context.SaveChangesAsync();

            // Update user's average rating
            await UpdateUserRatingAsync(userId);

            return review;
        }

        public async Task<List<ReviewDto>> GetUserReviewsAsync(Guid userId)
        {
            var reviews = await _context.Reviews
                .Where(r => r.UserId == userId)
                .Include(r => r.Reviewer)
                .Include(r => r.ReviewTags)
                .ThenInclude(rt => rt.Tag)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            var reviewDtos = reviews.Select(r => new ReviewDto
            {
                ReviewId = r.ReviewId,
                Rating = r.Rating,
                CreatedAt = r.CreatedAt,
                Reviewer = new UserSummaryDto
                {
                    UserId = r.Reviewer.UserId,
                    DisplayName = r.Reviewer.DisplayName ?? "Anonymous User"
                },
                Tags = r.ReviewTags.Select(rt => rt.Tag.Name).ToList()
            }).ToList();

            return reviewDtos;
        }

        public async Task<UserRatingDto> GetUserRatingAsync(Guid userId)
        {
            var user = await _context.Users
                .Where(u => u.UserId == userId)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return new UserRatingDto
                {
                    AverageRating = 0,
                    TotalReviews = 0,
                    TopTags = new List<TagCountDto>()
                };
            }

            // Get top tags with counts
            var tagCounts = await _context.ReviewTags
                .Where(rt => rt.Review.UserId == userId)
                .GroupBy(rt => rt.Tag.Name)
                .Select(g => new TagCountDto
                {
                    TagName = g.Key,
                    Count = g.Count()
                })
                .OrderByDescending(tc => tc.Count)
                .Take(10) // Top 10 most used tags
                .ToListAsync();

            return new UserRatingDto
            {
                AverageRating = user.AverageRating,
                TotalReviews = user.TotalReviews,
                TopTags = tagCounts
            };
        }

        public async Task<bool> DeleteReviewAsync(Guid reviewId, Guid reviewerId)
        {
            var review = await _context.Reviews
                .FirstOrDefaultAsync(r => r.ReviewId == reviewId && r.ReviewerId == reviewerId);

            if (review == null)
                return false;

            // Remove associated ReviewTags
            var reviewTags = await _context.ReviewTags
                .Where(rt => rt.ReviewId == reviewId)
                .ToListAsync();

            _context.ReviewTags.RemoveRange(reviewTags);
            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            // Update user's average rating
            await UpdateUserRatingAsync(review.UserId);

            return true;
        }

        public async Task<List<Tag>> GetTagsAsync()
        {
            return await _context.Tags.ToListAsync();
        }

        // Helper method to update a user's average rating
        private async Task UpdateUserRatingAsync(Guid userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return;

            var reviews = await _context.Reviews
                .Where(r => r.UserId == userId)
                .ToListAsync();

            if (reviews.Count > 0)
            {
                user.AverageRating = reviews.Average(r => r.Rating);
                user.TotalReviews = reviews.Count;
            }
            else
            {
                user.AverageRating = 0;
                user.TotalReviews = 0;
            }

            await _context.SaveChangesAsync();
        }
    }
}