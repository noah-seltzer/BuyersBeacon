using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace server.Models
{
    public class Category
    {
        [Key]
        [JsonPropertyName("CategoryId")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CategoryId { get; set; }


        [Required]
        [MaxLength(100)]
        [JsonPropertyName("CategoryName")]
        public string CategoryName { get; set; }

        public ICollection<Beacon> Beacons { get; set; } = new List<Beacon>();
    }
}
