using System.ComponentModel.DataAnnotations;

namespace server.Models.DTOs
{
    public class CategoryDto
    {
        public Guid CategoryId { get; set; }

        [Required]
        [MaxLength(100)]
        public string CategoryName { get; set; }
    }
} 