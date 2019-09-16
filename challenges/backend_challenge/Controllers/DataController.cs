using System.Collections.Generic;
using System.Linq;
using backend_challenge.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend_challenge.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private static List<double> Values {get; set;}

        [HttpGet]
        public ActionResult<IEnumerable<double>> Get()
        {
            return Values;
        }

        [HttpPost]
        public void Post([FromBody] DataModel data)
        {
            Values = data.Values.ToList();
        }
    }
}