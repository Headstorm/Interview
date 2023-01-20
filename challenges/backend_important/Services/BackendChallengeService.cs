using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace BackendChallenge.Services
{
    public class BackendChallengeService : IBackendChallengeService
    {
        private readonly IConfiguration _config;
        private BackendChallengeContext _context;

        public BackendChallengeService(IConfiguration config, BackendChallengeContext context)
        {
            _config = config;
            _context = context;
        }

        public int[] GetSortedNumbers()
        {
            List<int> numList = new List<int>();

            /* Could use the idea of grouping to scale this to multiple lists as mentioned in RandomNumbers.cs.
               Would need to just check for group # prior to adding to array of nums to be sorted and returned.
               Currently just runs through the first 500 nums in the database because there should only ever be
               500 nums in the database at a time with the current design of the POST request. */
            for (var i = 0;i < 500;i++) {
                numList.Add(_context.RandomNumbers.Find(i).number);
            }
            // Sort the numbers pulled from the dbContext before returning.
            numList.ToArray();
            numList.Sort();
            return numList.ToArray();
        }
    }
}
