using Azure.Storage.Blobs;
using Azure.Identity;

namespace server.Util
{
    public class AzureImageUploadManager
    {

        public AzureImageUploadManager() {
            this.Client = new BlobServiceClient(
                new Uri("https://buyersbeaconstorage.blob.core.windows.net"),
                new DefaultAzureCredential());

            this.ImagesContainerClient = this.Client.GetBlobContainerClient("images");
        }

        private BlobServiceClient Client;
        private BlobContainerClient ImagesContainerClient;

        public void UploadBase64File(string name, string filestring)
        {
            BlobClient blobClient = this.ImagesContainerClient.GetBlobClient(name);
            var bytes = Convert.FromBase64String(filestring);
            Stream stream = new MemoryStream(bytes);
            blobClient.UploadAsync(stream);
        }
    }
}
