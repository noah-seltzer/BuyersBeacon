using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class ReviewTag
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ReviewTagId { get; set; }

        [Required]
        public Guid ReviewId { get; set; }
        
        [ForeignKey("ReviewId")]
        public Review Review { get; set; }

        [Required]
        public Guid TagId { get; set; }
        
        [ForeignKey("TagId")]
        public Tag Tag { get; set; }
    }
}
