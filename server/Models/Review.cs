using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Review
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ReviewId { get; set; }

        [Required]
        public int Rating { get; set; } // 1-5 stars

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Reviewer information
        [Required]
        public Guid ReviewerId { get; set; }
        
        [ForeignKey("ReviewerId")]
        public User Reviewer { get; set; }

        // User being reviewed
        [Required]
        public Guid UserId { get; set; }
        
        [ForeignKey("UserId")]
        public User User { get; set; }

        // Navigation property to ReviewTags
        public ICollection<ReviewTag> ReviewTags { get; set; } = new List<ReviewTag>();
    }
}
