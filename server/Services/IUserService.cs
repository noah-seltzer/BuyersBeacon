using server.Models;

namespace server.Services
{
    public interface IUserService
    {
        public Task<User?> GetById(Guid id);
    }
}
