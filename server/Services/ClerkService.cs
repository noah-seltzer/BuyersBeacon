using Clerk.BackendAPI.Helpers.Jwks;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using NuGet.Protocol;
using server.Controllers;
using server.Data;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using server.Models;

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
            var options = new AuthenticateRequestOptions(
                secretKey: "sk_test_uIn1uiM7Wvc99k8PQYlcCOa1EDpRvF8TVSxeFXueRy",
                authorizedParties: new string[] { "http://localhost:3000" }
);

            
            var state = await AuthenticateRequest.AuthenticateRequestAsync(request, options);
            
            if (state.Token == null)
            {
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
