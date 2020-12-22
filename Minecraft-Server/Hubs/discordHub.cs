using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Minecraft_Server.Hubs
{
    public class discordHub : Hub
    {
        public void Banning(string user)
        {
            Clients.All.Banned(user);
        }
    }
}