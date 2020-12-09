using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace Minecraft_Server.App_Code
{
    public class DiscordBot : HttpApplication
    {
        Process dcBot = new Process();
        public void Start()
        {
            //string loc = System.Web.HttpContext.Current.Server.MapPath("..") + @"\Data\Linux\App\discordApp\nodeJS\Launch.bat";

            dcBot.StartInfo.WorkingDirectory = System.Web.HttpContext.Current.Server.MapPath("..") + @"\Data\Linux\App\discordApp\nodeJS\";
            dcBot.StartInfo.FileName = "Launch.bat";
            //dcBot.StartInfo.CreateNoWindow = true;

            dcBot.Start();

        }

        public void Stop()
        {
            string loc = System.Web.HttpContext.Current.Server.MapPath("..") + @"\Data\Linux\App\discordApp\nodeJS\Launch.bat";

            dcBot.StartInfo.FileName = loc;

            dcBot.Close();

        }
    }
}