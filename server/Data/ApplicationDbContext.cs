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
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<ReviewTag> ReviewTags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships for Review entity
            modelBuilder.Entity<Review>()
                .HasOne(r => r.User)
                .WithMany(u => u.ReceivedReviews)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Review>()
                .HasOne(r => r.Reviewer)
                .WithMany(u => u.GivenReviews)
                .HasForeignKey(r => r.ReviewerId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure many-to-many relationship through ReviewTag
            modelBuilder.Entity<ReviewTag>()
                .HasKey(rt => rt.ReviewTagId);

            modelBuilder.Entity<ReviewTag>()
                .HasOne(rt => rt.Review)
                .WithMany(r => r.ReviewTags)
                .HasForeignKey(rt => rt.ReviewId);

            modelBuilder.Entity<ReviewTag>()
                .HasOne(rt => rt.Tag)
                .WithMany(t => t.ReviewTags)
                .HasForeignKey(rt => rt.TagId);
        }
    }
}
