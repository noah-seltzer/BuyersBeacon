using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;

namespace server.Util
{
    public class ImageSetManager
    {
        private readonly ApplicationDbContext _context;
        private BlobServiceManager _blobServiceManager;

        public ImageSetManager(ApplicationDbContext context)
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

        public async Task<ActionResult<Beacon>> CreateImagesetForNewBeacon(Beacon beacon, Beacon beaconInput)
        {
            if (beaconInput.Image == null || (beaconInput.Images == null || beaconInput.Images.Length == 0)) {
                return beacon;
            }

            var imageSet = new ImageSet();
            beacon.ImageSet = imageSet;
            imageSet.Beacon = beacon;
            imageSet.BeaconId = beacon.BeaconId;
            _context.ImageSets.Add(imageSet);

            if (beaconInput.Images != null && beaconInput.Images.Length > 0) {
                List<Task> uploadPromises = new List<Task>();
                foreach (var image in beacon.Images)
                {
                    var imageModel = this.GenerateImage(image, imageSet);
                    imageSet.Images.Add(imageModel);
                    _context.Images.Add(imageModel);
                    var promise = _blobServiceManager.uploadFile(imageModel.ExternalImageId, image.OpenReadStream(), image.ContentType);
                    uploadPromises.Add(promise);
                }
                await Task.WhenAll(uploadPromises);
            }

            if (beaconInput.Image != null)
            {
                var image = this.GenerateImage(beacon.Image, imageSet);
                _context.Images.Add(image);
                var res = await _blobServiceManager.uploadFile(image.FileName, beacon.Image.OpenReadStream(), beacon.Image.ContentType);
            }

            await _context.SaveChangesAsync();

            return beacon;

        }
    }
}
