namespace server.Models.DTOs
{
    public class UpdateProfileDto
    {
        public string? DisplayName { get; set; }
        public string? Bio { get; set; }
        public string? Location { get; set; }
        public string? AvatarUrl { get; set; }
    }
} 