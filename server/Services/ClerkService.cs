using Clerk.BackendAPI.Helpers.Jwks;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using NuGet.Protocol;
using server.Controllers;
using server.Data;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using server.Models;
using dotenv.net;

class Identity
{
    public string SecurityToken;
}

class Claim
{
    string Type;
    string Value;
}

class SecToken
{
    public Claim[] Claims;
}


namespace server.Services
{
    public class ClerkService: IClerkService
    {
        private readonly ApplicationDbContext _context;

        public ClerkService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<string?> VerifyUserSessionToken(HttpRequest request)
        {
            var secretKey = Environment.GetEnvironmentVariable("CLERK_SECRET_KEY");
            if (secretKey == null)
            {
                secretKey = DotEnv.Read()["CLERK_SECRET_KEY"]; 
            }

            var options = new AuthenticateRequestOptions(
                secretKey,
                authorizedParties: new string[] { "http://localhost:3000", "https://buyersbeacon-g8bvgkcseuaxdqfj.canadacentral-01.azurewebsites.net", "http://buyersbeacon-g8bvgkcseuaxdqfj.canadacentral-01.azurewebsites.net" }
);

            
            var state = await AuthenticateRequest.AuthenticateRequestAsync(request, options);
            
            if (state.Token == null)
            {
                Console.WriteLine("Auth failed: " + state.ErrorReason.Message);
                return null;
            }

            try
            {
                // why is there no simple way to do this???
                var ident = (CaseSensitiveClaimsIdentity) state.Claims.Identity;
                var secToken = ident.SecurityToken.ToJson();
                var userId = Regex.Match(secToken, @"user_\w+");
                return userId.Value;
            } catch
            {
                return null;
            }



        }

        public async Task<User> GetClerkUserFromToken(HttpRequest request)
        {
            var authedUserId = await VerifyUserSessionToken(request);   
            if (authedUserId == null)
            {
                return null;
            }
            var user = await _context.Users.Where(u => u.ClerkId == authedUserId).FirstOrDefaultAsync();

            if (user != null) return user;

            else
            {
                var newUser = new Models.User
                {
                    UserId = Guid.NewGuid(),
                    ClerkId = authedUserId
                };

                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();
                return newUser;
            }
        }

    }
}
