import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MessageIcon from "@material-ui/icons/Mail";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Recaptcha from "react-recaptcha";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/skay97" target="_blank">
        Salman Karim
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#e85a28"
  },
  form: {
    width: "100%", // Fixes IE 11 issue.
    marginTop: theme.spacing(3)
  },
  label: {
    color: "#e85a28"
  },
  paper: {
    marginTop: theme.spacing(16),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  root: {
    "& input:valid:focus + fieldset": {
      borderColor: "#e85a28"
    }
  },
  submit: {
    backgroundColor: "#e85a28",
    color: "#fff",
    margin: theme.spacing(3, 0, 2)
  }
});

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      text: "",
      isVerified: false
    };
  }

  // Arrow functions lexically bind "this" to the react class, thus we do not need to bind our funcs in the constructor
  loadRecaptcha = () => {
    console.log("recaptcha successful");
  };

  verifyCallback = response => {
    if (response) {
      this.setState({
        isVerified: true // we set state to true if response is provided
      });
    }
  };

  handleChange = event => {
    // dynamically sets key-value pair and in this way revokes the need to write multiple onChange functions
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = () => {
    const { firstName, lastName, email, text } = this.state; // destructures values from the state object
    console.log(
      `First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Text: ${text}`
    );
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      text: ""
    });
  };

  // function renders button dependant on what conditions are met
  showButton = () => {
    const { classes } = this.props;
    // A ternary could be used below, however I feel the multi line jsx would make the code harder to read
    if (this.state.email && this.state.text !== "" && this.state.isVerified) {
      return (
        <Button
          fullWidth
          variant="contained"
          className={classes.submit}
          onClick={this.handleClick}
        >
          Submit
        </Button>
      );
    }
    return (
      <Button fullWidth variant="contained" className={classes.submit} disabled>
        Submit
      </Button>
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <MessageIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contact Us
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="first name"
                  autoFocus
                  className={classes.root}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="last name"
                  className={classes.root}
                  fullWidth
                  id="lastName"
                  variant="outlined"
                  label="Last Name"
                  name="lastName"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  className={classes.root}
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  onChange={this.handleChange}
                  required
                  value={this.state.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.root}
                  fullWidth
                  id="text"
                  name="text"
                  onChange={this.handleChange}
                  placeholder="Leave us a brief message*"
                  rowsMax="8"
                  value={this.state.text}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            {this.showButton()}
          </form>
        </div>
        <Box mt={2}>
          <Recaptcha
            sitekey={process.env.REACT_APP_RECAPTCHA_KEY} // hides sitekey from github
            render="explicit"
            onloadCallback={this.loadRecaptcha}
            verifyCallback={this.verifyCallback}
          />
        </Box>
        <Box mt={6}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(Contact);
