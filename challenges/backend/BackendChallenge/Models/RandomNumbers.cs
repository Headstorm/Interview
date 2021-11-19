namespace BackendChallenge.Models
{
    // Class used to represent the individual numbers added to the dbContext.
    public class RandomNumber
    {
        public int id {get;set;}
        public int number { get; set; }

        // Could be used in the future to help scale this to multiple lists of numbers.
        // public int group { get; set; }
    }
}