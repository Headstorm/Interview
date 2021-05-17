import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      margin: theme.spacing(1),
    },
  },
}));

/**
 * Form Dynamic Template.
 *
 * Uses Initial Value Forms to initilize all values with their corresponding values.
 * If Validation On Change is Set to True; custom `validate` function is required for input validation.
 * Executes `validate` function for custom form validations.
 *
 * @param {*} initialFormValues Values from Initial Object Structure.
 * @param {*} validateOnChange  Boolean for Validation
 * @param {*} validate  Given Custom Validation function function.
 * @returns {*} Dynamic Objects used to manipulate Form; { values, setValues, errors, setErrors, handleInputChange }
 */
export function useForm(initialFormValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    /* In TextField we have a variable 'name' gives that field a name. It is used as a pointer that changes dynamically. */
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  /**
   * Quick function to display Form Values to console.
   */
  const displayFormValues = (_) => {
    console.log("Form Values: ");
    console.log(values);
  };

  return {
    values,
    errors,
    setErrors,
    handleInputChange,
    displayFormValues,
  };
}

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;

  /* Show all inner childs here.  */
  return (
    <form className={classes.root} autoComplete="false" {...other}>
      {props.children}
    </form>
  );
}
