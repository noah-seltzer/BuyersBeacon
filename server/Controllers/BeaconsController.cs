using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    public class BeaconsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public BeaconsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Beacons
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Beacons.Include(b => b.Category).Include(b => b.User);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Beacons/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var beacon = await _context.Beacons
                .Include(b => b.Category)
                .Include(b => b.User)
                .FirstOrDefaultAsync(m => m.BeaconId == id);
            if (beacon == null)
            {
                return NotFound();
            }

            return View(beacon);
        }

        // GET: Beacons/Create
        public IActionResult Create()
        {
            ViewData["CategoryId"] = new SelectList(_context.Categories, "CategoryId", "CategoryName");
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "ClerkId");
            return View();
        }

        // POST: Beacons/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("BeaconId,UserId,CategoryId,DateCreate,DateUpdate,ItemName,ItemDescription,ItemPrice,LocCity,LocRegion,LocCountry,LocPostalCode")] Beacon beacon)
        {
            if (ModelState.IsValid)
            {
                beacon.BeaconId = Guid.NewGuid();
                _context.Add(beacon);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CategoryId"] = new SelectList(_context.Categories, "CategoryId", "CategoryName", beacon.CategoryId);
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "ClerkId", beacon.UserId);
            return View(beacon);
        }

        // GET: Beacons/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var beacon = await _context.Beacons.FindAsync(id);
            if (beacon == null)
            {
                return NotFound();
            }
            ViewData["CategoryId"] = new SelectList(_context.Categories, "CategoryId", "CategoryName", beacon.CategoryId);
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "ClerkId", beacon.UserId);
            return View(beacon);
        }

        // POST: Beacons/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("BeaconId,UserId,CategoryId,DateCreate,DateUpdate,ItemName,ItemDescription,ItemPrice,LocCity,LocRegion,LocCountry,LocPostalCode")] Beacon beacon)
        {
            if (id != beacon.BeaconId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(beacon);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BeaconExists(beacon.BeaconId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["CategoryId"] = new SelectList(_context.Categories, "CategoryId", "CategoryName", beacon.CategoryId);
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "ClerkId", beacon.UserId);
            return View(beacon);
        }

        // GET: Beacons/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var beacon = await _context.Beacons
                .Include(b => b.Category)
                .Include(b => b.User)
                .FirstOrDefaultAsync(m => m.BeaconId == id);
            if (beacon == null)
            {
                return NotFound();
            }

            return View(beacon);
        }

        // POST: Beacons/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var beacon = await _context.Beacons.FindAsync(id);
            if (beacon != null)
            {
                _context.Beacons.Remove(beacon);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BeaconExists(Guid id)
        {
            return _context.Beacons.Any(e => e.BeaconId == id);
        }
    }
}
