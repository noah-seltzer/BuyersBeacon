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
        public DbSet<Chat> Chats { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define foreign key relationships
            modelBuilder.Entity<ChatMessage>()
                .HasOne(cm => cm.User)
                .WithMany()
                .HasForeignKey(cm => cm.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Prevents cascading issues

            modelBuilder.Entity<Chat>()
                .HasMany(c => c.Participants)
                .WithMany(u => u.Chats)
                .UsingEntity(
                    "ChatUser",
                    l => l.HasOne(typeof(Chat)).WithMany().HasForeignKey("ChatsChatId").OnDelete(DeleteBehavior.Restrict),
                    r => r.HasOne(typeof(User)).WithMany().HasForeignKey("ParticipantsUserId").OnDelete(DeleteBehavior.Restrict),
                    j =>
                    {
                        j.HasKey("ChatsChatId", "ParticipantsUserId");
                        j.ToTable("ChatUser");
                    }
                );
        }
    }
}
