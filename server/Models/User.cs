using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid UserId { get; set; }

        [Required]
        public string ClerkId { get; set; }

        // Add profile fields
        [MaxLength(100)]
        public string? DisplayName { get; set; } = "Anonymous User";

        [MaxLength(500)]
        public string? Bio { get; set; } = "No bio yet";

        [MaxLength(100)]
        public string? Location { get; set; } = "Location not set";

        public DateTime JoinedDate { get; set; } = DateTime.UtcNow;

        public ICollection<Beacon>? Beacons { get; set; } = new List<Beacon>();
    }
}
