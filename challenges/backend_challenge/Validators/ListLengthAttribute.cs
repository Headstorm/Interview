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
            int length = values.Count();

            if (length < _requiredLength)
            {
                return new ValidationResult(GetErrorMessage(length));
            }

            return ValidationResult.Success;
        }

        private String GetErrorMessage(int invalidLength)
        {
            return $"Invalid number of values supplied{Environment.NewLine}" +
                $"Received: {invalidLength}{Environment.NewLine}" +
                $"Required: {_requiredLength}";
        }
    }
}