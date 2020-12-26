using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;
using System.Globalization;

namespace WebApplication1
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            
        }

        void Session_Start(object sender, EventArgs e)
        {
            //initializes Cache on first request
            AppStart.Start(HttpContext.Current);
        }

        void Application_BeginRequest(object sender, EventArgs e)
        {
            //initializes Culture
            if(Request.Cookies["stg_lang"].Value != null)
            {
                CultureInfo.CurrentCulture = new CultureInfo(Request.Cookies["stg_lang"].Value,false);
                CultureInfo.CurrentUICulture = new CultureInfo(Request.Cookies["stg_lang"].Value, false);
            }
        }
    }

    public class AppStart
    {
        static bool _init = false;
        private static Object _lock = new Object();

        /// <summary>
        /// Does nothing after first request
        /// </summary>
        /// <param name="context"></param>
        public static void Start(HttpContext context)
        {
            if (_init)
            {
                return;
            }
            //create class level lock in case multiple sessions start simultaneously
            lock (_lock)
            {
                if (!_init)
                {
                    string server = context.Request.ServerVariables["SERVER_NAME"];
                    string port = context.Request.ServerVariables["SERVER_PORT"];
                    HttpRuntime.Cache.Insert("basePath", "http://" + server + ":" + port + "/");
                    _init = true;
                }
            }
        }
    }
}