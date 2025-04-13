using server.Models;

namespace server.Services
{
    public interface IBeaconService
    {
        public Beacon? GetById(Guid id);
        public IEnumerable<Beacon> GetList(Guid? user_id = null, bool drafts = false, Guid? CategoryId = null, string? QueryString = null);

        public Beacon Create(Beacon beacon);
        public Beacon Update(Beacon beacon, Beacon newBeaon);
    }
}
