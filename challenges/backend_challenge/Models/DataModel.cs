using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using backend_challenge.Validators;

namespace backend_challenge.Models
{
    public class DataModel
    {
        [Required]
        [ListLength(2)]
        public IEnumerable<double> Values { get; set; }
    }
}