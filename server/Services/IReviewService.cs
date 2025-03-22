using server.Models;
using server.Models.DTOs;

namespace server.Services
{
    public interface IReviewService
    {
        Task<Review> CreateReviewAsync(Guid userId, Guid reviewerId, CreateReviewDto reviewDto);
        Task<List<ReviewDto>> GetUserReviewsAsync(Guid userId);
        Task<UserRatingDto> GetUserRatingAsync(Guid userId);
        Task<bool> DeleteReviewAsync(Guid reviewId, Guid reviewerId);
        Task<List<Tag>> GetTagsAsync();
    }
}