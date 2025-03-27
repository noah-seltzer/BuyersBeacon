using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Hubs
{
    public class ChatHub: Hub
    {

        private readonly ApplicationDbContext _context;

        public ChatHub(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SendMessage(string user, string message)
        {
            Console.WriteLine("CONNECTION MESSAGE!!!");
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task InitializeChat(Guid beaconId, string clerkId) {

            var beacon = await _context.Beacons
                .Include(b => b.User)
                .Include(c => c.Chats)
                .ThenInclude(c => c.Partcipants)
                .Where(b => b.BeaconId == beaconId)
                .FirstOrDefaultAsync();

            if (beacon == null || beacon.User == null) {
                throw new Exception("Beacon not found"); 
            }

            if (beacon.User.ClerkId == clerkId) {
                throw new Exception("Cannot initialize chat with yourself");
            }

            var clu = await _context.Users.Where(u => u.ClerkId == clerkId).FirstOrDefaultAsync();

            if (clu == null)
            {
                throw new Exception("CLU not found"); 
            }

            // Check if the CLU already is a participant of the chat.
            var existingChat = await (
                    from chat in _context.Chats.Include(c => c.Partcipants)
                    where chat.BeaconId == beacon.BeaconId && chat.Partcipants.Any(u => u.UserId == clu.UserId)
                    select chat
                ).FirstOrDefaultAsync();


            // If the chat already exist. Send message to sender
            if (existingChat != null) { 
                await Clients.Caller.SendAsync("NewChat", existingChat.ChatId, existingChat.BeaconId, clu.ClerkId);
                return;
            }

            Chat newChat = new Chat
            {
                ChatId = new Guid(),
                BeaconId = beaconId,
                Partcipants = [clu, beacon.User]
            };

            _context.Chats.Add(newChat);
            _context.SaveChangesAsync();
            await Clients.All.SendAsync("NewChat", newChat.ChatId, newChat.BeaconId, beacon.User.ClerkId);
        }
    }
}
