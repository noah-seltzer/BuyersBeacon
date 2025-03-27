using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : Controller
    {

        private readonly ApplicationDbContext _context;

        public ChatController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Chat>> GetChat(Guid id)
        {
            var chat = await (from chats in _context.Chats.Include(c => c.Messages)
                              where chats.BeaconId == id
                              select chats).ToListAsync();

            if (chat == null || !chat.Any()) return NotFound("Chat not found");

            return Ok(chat); 
        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Chat>> GetChats([FromQuery] string clerkId)
        {
            var chat = await (from chats in _context.Chats.Include(c => c.Messages)
                              where chats.Partcipants.Any(p => p.ClerkId == clerkId)
                              select chats).ToListAsync();

            if (chat == null) return NotFound("Chat not found");

            return Ok(chat);
        }

    }
}
