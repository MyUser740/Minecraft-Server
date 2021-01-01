using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Minecraft_Server.Hubs
{
    public class notificationHub : Hub
    {
        public void Send(int id, string User, string From, string Message, DateTime DateSend)
        {
            Clients.All.Reacive(id,User, From, Message, DateSend.ToString("yyyy/MMM/dd/HH/mm/ss/") + DateSend.Millisecond);
        }
    }
}