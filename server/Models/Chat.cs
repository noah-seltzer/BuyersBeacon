using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace server.Models
{
    public class Chat
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonPropertyName("ChatId")]
        public Guid ChatId { get; set; }

        [JsonPropertyName("BeaconId")]
        [Required]
        public Guid BeaconId { get; set; }

        [ForeignKey("BeaconId")]
        [JsonPropertyName("Beacon")]
        public Beacon? Beacon { get; set; }

        public ICollection<User>? Partcipants { get; set; }

        public ICollection<ChatMessage>? Messages { get; set; }
    }
}
