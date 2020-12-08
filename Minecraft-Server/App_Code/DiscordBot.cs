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
            string loc = Server.MapPath("..") + @"\Data\Linux\App\discordApp\nodeJS\Launch.bat";

            dcBot.StartInfo.FileName = loc;
            dcBot.StartInfo.CreateNoWindow = true;

            dcBot.WaitForExit();

        }

        public void Stop()
        {
            string loc = Server.MapPath("..") + @"\Data\Linux\App\discordApp\nodeJS\Launch.bat";

            dcBot.StartInfo.FileName = loc;

            dcBot.Close();

        }
    }
}