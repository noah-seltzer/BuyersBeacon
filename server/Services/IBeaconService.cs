using server.Models;

namespace server.Services
{
    public interface IBeaconService
    {
        public Task<Beacon?> GetById(Guid id);
        public Task<IEnumerable<Beacon>> GetList();
        public Task<IEnumerable<Beacon>> SearchList(string searchText, string searchCategoryID);

    }
}
