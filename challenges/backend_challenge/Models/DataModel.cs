using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend_challenge.Models
{
    public class DataModel
    {
        [Required]
        public IEnumerable<double> values { get; set; }
    }
}