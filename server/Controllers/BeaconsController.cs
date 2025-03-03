using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BeaconsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BeaconsController(ApplicationDbContext context)
        {
            _context = context;
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

        /// <summary>
        /// Creates a new beacon
        /// </summary>
        /// <param name="beaconDto">The beacon to create</param>
        /// <returns>The created beacon</returns>
        /// <response code="201">Returns the newly created beacon</response>
        /// <response code="400">If the beacon data is invalid or if Category/User doesn't exist</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Beacon>> CreateBeacon(Beacon beaconDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Validate that Category exists
            var categoryExists = await _context.Categories.AnyAsync(c => c.CategoryId == beaconDto.CategoryId);
            if (!categoryExists)
            {
                ModelState.AddModelError("CategoryId", "Specified category does not exist");
                return BadRequest(ModelState);
            }

            // Validate that User exists
            var userExists = await _context.Users.AnyAsync(u => u.UserId == beaconDto.UserId);
            if (!userExists)
            {
                ModelState.AddModelError("UserId", "Specified user does not exist");
                return BadRequest(ModelState);
            }

            var beacon = new Beacon
            {
                BeaconId = Guid.NewGuid(),
                UserId = beaconDto.UserId,
                CategoryId = beaconDto.CategoryId,
                DateCreate = DateTime.UtcNow,
                DateUpdate = DateTime.UtcNow,
                ItemName = beaconDto.ItemName,
                ItemDescription = beaconDto.ItemDescription,
                ItemPrice = beaconDto.ItemPrice,
                LocCity = beaconDto.LocCity,
                LocRegion = beaconDto.LocRegion,
                LocCountry = beaconDto.LocCountry,
                LocPostalCode = beaconDto.LocPostalCode
            };

            _context.Beacons.Add(beacon);
            await _context.SaveChangesAsync();

            beaconDto.BeaconId = beacon.BeaconId;
            beaconDto.DateCreate = beacon.DateCreate;
            beaconDto.DateUpdate = beacon.DateUpdate;

            return CreatedAtAction(nameof(GetBeacon), new { id = beacon.BeaconId }, beaconDto);
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
