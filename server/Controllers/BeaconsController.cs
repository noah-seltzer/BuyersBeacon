using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Services;
using server.Util;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BeaconsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private BlobServiceManager _blobServiceManager;
        private ICategoryService _categoryService;
        private IBeaconService _beaconService;
        private IImageService _imageService;
        public BeaconsController(ApplicationDbContext context, 
            ICategoryService categoryService, 
            IBeaconService beaconService, 
            IImageService imageService)
        {
            _context = context;
            _blobServiceManager = new BlobServiceManager();
            _categoryService = categoryService;
            _beaconService = beaconService;
            _imageService = imageService;
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
            var beacons = await _beaconService.GetList();

            return Ok(beacons);
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
            var beacon = await _beaconService.GetById(id);

            if (beacon == null)
            {
                return NotFound();
            }

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

            var category = await _categoryService.GetById(beacon.CategoryId);

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
            resB.Entity.Category = category;


            await _imageService.CreateImagesetForNewBeacon(newBeacon, beacon);

            await _context.SaveChangesAsync();


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
