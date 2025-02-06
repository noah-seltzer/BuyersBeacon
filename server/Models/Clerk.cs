using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Clerk
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ClerkUserId { get; set; }


        [Required]
        [MaxLength(100)]
        public string email { get; set; }

        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
