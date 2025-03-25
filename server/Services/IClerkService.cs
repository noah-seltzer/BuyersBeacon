
using server.Models;

namespace server.Services
{
    public interface IClerkService
    {
        Task<String> VerifyUserSessionToken(HttpRequest request);


        Task<User> GetClerkUserFromToken(HttpRequest request);
    }
}
