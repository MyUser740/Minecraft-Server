using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Minecraft_Server.Hubs
{
    public class chatHub : Hub
    {
        public void Send(string from, string sender, string message)
        {
            Clients.All.Get(new DateTime().ToString(), from,sender,message);
        }
    }
}