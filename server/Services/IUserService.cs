using server.Models;

namespace server.Services
{
    public interface IUserService
    {
        Task<User?> GetById(Guid id);
        Task<User?> GetUserByClerkIdAsync(string clerkId);
        Task<User?> CreateUserAsync(string clerkId);
        Task<User?> UpdateUserAsync(Guid userId, User user);
    }
}
