using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Models.DTOs;
using server.Services;
using System.Security.Authentication;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewService _reviewService;
        private readonly IClerkService _clerkService;
        private readonly IUserService _userService;

        public ReviewsController(IReviewService reviewService, IClerkService clerkService, IUserService userService)
        {
            _reviewService = reviewService;
            _clerkService = clerkService;
            _userService = userService;
        }

        [HttpPost("user/{userId}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Review>> CreateReview(Guid userId, [FromBody] CreateReviewDto reviewDto)
        {
            try
            {
                var clerkUserId = await _clerkService.VerifyUserSessionToken(HttpContext.Request);
                if (string.IsNullOrEmpty(clerkUserId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                // Get the reviewer's application user ID
                var reviewer = await _userService.GetUserByClerkIdAsync(clerkUserId);
                if (reviewer == null)
                {
                    return BadRequest("Reviewer not found.");
                }

                // Don't allow users to review themselves
                if (reviewer.UserId == userId)
                {
                    return BadRequest("Users cannot review themselves.");
                }

                var review = await _reviewService.CreateReviewAsync(userId, reviewer.UserId, reviewDto);

                return CreatedAtAction(nameof(GetUserReviews), new { userId }, review);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("user/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<object>> GetUserReviews(Guid userId, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var (reviews, totalCount) = await _reviewService.GetUserReviewsAsync(userId, page, pageSize);
            return Ok(new
            {
                reviews,
                totalCount,
                page,
                pageSize,
                totalPages = (int)Math.Ceiling((double)totalCount / pageSize)
            });
        }

        [HttpGet("user/{userId}/rating")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UserRatingDto>> GetUserRating(Guid userId)
        {
            var rating = await _reviewService.GetUserRatingAsync(userId);
            return Ok(rating);
        }

        [HttpDelete("{reviewId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteReview(Guid reviewId)
        {
            try
            {
                var clerkUserId = await _clerkService.VerifyUserSessionToken(HttpContext.Request);
                if (string.IsNullOrEmpty(clerkUserId))
                {
                    return Unauthorized("User is not authenticated.");
                }

                var reviewer = await _userService.GetUserByClerkIdAsync(clerkUserId);
                if (reviewer == null)
                {
                    return Unauthorized("Reviewer not found.");
                }

                var result = await _reviewService.DeleteReviewAsync(reviewId, reviewer.UserId);
                if (!result)
                {
                    return NotFound("Review not found or you are not authorized to delete it.");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("tags")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<Tag>>> GetTags()
        {
            var tags = await _reviewService.GetTagsAsync();
            return Ok(tags);
        }
    }
}