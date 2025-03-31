using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace server.Models
{
        public class User
        {
                [Key]
                [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
                [JsonPropertyName("UserId")]
                public Guid UserId { get; set; }

                [Required]
                [JsonPropertyName("ClerkId")]
                public string ClerkId { get; set; }

                [JsonPropertyName("Beacons")]
                public ICollection<Beacon>? Beacons { get; set; } = new List<Beacon>();

                [JsonPropertyName("Chats")]
                [DeleteBehavior(DeleteBehavior.Restrict)]
                public ICollection<Chat>? Chats { get; set; }
                // Add profile fields
                [MaxLength(100)]
                public string? DisplayName { get; set; } = "Anonymous User";

                [MaxLength(500)]
                public string? Bio { get; set; } = "No bio yet";

                [MaxLength(100)]
                public string? Location { get; set; } = "Location not set";

                [MaxLength(1000)]
                public string? AvatarUrl { get; set; }

                public DateTime JoinedDate { get; set; } = DateTime.UtcNow;

                // Rating information
                public double AverageRating { get; set; } = 0;
                public int TotalReviews { get; set; } = 0;
                public ICollection<Review> ReceivedReviews { get; set; } = new List<Review>();
                public ICollection<Review> GivenReviews { get; set; } = new List<Review>();
        }
}
