import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Navigation from "./components/Navigation/navbar.js";
import Footer from "./components/Footer/footer";
import Home from "./components/Home/home";
import Contact from "./components/Contact/contact";

function App() {
  return (
    <>
      <div>
        <Router>
          <Navigation></Navigation>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contact" component={Contact} />
          </Switch>
          <Footer></Footer>
        </Router>
      </div>
    </>
  );
}

export default App;
