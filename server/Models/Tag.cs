using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Tag
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid TagId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        // Navigation property to ReviewTags
        public ICollection<ReviewTag> ReviewTags { get; set; } = new List<ReviewTag>();
    }
}
