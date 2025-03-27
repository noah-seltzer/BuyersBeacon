using Microsoft.AspNetCore.SignalR;

namespace server.Hubs
{
    public class ChatHub: Hub
    {
        public async Task SendMessage(string user, string message)
        {
            Console.WriteLine("CONNECTION MESSAGE!!!");
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

    }
}
