namespace server.Types
{
    public class ImageUpload
    {
        // base64 encoded file
        public string IFormFile { get; set; }

        public string FileName {  get; set; }

        public bool isCoverImage { get; set; }

    }
}
