import React, { useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid";
import InputTextField from "../components/InputTextField";
import { Form, useForm } from "../components/useForm";

const _reCAPTCHA_site_key_ = process.env.REACT_APP_reCAPTCHA_site_key_;
const domain =
  process.env.REACT_APP_ENV_DOCKER === "True"
    ? process.env.REACT_APP_DOCKER_COMPOSE
    : process.env.REACT_APP_LOCAL_URL;
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  submitButton: {
    marginRight: theme.spacing(2),
    textAlign: "right",
  },
}));

// Initial Form Values
const initialFormValues = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  companyName: "",
  description: "",
};

export default function ContactUs() {
  const classes = useStyles();

  // Field Validations specifically for the Email. Every other value is just required.
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "Please fill this field.";
    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "Please fill this field.";
    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "Please fill this field.";
    if ("emailAddress" in fieldValues)
      temp.emailAddress = /$^|.+@\w+\.\w+/.test(fieldValues.emailAddress)
        ? ""
        : "This is not a valid email.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "" || x === false);
  };

  // Load token when this Form Loads. This could be an issue because experiation is in 2 minutes.
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${_reCAPTCHA_site_key_}`;
    document.body.appendChild(script);
  }, []); // eslint-disable-next-line

  // When the Submit Button is clicked on the Form
  // It executes it executes the
  const handleClick = () => {
    window.grecaptcha
      .execute(_reCAPTCHA_site_key_, { action: "onSubmit" })
      .then((token) => {
        fetch(`${domain}${token}`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((res) => res)
          .then((res) => res.json()) //.then((res) => console.log(res.success, res["success"]))
          .then((res) => {
            if (res.success) {
              console.log(res);
              console.log("Hi Human");
            } else {
              console.log(res);
              console.log("Hi Robot");
            }
          })
          .catch((err) => console.log("Error: ", err));
      });
  };

  // Import Form 'useForm's reusable functions.
  const {
    values,
    errors,
    setErrors,
    handleInputChange,
    displayFormValues,
  } = useForm(initialFormValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate) {
      displayFormValues();
      handleClick();
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid
          container
          justify="space-evenly"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item xs>
            <InputTextField
              required
              name="firstName"
              size="small"
              label="First Name"
              value={values.firstName}
              onChange={handleInputChange}
              error={errors.firstName}
            />
            <InputTextField
              required
              id="lastName"
              name="lastName"
              size="small"
              label="Last Name"
              value={values.lastName}
              onChange={handleInputChange}
              error={errors.lastName}
            />
          </Grid>

          <Grid item xs>
            <InputTextField
              id="emailAddress"
              name="emailAddress"
              label="Email Address"
              size="small"
              value={values.emailAddress}
              onChange={handleInputChange}
              error={errors.emailAddress}
            />
            <InputTextField
              id="companyName"
              name="companyName"
              size="small"
              label="Company Name"
              value={values.companyName}
              onChange={handleInputChange}
              error={errors.companyName}
            />
          </Grid>

          <Grid item xs={12}>
            <InputTextField
              required
              id="description"
              name="description"
              size="medium"
              label="Description"
              multiline
              rows={5}
              value={values.description}
              onChange={handleInputChange}
              error={errors.description}
            />
          </Grid>

          <Grid item xs={12} className={classes.submitButton}>
            <Button
              className="g-recaptcha"
              data-sitekey="sitekey"
              data-callback="onSubmit"
              type="submit"
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Form>
    </>
  );
}
