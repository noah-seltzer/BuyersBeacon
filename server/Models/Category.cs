using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CategoryId { get; set; }


        [Required]
        public string CategoryName { get; set; }

        public ICollection<Beacon> Beacons { get; set; } = new List<Beacon>();
    }
}
