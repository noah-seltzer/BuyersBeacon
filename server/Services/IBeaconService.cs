using server.Models;

namespace server.Services
{
    public interface IBeaconService
    {
        public Task<Beacon?> GetById(Guid id);
        public Task<IEnumerable<Beacon>> GetList(Guid? user_id = null, bool drafts = false, Guid? CategoryId = null, string? QueryString = null);

        public Task<Beacon> Create(Beacon beacon);
        public Beacon Update(Beacon beacon, Beacon newBeaon);
    }
}
