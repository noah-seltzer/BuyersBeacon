using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using System.Threading.Tasks;

namespace server.Services
{
    public class BeaconService : IBeaconService
    {
        private readonly ApplicationDbContext _context;

        public BeaconService(ApplicationDbContext context)
        {
            _context = context;
        }


        public Beacon? GetById(Guid id)
        {
            var beacon = _context.Beacons
                .Where(b => b.BeaconId == id)
                .Include(b => b.Category)
                .Include(b => b.ImageSet)
                    .ThenInclude(i => i.Images)
                .Include(b => b.User)
                .First();

            Console.WriteLine($"DEBUG: Beacon User Data: {beacon?.User?.DisplayName ?? "null"}");
            return beacon;
        }

        public async Task<IEnumerable<Beacon>> GetList(
            Guid? user_id = null,
            bool drafts = false,
            Guid? CategoryId = null, 
            string? QueryString = null
            )
        {
            var query = _context.Beacons
                .Include(b => b.Category)
                .Include(b => b.ImageSet)
                .ThenInclude(i => i.Images)
                .AsQueryable();

            // Filter by user ID if provided
            if (user_id.HasValue)
            {
                query = query.Where(b => b.UserId == user_id.Value);
            }
            
            // Filter by draft status
            query = query.Where(b => b.IsDraft == drafts);
            
            // Apply additional filters for search parameters
            if (CategoryId.HasValue)
            {
                query = query.Where(b => b.CategoryId == CategoryId.Value);
            }

            if (!String.IsNullOrEmpty(QueryString))
            {
                query = query.Where(b => b.ItemName.Contains(QueryString));
            }

            query = query.Where(b => b.IsDraft == drafts);
            
            return await query.ToListAsync();
        }


        public Beacon Create(Beacon beacon)
        {
            var newBeacon = new Beacon
            {
                BeaconId = Guid.NewGuid(),
                UserId = beacon.UserId,
                CategoryId = beacon.CategoryId, // Drafts don't require a category
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
