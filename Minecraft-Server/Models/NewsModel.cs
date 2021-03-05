using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Minecraft_Server.Models
{
    public class NewsModel
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string Create_By { get; set; }
        public int Vote { get; set; }
        public int Like { get; set; }
        public int Viewed { get; set; }
        public int Rate { get; set; }
        public DateTime Created { get; set; }
    }
}