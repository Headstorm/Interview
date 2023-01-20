using BackendChallenge.Services;
using BackendChallenge.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

/*
I've had some trouble with errors that I'm not quite able to identify; seems as though it's consistently had something to do with my
"user" not having proper permissions for my own local api, and I'm pretty stuck on getting that working.
However, I think the actual logic of my api endpoints is sound, though I haven't been able to properly test due to the strange runtime
errors; may have something to do with my Connection String in appsettings.json.  Feel free to pick it apart nonetheless and I apologize
I wasn't able to deliver a fully functional api for the purposes of this challenge.  Thanks for looking over my code regardless though!
*/

namespace BackendChallenge.Controllers
{
    [Route("data/")]
    [ApiController]
    public class RandomNumbersController : ControllerBase
    {
        private readonly IBackendChallengeService _backendChallengeService;
        private readonly BackendChallengeContext _backendChallengeContext;

        public RandomNumbersController(IBackendChallengeService backendChallengeService, BackendChallengeContext backendChallengeContext)
        {
            _backendChallengeService = backendChallengeService;
            _backendChallengeContext = backendChallengeContext; 
        }

        [HttpGet]
        public async Task<IActionResult> GetNumbers()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var response = _backendChallengeService.GetSortedNumbers();
                return Ok(response);
            }
            catch (Exception ex)
            {
                var exception = ex.Message;
                return Problem("There was a problem retrieving sorted numbers.", null, 500);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateNumbers([FromBody] int[] randomNumbers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                if (randomNumbers.Length == 5)
                {
                    foreach (var value in randomNumbers) {
                        var type = value.GetType();
                        if (!type.Equals(typeof(int))) {
                            return Problem("Provided value is not a list of numbers.", null, 500);
                        }
                    }
                    // Clear the db context before adding new numbers.  This is running with the assumption of only needing to
                    // store one list of numbers at a time.  This would change if supporting multiples lists was the goal.
                    var set = _backendChallengeContext.Set<RandomNumber>();
                    if (set.Any()) {
                        _backendChallengeContext.RandomNumbers.RemoveRange(_backendChallengeContext.RandomNumbers);
                    };
                    foreach (var number in randomNumbers) {
                        var randomNum = new RandomNumber();
                        // Could be used in the future to help scale this to multiple sets of numbers.
                        // randomNum.group = key;
                        randomNum.number = number;
                        _backendChallengeContext.Add(randomNum);
                    }
                    await _backendChallengeContext.SaveChangesAsync();
                    return Ok(randomNumbers);
                }
                else {
                    return Problem("Provided list of numbers does not have length of 500.", null, 500);
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Problem("There was a problem creating the list.", null, 500);
            }
        }
    }
}
