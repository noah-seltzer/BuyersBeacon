using server.Models;

namespace server.Services
{
    public interface IBeaconService
    {
        public Task<Beacon?> GetById(Guid id);
        public Task<IEnumerable<Beacon>> GetList();

    }
}
