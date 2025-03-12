using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Services
{
    public interface IImageService
    {
        public string GenerateGuidFilename();
        public Image GenerateImage(IFormFile formFile, ImageSet? imageSet);
        public Task<Beacon> CreateImagesetForNewBeacon(Beacon beacon, Beacon beaconInput);



    }
}
