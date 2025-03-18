using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services
{
    public class BeaconService: IBeaconService
    {
        private readonly ApplicationDbContext _context;
        private readonly ICategoryService _categoryService;

        public BeaconService(ApplicationDbContext context, ICategoryService categoryService)
        {
            _context = context;
            _categoryService = categoryService;
        }
        public async Task<Beacon?> GetById(Guid id)
        {
            return await _context.Beacons
                .Where(b => b.BeaconId == id)
                .Include(b => b.Category)
                .Include(b => b.ImageSet)
                .ThenInclude(i => i.Images)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Beacon>> GetList(Guid? user_id = null, bool drafts = false)
        {
            var beacons = _context.Beacons
                .Include(b => b.Category)
                .Include(b => b.ImageSet)
                .ThenInclude(i => i.Images);
            
            if (user_id != null)
            {
                beacons.Where(b => b.UserId == user_id);
            }

            if (drafts == true)
            {
                beacons.Where(b => b.IsDraft);
            }

            return await beacons.ToListAsync();
        }


        public async Task<Beacon> Create(Beacon beacon)
        {
            var newBeacon = new Beacon
            {
                BeaconId = Guid.NewGuid(),
                UserId = beacon.UserId,
                CategoryId = null, // Drafts don't require a category
                DateCreate = DateTime.UtcNow,
                DateUpdate = DateTime.UtcNow,
                ItemName = string.IsNullOrEmpty(beacon.ItemName) ? "Untitled Draft" : beacon.ItemName,
                ItemDescription = string.IsNullOrEmpty(beacon.ItemDescription) ? "Draft description" : beacon.ItemDescription,
                ItemPrice = beacon.ItemPrice,
                LocCity = beacon.LocCity,
                LocRegion = beacon.LocRegion,
                LocCountry = beacon.LocCountry,
                LocPostalCode = beacon.LocPostalCode,
                IsDraft = beacon.IsDraft,
                LastDraftSave = DateTime.UtcNow
            };

            return newBeacon;
        }

        public Beacon Update(Beacon beacon, Beacon newBeacon)
        {
            beacon.UserId = newBeacon.UserId;
            beacon.CategoryId = newBeacon.CategoryId;
            beacon.DateUpdate = DateTime.UtcNow;
            beacon.ItemName = newBeacon.ItemName;
            beacon.ItemDescription = newBeacon.ItemDescription;
            beacon.ItemPrice = newBeacon.ItemPrice;
            beacon.LocCity = newBeacon.LocCity;
            beacon.LocRegion = newBeacon.LocRegion;
            beacon.LocCountry = newBeacon.LocCountry;
            beacon.LocPostalCode = newBeacon.LocPostalCode;
            return beacon;
        }
    }
}
