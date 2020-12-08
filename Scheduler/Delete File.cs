using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler
{
    class Delete_File
    {
        static string Location = @"d:\DZHosts\LocalUser\USSR\www.Server.somee.com\Data\Uploaded Files";
        public static void Schedule()
        {

            Console.WriteLine("Success to open Delete_File schedule");
            Logging.Log("Success to open Delete_File schedule", "info");

            for (; ; )
            {
                Console.WriteLine("trying to delete file");
                Logging.Log("trying to delete file", "info");

                Console.WriteLine("Get Files....");
                Logging.Log("Get Files....", "debug");

                string[] filePath = Directory.GetFiles(Location);

                foreach (string files in filePath)
                {
                    Console.WriteLine("File Path->" + files);
                    Logging.Log("File Path->" + files, "debug");
                    try
                    {
                        File.Delete(files);
                        Console.WriteLine("Success to delete files");
                        Logging.Log("Success to delete files", "info");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Error->" + ex.Message + "\n" + ex.StackTrace);
                        Logging.Log("Error->" + ex.Message + "\n" + ex.StackTrace, "exception");
                    }
                }

                Thread.Sleep(604000000);
            }
        }
    }
}
