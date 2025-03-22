namespace server.Models.DTOs
{
    public class ReviewDto
    {
        public Guid ReviewId { get; set; }
        public int Rating { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserSummaryDto Reviewer { get; set; }
        public List<string> Tags { get; set; } = new List<string>();
    }

    public class UserSummaryDto
    {
        public Guid UserId { get; set; }
        public string DisplayName { get; set; }
    }

    public class UserRatingDto
    {
        public double AverageRating { get; set; }
        public int TotalReviews { get; set; }
        public List<TagCountDto> TopTags { get; set; } = new List<TagCountDto>();
    }

    public class TagCountDto
    {
        public string TagName { get; set; }
        public int Count { get; set; }
    }
}
