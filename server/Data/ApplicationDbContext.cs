using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }


        public DbSet<User> Users { get; set; }
        public DbSet<Beacon> Beacons { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<ImageSet> ImageSets { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}
