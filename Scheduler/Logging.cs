using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler
{
    class Logging
    {
        static string Location = @"d:\DZHosts\LocalUser\USSR\www.Server.somee.com\Data\Linux\App\scheduler\";
        static string LocationGlobalLog = @"d:\DZHosts\LocalUser\USSR\www.Server.somee.com\Data\Linux\App";
        public static void Log(string msg, string role)
        {
            using (StreamWriter sw = new StreamWriter(Location + "log/File.log"))
            {
                sw.WriteLine(role + "|" + DateTime.Now.ToString() + "|" + msg + "\n");
            }

            using (StreamWriter sws = new StreamWriter(LocationGlobalLog + "/File.log"))
            {
                sws.WriteLine(role + "|" + DateTime.Now.ToString() + "|" + msg + "\n");
            }
        }
    }
}
