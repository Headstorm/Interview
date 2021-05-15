import "./App.css";
import React from "react";
import ContactUs from "./pages/ContactUs";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    align: "right",
  },
  paper: {
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    width: "50%",
  },
}));

function App() {
  const classes = useStyles();
  const companyName = "Headstorm";
  document.title = "Headstorm";

  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid container>
          <NavBar>
            <Header title={companyName} variant="h5" position="left" />
            <Button color="inherit">Contact Us</Button>
          </NavBar>
        </Grid>
        <Grid item container justify="center">
          <Paper elevation={5} className={classes.paper}>
            <Header
              variant="h5"
              components="h6"
              color="primary"
              title="Contact Us"
            />
            <ContactUs />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
