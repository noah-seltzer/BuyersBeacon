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

        [ForeignKey("UserId")]
        public User? User { get; set; }

        public Guid CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }

        [Required]
        public DateTime DateCreate { get; set; } = new DateTime();

        [Required]
        public DateTime DateUpdate { get; set; } = new DateTime();

        [Required]
        [MaxLength(100)]
        public string ItemName { get; set; }

        [Required]
        [MaxLength(500)]
        public string ItemDescription { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal ItemPrice { get; set; }

        [MaxLength(100)]
        public string? LocCity { get; set; }

        [MaxLength(100)]
        public string? LocRegion { get; set; }

        [MaxLength(100)]
        public string? LocCountry { get; set; }

        [MaxLength(20)]
        public string? LocPostalCode { get; set; }

        public ImageSet? ImageSet { get; set; }
    }
}
