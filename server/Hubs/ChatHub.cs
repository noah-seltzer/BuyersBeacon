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

        public async Task SendMessage(Guid chatId, string senderClerkId, string message)
        {
            Console.WriteLine(chatId);
            Console.WriteLine(senderClerkId);
            Console.WriteLine(message);
            await Clients.All.SendAsync("ReceiveMessage", message);

            // See if the chat exist where senderClerkId is participant
            var chat = await (
                from c in _context.Chats.Include(c => c.Participants)
                where c.ChatId == chatId && c.Participants.Any(p => p.ClerkId == senderClerkId)
                select c
            ).FirstOrDefaultAsync();
            
            if (chat == null)
            {
                throw new Exception("Chat not found");
            }

            // Since we now each chat can have to 2 participants, the other use is the reciever
            User sender = chat.Participants.Where(p => p.ClerkId == senderClerkId).FirstOrDefault();

            if (sender == null) {
                throw new Exception("Sender or reciever not found");
            }

            // Create message
            ChatMessage newMessage = new ChatMessage
            {
                ChatMessageId = new Guid(),
                ChatId = chat.ChatId, 
                UserId = sender.UserId, 
                Message = message
            };

            // Save message
            _context.Add(newMessage);
            await _context.SaveChangesAsync();


            // Emit new message event
            await Clients.All.SendAsync("ReceiveMessage", chat.ChatId, sender.UserId, newMessage.Message);
        }

        public async Task InitializeChat(Guid beaconId, string clerkId) {

            var beacon = await _context.Beacons
                .Include(b => b.User)
                .Include(c => c.Chats)
                .ThenInclude(c => c.Participants)
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
                    from chat in _context.Chats.Include(c => c.Participants)
                    where chat.BeaconId == beacon.BeaconId && chat.Participants.Any(u => u.UserId == clu.UserId)
                    select chat
                ).FirstOrDefaultAsync();


            // If the chat already exist. Send message to sender
            if (existingChat != null) {
                await Clients.Caller.SendAsync("NewChat", existingChat.ChatId, existingChat.BeaconId,  new List<string> {clu.ClerkId});
                return;
            }

            Chat newChat = new Chat
            {
                ChatId = new Guid(),
                BeaconId = beaconId,
                Participants = [clu, beacon.User]
            };

            _context.Chats.Add(newChat);
            await _context.SaveChangesAsync();
            await Clients.All.SendAsync("NewChat", newChat.ChatId, newChat.BeaconId, new List<string> { beacon.User.ClerkId, clu.ClerkId });
        }
    }
}
