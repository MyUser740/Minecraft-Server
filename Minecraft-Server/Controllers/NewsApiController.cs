using Minecraft_Server.Models;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Minecraft_Server.Controllers
{
    public class NewsApiController : ApiController
    {
        [Route("api/getRandomNews")]
        [HttpGet]
        public string getRandomNews(string lang)
        {
            List<NewsModel> NewsList = new List<NewsModel>();

            MySqlConnection con = new MySqlConnection(ConfigurationManager.ConnectionStrings["Main_SQL"].ConnectionString);
            MySqlCommand cmd = new MySqlCommand("SELECT * FROM `News Table` WHERE `Create By` != 'System' ORDER BY rand() LIMIT 5", con);

            MySqlDataAdapter sda = new MySqlDataAdapter(cmd);
            DataTable dt = new DataTable();

            sda.Fill(dt);

            try
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    string getTitle = "http://" + HttpContext.Current.Request.Url.Authority + $"/api/Translate?fromLanguage=en-GB&toLanguage={lang}&input={dt.Rows[i]["Title"].ToString()}";

                    NewsList.Add(new NewsModel
                    {
                        ID = Convert.ToInt32(dt.Rows[i]["ID"]),
                        Title = new HttpClient().GetStringAsync(getTitle).Result.Replace(@"""",""),
                        Description = dt.Rows[i]["Description"].ToString(),
                        Image = dt.Rows[i]["Image"].ToString(),
                        Create_By = dt.Rows[i]["Create By"].ToString(),
                        Vote = Convert.ToInt32(dt.Rows[i]["Vote"]),
                        Like = Convert.ToInt32(dt.Rows[i]["Like"]),
                        Viewed = Convert.ToInt32(dt.Rows[i]["Viewed"]),
                        Rate = Convert.ToInt32(dt.Rows[i]["Rate"]),
                        Created = Convert.ToDateTime(dt.Rows[i]["Created"])
                    });
                }

                return JsonConvert.SerializeObject(NewsList);
            }catch(Exception ex)
            {
                return ex.Message;
            }
        }

        [Route("api/getLatesNews")]
        [HttpGet]
        public string getLatesNews()
        {
            List<NewsModel> NewsList = new List<NewsModel>();

            MySqlConnection con = new MySqlConnection(ConfigurationManager.ConnectionStrings["Main_SQL"].ConnectionString);
            MySqlCommand cmd = new MySqlCommand("SELECT * FROM `News Table` ORDER BY Created DESC LIMIT 1", con);

            MySqlDataAdapter sda = new MySqlDataAdapter(cmd);
            DataTable dt = new DataTable();

            sda.Fill(dt);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                NewsList.Add(new NewsModel
                {
                    ID = Convert.ToInt32(dt.Rows[i]["ID"]),
                    Title = dt.Rows[i]["Title"].ToString(),
                    Description = dt.Rows[i]["Description"].ToString(),
                    Image = dt.Rows[i]["Image"].ToString(),
                    Create_By = dt.Rows[i]["Create By"].ToString(),
                    Vote = Convert.ToInt32(dt.Rows[i]["Vote"]),
                    Like = Convert.ToInt32(dt.Rows[i]["Like"]),
                    Viewed = Convert.ToInt32(dt.Rows[i]["Viewed"]),
                    Rate = Convert.ToInt32(dt.Rows[i]["Rate"]),
                    Created = Convert.ToDateTime(dt.Rows[i]["Created"])
                });
            }

            return JsonConvert.SerializeObject(NewsList);
        }

        [Route("api/getMostPopullar")]
        [HttpGet]
        public string getMostPopullar()
        {
            List<NewsModel> NewsList = new List<NewsModel>();

            MySqlConnection con = new MySqlConnection(ConfigurationManager.ConnectionStrings["Main_SQL"].ConnectionString);
            MySqlCommand cmd = new MySqlCommand("SELECT * FROM `News Table` WHERE `Create By` != 'System' ORDER BY Viewed DESC LIMIT 1", con);

            MySqlDataAdapter sda = new MySqlDataAdapter(cmd);
            DataTable dt = new DataTable();

            sda.Fill(dt);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                NewsList.Add(new NewsModel
                {
                    ID = Convert.ToInt32(dt.Rows[i]["ID"]),
                    Title = dt.Rows[i]["Title"].ToString(),
                    Description = dt.Rows[i]["Description"].ToString(),
                    Image = dt.Rows[i]["Image"].ToString(),
                    Create_By = dt.Rows[i]["Create By"].ToString(),
                    Vote = Convert.ToInt32(dt.Rows[i]["Vote"]),
                    Like = Convert.ToInt32(dt.Rows[i]["Like"]),
                    Viewed = Convert.ToInt32(dt.Rows[i]["Viewed"]),
                    Rate = Convert.ToInt32(dt.Rows[i]["Rate"]),
                    Created = Convert.ToDateTime(dt.Rows[i]["Created"])
                });
            }

            return JsonConvert.SerializeObject(NewsList);
        }

        [Route("api/getMostRate")]
        [HttpGet]
        public string getMostRate()
        {
            List<NewsModel> NewsList = new List<NewsModel>();

            MySqlConnection con = new MySqlConnection(ConfigurationManager.ConnectionStrings["Main_SQL"].ConnectionString);
            MySqlCommand cmd = new MySqlCommand("SELECT * FROM `News Table` WHERE `Create By` != 'System' ORDER BY Rate DESC LIMIT 1", con);

            MySqlDataAdapter sda = new MySqlDataAdapter(cmd);
            DataTable dt = new DataTable();

            sda.Fill(dt);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                NewsList.Add(new NewsModel
                {
                    ID = Convert.ToInt32(dt.Rows[i]["ID"]),
                    Title = dt.Rows[i]["Title"].ToString(),
                    Description = dt.Rows[i]["Description"].ToString(),
                    Image = dt.Rows[i]["Image"].ToString(),
                    Create_By = dt.Rows[i]["Create By"].ToString(),
                    Vote = Convert.ToInt32(dt.Rows[i]["Vote"]),
                    Like = Convert.ToInt32(dt.Rows[i]["Like"]),
                    Viewed = Convert.ToInt32(dt.Rows[i]["Viewed"]),
                    Rate = Convert.ToInt32(dt.Rows[i]["Rate"]),
                    Created = Convert.ToDateTime(dt.Rows[i]["Created"])
                });
            }

            return JsonConvert.SerializeObject(NewsList);
        }

        [Route("api/getMostVote")]
        [HttpGet]
        public string getMostVote()
        {
            List<NewsModel> NewsList = new List<NewsModel>();

            MySqlConnection con = new MySqlConnection(ConfigurationManager.ConnectionStrings["Main_SQL"].ConnectionString);
            MySqlCommand cmd = new MySqlCommand("SELECT * FROM `News Table` WHERE `Create By` != 'System' ORDER BY Vote DESC LIMIT 1", con);

            MySqlDataAdapter sda = new MySqlDataAdapter(cmd);
            DataTable dt = new DataTable();

            sda.Fill(dt);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                NewsList.Add(new NewsModel
                {
                    ID = Convert.ToInt32(dt.Rows[i]["ID"]),
                    Title = dt.Rows[i]["Title"].ToString(),
                    Description = dt.Rows[i]["Description"].ToString(),
                    Image = dt.Rows[i]["Image"].ToString(),
                    Create_By = dt.Rows[i]["Create By"].ToString(),
                    Vote = Convert.ToInt32(dt.Rows[i]["Vote"]),
                    Like = Convert.ToInt32(dt.Rows[i]["Like"]),
                    Viewed = Convert.ToInt32(dt.Rows[i]["Viewed"]),
                    Rate = Convert.ToInt32(dt.Rows[i]["Rate"]),
                    Created = Convert.ToDateTime(dt.Rows[i]["Created"])
                });
            }

            return JsonConvert.SerializeObject(NewsList);
        }

        [Route("api/getMostLike")]
        [HttpGet]
        public string getMostLike()
        {
            List<NewsModel> NewsList = new List<NewsModel>();

            MySqlConnection con = new MySqlConnection(ConfigurationManager.ConnectionStrings["Main_SQL"].ConnectionString);
            MySqlCommand cmd = new MySqlCommand("SELECT * FROM `News Table` WHERE `Create By` != 'System' ORDER BY `Like` DESC LIMIT 1", con);

            MySqlDataAdapter sda = new MySqlDataAdapter(cmd);
            DataTable dt = new DataTable();

            sda.Fill(dt);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                NewsList.Add(new NewsModel
                {
                    ID = Convert.ToInt32(dt.Rows[i]["ID"]),
                    Title = dt.Rows[i]["Title"].ToString(),
                    Description = dt.Rows[i]["Description"].ToString(),
                    Image = dt.Rows[i]["Image"].ToString(),
                    Create_By = dt.Rows[i]["Create By"].ToString(),
                    Vote = Convert.ToInt32(dt.Rows[i]["Vote"]),
                    Like = Convert.ToInt32(dt.Rows[i]["Like"]),
                    Viewed = Convert.ToInt32(dt.Rows[i]["Viewed"]),
                    Rate = Convert.ToInt32(dt.Rows[i]["Rate"]),
                    Created = Convert.ToDateTime(dt.Rows[i]["Created"])
                });
            }

            return JsonConvert.SerializeObject(NewsList);
        }
    }
}
