using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Minecraft_Server.Controllers
{
    public class DeveloperController : Controller
    {
        // GET: Developer
        public ActionResult DiscordBot()
        {
            return View();
        }

        public string StartBot()
        {
            try
            {
                App_Code.DiscordBot discordBot = new App_Code.DiscordBot();
                discordBot.Start();
                return "success";
            }
            catch(Exception ex)
            {
                return "error|" + ex.Message;
            }
        }
    }
}