using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gets all users
        /// </summary>
        /// <returns>A list of all users</returns>
        /// <response code="200">Returns the list of users</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users
                .Select(u => new User
                {
                    UserId = u.UserId,
                    ClerkId = u.ClerkId
                })
                .ToListAsync();
        }

        /// <summary>
        /// Gets a specific user by ID
        /// </summary>
        /// <param name="id">The GUID of the user to retrieve</param>
        /// <returns>The requested user</returns>
        /// <response code="200">Returns the requested user</response>
        /// <response code="404">If the user is not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await _context.Users
                .Where(u => u.UserId == id)
                .Select(u => new User
                {
                    UserId = u.UserId,
                    ClerkId = u.ClerkId
                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        /// <summary>
        /// Gets a user by their Clerk ID
        /// </summary>
        /// <param name="clerkId">The Clerk ID of the user</param>
        /// <returns>The requested user</returns>
        /// <response code="200">Returns the requested user</response>
        /// <response code="404">If the user is not found</response>
        [HttpGet("clerk/{clerkId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<User>> GetUserByClerkId(string clerkId)
        {
            var user = await _context.Users
                .Where(u => u.ClerkId == clerkId)
                .Select(u => new User
                {
                    UserId = u.UserId,
                    ClerkId = u.ClerkId
                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        /// <summary>
        /// Creates a new user
        /// </summary>
        /// <param name="userDto">The user to create</param>
        /// <returns>The created user</returns>
        /// <response code="201">Returns the newly created user</response>
        /// <response code="400">If the user data is invalid or if ClerkId already exists</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<User>> CreateUser(User userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if ClerkId already exists
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.ClerkId == userDto.ClerkId);
            if (existingUser != null)
            {
                ModelState.AddModelError("ClerkId", "A user with this Clerk ID already exists");
                return BadRequest(ModelState);
            }

            var user = new User
            {
                UserId = Guid.NewGuid(),
                ClerkId = userDto.ClerkId
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            userDto.UserId = user.UserId;

            return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, userDto);
        }

        /// <summary>
        /// Updates an existing user
        /// </summary>
        /// <param name="id">The GUID of the user to update</param>
        /// <param name="userDto">The updated user data</param>
        /// <returns>No content if successful</returns>
        /// <response code="204">If the user was successfully updated</response>
        /// <response code="400">If the user data is invalid or if ClerkId already exists</response>
        /// <response code="404">If the user is not found</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateUser(Guid id, User userDto)
        {
            if (id != userDto.UserId)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // Check if new ClerkId already exists (excluding current user)
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.ClerkId == userDto.ClerkId && u.UserId != id);
            if (existingUser != null)
            {
                ModelState.AddModelError("ClerkId", "A user with this Clerk ID already exists");
                return BadRequest(ModelState);
            }

            user.ClerkId = userDto.ClerkId;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        /// <summary>
        /// Deletes a specific user
        /// </summary>
        /// <param name="id">The GUID of the user to delete</param>
        /// <returns>No content if successful</returns>
        /// <response code="204">If the user was successfully deleted</response>
        /// <response code="404">If the user is not found</response>
        /// <response code="400">If the user has associated beacons</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _context.Users
                .Include(u => u.Beacons)
                .FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
            {
                return NotFound();
            }

            if (user.Beacons.Any())
            {
                ModelState.AddModelError("", "Cannot delete user with associated beacons");
                return BadRequest(ModelState);
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(Guid id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
} 