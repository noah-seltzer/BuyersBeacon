using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public enum StorageProvider
{
    AzureBlobStorage
}

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

        public StorageProvider StorageProvider { get; set; } = StorageProvider.AzureBlobStorage;

        public Guid ExternalStorageId { get; set; } = new Guid();


        [ForeignKey("ImageSetId")]
        public ImageSet? ImageSet { get; set; }

    }   
}
