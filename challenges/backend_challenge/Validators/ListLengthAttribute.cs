using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using backend_challenge.Models;

namespace backend_challenge.Validators
{
    public class ListLengthAttribute : ValidationAttribute
    {
        private int _requiredLength { get; set; }

        public ListLengthAttribute(int length)
        {
            _requiredLength = length;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            DataModel dataModel = (DataModel) validationContext.ObjectInstance;
            IEnumerable<double> values = (IEnumerable<double>) value;

            if (values.Count() < _requiredLength)
            {
                return new ValidationResult($"Invalid number of values supplied{Environment.NewLine}" +
                $"Received: {values.Count()}{Environment.NewLine}" +
                $"Required: {_requiredLength}");
            }

            return ValidationResult.Success;
        }
    }
}