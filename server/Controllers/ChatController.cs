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

        [HttpGet("{chatId}/{clerkId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Chat>> GetChat(Guid chatId, string clerkId)
        {
            var chatRes = await (from chat in _context.Chats.Include(c => c.Messages).Include(c => c.Participants)
                                 where chat.ChatId == chatId && chat.Participants.Any(u => u.ClerkId == clerkId)
                              select chat).FirstOrDefaultAsync();

            if (chatRes == null) return NotFound("Chat not found");

            return Ok(chatRes); 
        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Chat>> GetChats([FromQuery] string clerkId)
        {
            var chat = await (from chats in _context.Chats.Include(c => c.Messages)
                              where chats.Participants.Any(p => p.ClerkId == clerkId)
                              select chats).ToListAsync();

            if (chat == null) return NotFound("Chat not found");

            return Ok(chat);
        }

    }
}
