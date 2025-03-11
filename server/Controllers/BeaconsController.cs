using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Util;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BeaconsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private BlobServiceManager _blobServiceManager;

        public BeaconsController(ApplicationDbContext context)
        {
            _context = context;
            _blobServiceManager = new BlobServiceManager();
        }

        /// <summary>
        /// Gets all beacons
        /// </summary>
        /// <returns>A list of all beacons</returns>
        /// <response code="200">Returns the list of beacons</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Beacon>>> GetBeacons()
        {
            var beacons = await _context.Beacons
                .Include(b => b.ImageSet)
                .ThenInclude(i => i.Images)
                .Select(b => new Beacon
                {
                    BeaconId = b.BeaconId,
                    UserId = b.UserId,
                    CategoryId = b.CategoryId,
                    DateCreate = b.DateCreate,
                    DateUpdate = b.DateUpdate,
                    ItemName = b.ItemName,
                    ItemDescription = b.ItemDescription,
                    ItemPrice = b.ItemPrice,
                    LocCity = b.LocCity,
                    LocRegion = b.LocRegion,
                    LocCountry = b.LocCountry,
                    LocPostalCode = b.LocPostalCode
                })
                .ToListAsync();

            return beacons;
        }

        /// <summary>
        /// Gets a specific beacon by its ID
        /// </summary>
        /// <param name="id">The GUID of the beacon to retrieve</param>
        /// <returns>The requested beacon</returns>
        /// <response code="200">Returns the requested beacon</response>
        /// <response code="404">If the beacon is not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Beacon>> GetBeacon(Guid id)
        {
            var beacon = await _context.Beacons
                .Where(b => b.BeaconId == id)
                .Select(b => new Beacon
                {
                    BeaconId = b.BeaconId,
                    UserId = b.UserId,
                    CategoryId = b.CategoryId,
                    Category = b.Category,
                    DateCreate = b.DateCreate,
                    DateUpdate = b.DateUpdate,
                    ItemName = b.ItemName,
                    ItemDescription = b.ItemDescription,
                    ItemPrice = b.ItemPrice,
                    LocCity = b.LocCity,
                    LocRegion = b.LocRegion,
                    LocCountry = b.LocCountry,
                    LocPostalCode = b.LocPostalCode
                })
                .FirstOrDefaultAsync();

            if (beacon == null)
            {
                return NotFound();
            }

            return beacon;
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
            if (beaconInput.Image == null && (beaconInput.Images == null || beaconInput.Images.Length == 0))
            {
                return beacon;
            }

            var imageSet = new ImageSet();
            //beacon.ImageSet = imageSet;
            //imageSet.Beacon = beacon;
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
                    var promise = _blobServiceManager.uploadFile(imageModel.ExternalImageId, image.OpenReadStream());
                    uploadPromises.Add(promise);
                }
                await Task.WhenAll(uploadPromises);
            }

            else if (beaconInput.Image != null)
            {
                var image = this.GenerateImage(beacon.Image, imageSet);
                _context.Images.Add(image);
                var res = await _blobServiceManager.uploadFile(image.FileName, beacon.Image.OpenReadStream());
            }

            await _context.SaveChangesAsync();

            //beacon.ImageSet = imageSet;
            //await _context.SaveChangesAsync();

            return beacon;

        }

        /// <summary>
        /// Creates a new beacon
        /// </summary>
        /// <param name="beacon">The beacon to create</param>
        /// <returns>The created beacon</returns>
        /// <response code="201">Returns the newly created beacon</response>
        /// <response code="400">If the beacon data is invalid or if Category/User doesn't exist</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<Beacon>> CreateBeacon([FromForm] Beacon beacon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Validate that Category exists
            Category? category = await _context.Categories.Select(c => new Category
            {
                CategoryId = c.CategoryId,
                CategoryName = c.CategoryName
            }).FirstOrDefaultAsync((Category c) => c.CategoryId == beacon.CategoryId);
            if (category == null)
            {
                ModelState.AddModelError("CategoryId", "Specified category does not exist");
                return BadRequest(ModelState);
            }

            // Validate that User exists
            var userExists = await _context.Users.AnyAsync(u => u.UserId == beacon.UserId);
            if (!userExists)
            {
                ModelState.AddModelError("UserId", "Specified user does not exist");
                return BadRequest(ModelState);
            }



            var newBeacon = new Beacon
            {
                BeaconId = Guid.NewGuid(),
                UserId = beacon.UserId,
                CategoryId = beacon.CategoryId,
                DateCreate = DateTime.UtcNow,
                DateUpdate = DateTime.UtcNow,
                ItemName = beacon.ItemName,
                ItemDescription = beacon.ItemDescription,
                ItemPrice = beacon.ItemPrice,
                LocCity = beacon.LocCity,
                LocRegion = beacon.LocRegion,
                LocCountry = beacon.LocCountry,
                LocPostalCode = beacon.LocPostalCode
            };




            var resB = _context.Beacons.Add(newBeacon);


            await this.CreateImagesetForNewBeacon(newBeacon, beacon);

            await _context.SaveChangesAsync();

            //if (beacon.Image != null)
            //{
            //    var fileName = Guid.NewGuid().ToString();
            //    var imageSet = new ImageSet();
            //    beacon.ImageSet = imageSet;
            //    var image = new Image();
            //    image.FileName = fileName;
            //    image.ImageSet = imageSet;
            //    imageSet.Images = [image];
            //    _context.Images.Add(image);
            //    _context.ImageSets.Add(imageSet);
            //    var res = await this._blobServiceManager.uploadFile(fileName, beacon.Image.OpenReadStream());
            //    await _context.SaveChangesAsync();
            //}


            resB.Entity.Category = category;



            return CreatedAtAction(nameof(GetBeacon), new { id = beacon.BeaconId }, resB.Entity);
        }

        /// <summary>
        /// Updates an existing beacon
        /// </summary>
        /// <param name="id">The GUID of the beacon to update</param>
        /// <param name="beaconDto">The updated beacon data</param>
        /// <returns>No content if successful</returns>
        /// <response code="204">If the beacon was successfully updated</response>
        /// <response code="400">If the beacon data is invalid</response>
        /// <response code="404">If the beacon is not found</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateBeacon(Guid id, Beacon beaconDto)
        {
            if (id != beaconDto.BeaconId)
            {
                return BadRequest();
            }

            var beacon = await _context.Beacons.FindAsync(id);
            if (beacon == null)
            {
                return NotFound();
            }

            beacon.UserId = beaconDto.UserId;
            beacon.CategoryId = beaconDto.CategoryId;
            beacon.DateUpdate = DateTime.UtcNow;
            beacon.ItemName = beaconDto.ItemName;
            beacon.ItemDescription = beaconDto.ItemDescription;
            beacon.ItemPrice = beaconDto.ItemPrice;
            beacon.LocCity = beaconDto.LocCity;
            beacon.LocRegion = beaconDto.LocRegion;
            beacon.LocCountry = beaconDto.LocCountry;
            beacon.LocPostalCode = beaconDto.LocPostalCode;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BeaconExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        /// <summary>
        /// Deletes a specific beacon
        /// </summary>
        /// <param name="id">The GUID of the beacon to delete</param>
        /// <returns>No content if successful</returns>
        /// <response code="204">If the beacon was successfully deleted</response>
        /// <response code="404">If the beacon is not found</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteBeacon(Guid id)
        {
            var beacon = await _context.Beacons.FindAsync(id);
            if (beacon == null)
            {
                return NotFound();
            }

            _context.Beacons.Remove(beacon);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BeaconExists(Guid id)
        {
            return _context.Beacons.Any(e => e.BeaconId == id);
        }
    }
}
