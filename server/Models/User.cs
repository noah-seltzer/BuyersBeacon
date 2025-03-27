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
    }
}
