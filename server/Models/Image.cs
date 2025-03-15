using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Image
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ImageId { get; set; }

        [Required]
        public Guid ImageSetId { get; set; }

        [Required]
        public string FileName  { get; set; }


        public string? ImageUrl { get; set; }

        public string? ExternalImageId {  get; set; }

        public string? MimeType { get; set; }

        [ForeignKey("ImageSetId")]
        public ImageSet? ImageSet { get; set; }

    }   
}
