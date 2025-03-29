using server.Models;
using server.Models.DTOs;

namespace server.Services
{
    public interface IReviewService
    {
        Task<Review> CreateReviewAsync(Guid userId, Guid reviewerId, CreateReviewDto reviewDto);
        Task<(List<ReviewDto> Reviews, int TotalCount)> GetUserReviewsAsync(Guid userId, int page = 1, int pageSize = 10);
        Task<UserRatingDto> GetUserRatingAsync(Guid userId);
        Task<bool> DeleteReviewAsync(Guid reviewId, Guid reviewerId);
        Task<List<Tag>> GetTagsAsync();
    }
}