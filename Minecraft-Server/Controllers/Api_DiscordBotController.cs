using Minecraft_Server.App_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Minecraft_Server.Controllers
{
    public class Api_DiscordBotController : ApiController
    {
        public string Get(int actionId)
        {
            if(actionId == 0)
            {
                try
                {
                    DiscordBot discordBot = new DiscordBot();
                    discordBot.Start();
                    return "success";
                }catch(Exception ex)
                {
                    return "error|" + ex.Message;
                }
            }
            else if (actionId == 1)
            {
                try
                {
                    DiscordBot discordBot = new DiscordBot();
                    discordBot.Stop();
                    return "success";
                }
                catch (Exception ex)
                {
                    return "error|" + ex.Message;
                }
            }
            else
            {
                return "error|Invalid Action ID";
            }
        }
    }
}
