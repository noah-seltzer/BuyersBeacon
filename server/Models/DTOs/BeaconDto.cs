using System.ComponentModel.DataAnnotations;

namespace server.Models.DTOs
{
    public class BeaconDto
    {
        public Guid BeaconId { get; set; }
        public Guid UserId { get; set; }
        public Guid CategoryId { get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime DateUpdate { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string ItemName { get; set; }
        
        [Required]
        [MaxLength(500)]
        public string ItemDescription { get; set; }
        
        [Required]
        public decimal ItemPrice { get; set; }
        
        [MaxLength(100)]
        public string? LocCity { get; set; }
        
        [MaxLength(100)]
        public string? LocRegion { get; set; }
        
        [MaxLength(100)]
        public string? LocCountry { get; set; }
        
        [MaxLength(20)]
        public string? LocPostalCode { get; set; }
    }
} 