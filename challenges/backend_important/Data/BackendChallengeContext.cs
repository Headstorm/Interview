using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BackendChallenge.Models;

    public class BackendChallengeContext : DbContext
    {
        public BackendChallengeContext (DbContextOptions<BackendChallengeContext> options)
            : base(options)
        {
        }

        public DbSet<RandomNumber> RandomNumbers { get; set; }

        public Task<int> SaveChangesAsync()
        {
            return base.SaveChangesAsync();
        }
    }
