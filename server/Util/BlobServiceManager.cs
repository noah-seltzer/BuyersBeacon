using Azure.Identity;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace server.Util
{
    public class BlobServiceManager
    {
        public BlobServiceManager()
        {
            var str = Environment.GetEnvironmentVariable("AZURE_STORAGE_CONNECTION_STRING");
            this.Client = new BlobServiceClient(str);
                //new Uri("https://buyersbeaconstorage.blob.core.windows.net"),
                //new DefaultAzureCredential());
            //this.config = config;
            this.ImagesContainerClient = this.Client.GetBlobContainerClient("images");
        }

        private BlobServiceClient Client;
        private BlobContainerClient ImagesContainerClient;
        //private IConfiguration config;

        public async Task<BlobContentInfo> uploadFile(string name, Stream fileStream, string MimeType)
        {
            BlobClient blobClient = this.ImagesContainerClient.GetBlobClient(name);
            var blobHeader = new BlobHttpHeaders { ContentType = MimeType };
            return await blobClient.UploadAsync(fileStream, new BlobUploadOptions { HttpHeaders = blobHeader });
        }
    }
}
