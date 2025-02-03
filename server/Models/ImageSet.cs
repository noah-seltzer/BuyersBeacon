using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class ImageSet
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ImageSetId { get; set; }

        
        public Guid BeaconId { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int NumImages { get; set; } = 0;

        [ForeignKey("BeaconId")]
        public Beacon? Beacon {  get; set; }

        public ICollection<Image>? Images { get; set; } = new List<Image>();

    }
}
