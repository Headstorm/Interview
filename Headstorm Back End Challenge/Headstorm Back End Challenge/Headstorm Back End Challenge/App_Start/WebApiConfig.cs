using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Headstorm_Front_End_Challenge
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{list}",
                defaults: new { list = RouteParameter.Optional }
            );
        }
    }
}
