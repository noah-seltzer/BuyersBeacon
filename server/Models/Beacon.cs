using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Beacon
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid BeaconId { get; set; }

        public Guid UserId { get; set; }

        public Guid CategoryId { get; set; }


        [ForeignKey("UserId")]
        public User? User { get; set; }

        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }

        public ImageSet? ImageSet { get; set; }
    }
}
