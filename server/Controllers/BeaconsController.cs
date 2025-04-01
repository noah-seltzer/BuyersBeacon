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
using System.Security.Claims;

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
        private IClerkService _clerkService;

        public BeaconsController(ApplicationDbContext context, 
            ICategoryService categoryService, 
            IBeaconService beaconService, 
            IImageService imageService,
            IClerkService clerkService)
        {
            _context = context;
            _blobServiceManager = new BlobServiceManager();
            _categoryService = categoryService;
            _beaconService = beaconService;
            _imageService = imageService;
            _clerkService = clerkService;
        }
        
        /// <summary>
        /// Gets all beacons
        /// </summary>
        /// <returns>A list of all beacons</returns>
        /// <response code="200">Returns the list of beacons</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Beacon>>> GetBeacons([FromQuery] bool drafts = false, [FromQuery] string? userId = null)
        {
            try 
            {
                var beacons = await _beaconService.GetList(userId != null ? new Guid(userId) : null, drafts);
                return Ok(beacons);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to get beacons", message = ex.Message });
            }
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

            return Ok(beacon);
        }


        /// <summary>
        /// Gets all drafts for a user
        /// </summary>
        /// <returns>A list of all drafts for the user</returns>
        /// <response code="200">Returns the list of drafts</response>
        [HttpGet("drafts")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Beacon>>> GetDrafts()
        {

            var authedClerkUser = await _clerkService.GetClerkUserFromToken(Request);
            if (authedClerkUser == null)
            {
                return Unauthorized(new { error = "Not authenticated" });
            }

            var drafts = await _beaconService.GetList(authedClerkUser.UserId, true);
            return Ok(drafts);
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

            if (beacon.CategoryId == null) {
                ModelState.AddModelError(nameof(beacon.CategoryId), "Please select valid category id.");
                return BadRequest(ModelState);
            }

            // Im only extracting the value becuase of the null check above.
            var category = await _categoryService.GetById((System.Guid) beacon.CategoryId);

            if (beacon.CategoryId.HasValue && category == null)
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

            var newBeacon = await _beaconService.Create(beacon);

            _context.Beacons.Add(newBeacon);
            await _context.SaveChangesAsync();
            newBeacon.Category = category;
            newBeacon.CategoryId = category.CategoryId;

            await _context.SaveChangesAsync();
            await _imageService.CreateImagesetForNewBeacon(newBeacon, beacon);

            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetBeacon), new { id = beacon.BeaconId }, newBeacon);
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

            _beaconService.Update(beacon, beaconDto);

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
        /// Deletes a specific beacon, ensuring only the owner can delete it
        /// </summary>
        /// <param name="id">The GUID of the beacon to delete</param>
        /// <returns>No content if successful</returns>
        /// <response code="204">If the beacon was successfully deleted</response>
        /// <response code="401">If the user is not authorized to delete this beacon</response>
        /// <response code="404">If the beacon is not found</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteBeacon(Guid id)
        {
            try
            {
                var authedClerkUser = await _clerkService.GetClerkUserFromToken(Request);
                if (authedClerkUser == null)
                {
                    return Unauthorized(new { error = "Not authenticated" });
                }

                var beacon = await _context.Beacons
                    .Include(b => b.User)
                    .Include(b => b.ImageSet)
                        .ThenInclude(i => i.Images)
                    .FirstOrDefaultAsync(b => b.BeaconId == id);

                if (beacon == null)
                {
                    return NotFound();
                }

                if (beacon.User?.ClerkId != authedClerkUser.ClerkId)
                {
                    return Unauthorized(new { error = "You are not authorized to delete this beacon" });
                }

                // First delete the associated images and image set if they exist
                if (beacon.ImageSet != null)
                {
                    if (beacon.ImageSet.Images != null && beacon.ImageSet.Images.Any())
                    {
                        _context.Images.RemoveRange(beacon.ImageSet.Images);
                    }
                    
                    _context.ImageSets.Remove(beacon.ImageSet);
                }

                _context.Beacons.Remove(beacon);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to delete beacon", message = ex.Message });
            }
        }

        private bool BeaconExists(Guid id)
        {
            return _context.Beacons.Any(e => e.BeaconId == id);
        }
    }
}
