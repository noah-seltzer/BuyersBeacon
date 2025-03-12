using server.Data;
using server.Models;

namespace server.Services
{
    public interface ICategoryService
    {
        public Task<Category?> GetById(Guid id);
    }
}
