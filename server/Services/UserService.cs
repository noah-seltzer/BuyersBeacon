using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetById(Guid id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User?> GetUserByClerkIdAsync(string clerkId)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.ClerkId == clerkId);
        }

        public async Task<User?> CreateUserAsync(string clerkId)
        {
            var existingUser = await GetUserByClerkIdAsync(clerkId);
            if (existingUser != null)
            {
                return existingUser;
            }

            var newUser = new User
            {
                ClerkId = clerkId,
                DisplayName = "Anonymous User",
                Bio = "No bio yet",
                Location = "Location not set",
                JoinedDate = DateTime.UtcNow
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return newUser;
        }

        public async Task<User?> UpdateUserAsync(Guid userId, User updatedUser)
        {
            var user = await GetById(userId);
            if (user == null)
            {
                return null;
            }

            // Update properties
            user.DisplayName = updatedUser.DisplayName;
            user.Bio = updatedUser.Bio;
            user.Location = updatedUser.Location;

            await _context.SaveChangesAsync();
            return user;
        }
    }
}