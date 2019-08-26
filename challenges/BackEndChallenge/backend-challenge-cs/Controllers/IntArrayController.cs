using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendChallengeWebApi.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BackendChallengeWebApi.Controllers
{
    [Route("data/")]
    [ApiController]
    public class IntArrayController : ControllerBase
    {
        private readonly IIntArrayRepository repository;

        public IntArrayController(IIntArrayRepository repository)
        {
            this.repository = repository;
        }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var intArray = repository.GetIntArraySorted();
            return Ok(intArray);
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] List<int> intArray)
        {
            if (intArray.Count != 500) 
            {
                return BadRequest("Provide integer array with 500 elements");
            }
            repository.SetIntArray(intArray);
            return Ok();
        }
    }
}
