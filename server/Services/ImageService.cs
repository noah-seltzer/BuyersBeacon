using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Util;



namespace server.Services
{
    public class ImageService: IImageService
    {
        const string BlobStorageURLBase = "https://buyersbeaconstorage.blob.core.windows.net/images";
        private readonly ApplicationDbContext _context;
        private BlobServiceManager _blobServiceManager;

        public ImageService(ApplicationDbContext context)
        {
            _context = context;
            _blobServiceManager = new BlobServiceManager();

        }

        public string GenerateGuidFilename()
        {
            return Guid.NewGuid().ToString();
        }

        public Image GenerateImage(IFormFile formFile, ImageSet? imageSet)
        {
            var fileId = Guid.NewGuid().ToString();
            var image = new Image();
            image.FileName = formFile.FileName;
            image.ExternalImageId = fileId;
            image.MimeType = formFile.ContentType;
            
            image.ImageUrl = $"{BlobStorageURLBase}/{fileId}";
            if (imageSet != null)
            {
                image.ImageSet = imageSet;
                if (imageSet.Images == null)
                {
                    imageSet.Images = new List<Image>();
                }
                imageSet.Images.Add(image);
            }
            return image;
        }

        public async Task<Beacon> CreateImagesetForNewBeacon(Beacon beacon, Beacon beaconInput)
        {
            if (beaconInput.Image == null && (beaconInput.Images == null || beaconInput.Images.Length == 0))
            {
                return beacon;
            }

            var imageSet = new ImageSet();
            imageSet.BeaconId = beacon.BeaconId;
            _context.ImageSets.Add(imageSet);

            if (beaconInput.Images != null && beaconInput.Images.Length > 0)
            {
                List<Task> uploadPromises = new List<Task>();
                foreach (var image in beaconInput.Images)
                {
                    var imageModel = this.GenerateImage(image, imageSet);
                    imageSet.Images.Add(imageModel);
                    _context.Images.Add(imageModel);
                    var promise = _blobServiceManager.uploadFile(imageModel.ExternalImageId, image.OpenReadStream(), image.ContentType);
                    uploadPromises.Add(promise);
                }
                await Task.WhenAll(uploadPromises);
            }

            else if (beaconInput.Image != null)
            {
                var image = this.GenerateImage(beacon.Image, imageSet);
                _context.Images.Add(image);
                var res = await _blobServiceManager.uploadFile(image.FileName, beacon.Image.OpenReadStream(), beacon.Image.ContentType);
            }


            return beacon;
        }
        
        public async Task<string> UploadImageAsync(IFormFile imageFile)
        {
            // Generate a unique identifier for the file
            var fileId = Guid.NewGuid().ToString();
            
            // Upload the file to blob storage
            await _blobServiceManager.uploadFile(fileId, imageFile.OpenReadStream(), imageFile.ContentType);
            
            // Return the URL where the image can be accessed
            return $"{BlobStorageURLBase}/{fileId}";
        }
    }
}
