using Microsoft.AspNetCore.Http;

namespace server.Models.Dtos
{
    public class CreateDraftDto
    {
        public string? ItemName { get; set; }
        public string? ItemDescription { get; set; }
        public decimal? ItemPrice { get; set; }
        public string? CategoryId { get; set; }
        public IFormFileCollection? Images { get; set; }
    }
} 