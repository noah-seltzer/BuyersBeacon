using System.ComponentModel.DataAnnotations;

namespace server.Models.DTOs
{
    public class CreateReviewDto
    {
        [Required]
        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5")]
        public int Rating { get; set; }

        public List<string> TagNames { get; set; } = new List<string>();
    }
}
