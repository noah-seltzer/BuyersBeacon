using System.ComponentModel.DataAnnotations;

namespace server.Models.DTOs
{
    public class UserDto
    {
        public Guid UserId { get; set; }

        [Required]
        public string ClerkId { get; set; }
    }
} 