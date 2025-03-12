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

        public BeaconService(ApplicationDbContext context)
        {
            _context = context;
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

        public async Task<IEnumerable<Beacon>> GetList()
        {
            var beacons = await _context.Beacons
                .Include(b => b.Category)
                .Include(b => b.ImageSet)
                .ThenInclude(i => i.Images)
                .ToListAsync();
            return beacons;
        }
    }
}
