using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using backend_challenge.Validators;

namespace backend_challenge.Models
{
    public class DataModel
    {
        public const int ListLength = 2;

        [Required]
        [ListLength(ListLength)]
        public IEnumerable<double> Values { get; set; }
    }
}