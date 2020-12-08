using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Starting.....");
            Logging.Log("Starting.....","debug");

            Delete_File.Schedule();
        }
    }
}
