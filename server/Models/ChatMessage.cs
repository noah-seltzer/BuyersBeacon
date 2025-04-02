using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace server.Models
{
    public class ChatMessage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonPropertyName("ChatMessageId")]
        public Guid ChatMessageId { get; set; }


        [JsonPropertyName("ChatId")]
        [Required]
        public Guid ChatId { get; set; }


        [ForeignKey("ChatId")]
        [JsonPropertyName("Chat")]
        public Chat? Chat { get; set; }

        [JsonPropertyName("UserId")]
        [Required]
        public Guid UserId { get; set; }

        [ForeignKey("UserId")]
        [JsonPropertyName("User")]
        public User? User { get; set; }

        [Required]
        [JsonPropertyName("Message")]
        public string Message { get; set; }

        [Required]
        public DateTime SendDateTime { get; set; } = new DateTime();
    }
}
