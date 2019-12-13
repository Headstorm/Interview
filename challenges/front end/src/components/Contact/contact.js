import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha
} from "react-google-recaptcha-v3";

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      message: "",
      token: false,
      alert: ""
    };
  }

  // update state with values from form
  handleFormChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    let alertText = "";
    this.setState({ alert: alertText });
    let alerts = [];
    //validate name
    if (this.state.name.length <= 2) {
      alerts.push("Name length too short");
    }
    //validate email
    if (
      !this.state.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      alerts.push("Email address not valid");
    }
    //validate message
    if (this.state.message.length <= 2) {
      alerts.push("Message too short");
    }
    //validate recaptcha
    if (!this.state.token) {
      alerts.push("ReCaptcha not valid");
    }
    //set up alert string
    alertText = alerts.join(" & ");
    this.setState({ alert: alertText });
    //print data in console
    if (alerts.length === 0) {
      console.log("Form Data To Be Submitted");
      console.log("--------------------------------------------------------");
      console.log(
        "Name: " +
          this.state.name +
          "\n" +
          "Email: " +
          this.state.email +
          "\n" +
          "Message: " +
          this.state.message
      );
    }
  };

  render() {
    return (
      <GoogleReCaptchaProvider reCaptchaKey="6LcBUscUAAAAAE0tHcgT0mIdU527Pz-93hqQcOb1">
        {this.state.alert.length > 0 ? (
          <Alert variant="danger">
            <Alert.Heading>Oh Snap!</Alert.Heading>
            <p>{this.state.alert}</p>
          </Alert>
        ) : null}

        <Container>
          <h1>Email Us</h1>
          <Form onSubmit={this.handleFormSubmit}>
            <Row>
              <Col sm={6} xs={12}>
                <Form.Group>
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={this.state.name}
                    onChange={this.handleFormChange}
                  />
                </Form.Group>
              </Col>
              <Col sm={6} xs={12}>
                <Form.Group>
                  <Form.Label>Your Email</Form.Label>
                  <Form.Control
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={this.props.email}
                    onChange={this.handleFormChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Your Message</Form.Label>
                  <Form.Control
                    id="message"
                    name="message"
                    as="textarea"
                    placeholder="Your message"
                    rows="4"
                    onChange={this.handleFormChange}
                    value={this.props.message}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="double-border">
              <Button
                variant="success"
                type="submit"
                onSubmit={this.handleFormSubmit}
                className="call-to-action"
              >
                Let's Get Started
              </Button>
            </div>
          </Form>
        </Container>
        <GoogleReCaptcha
          onVerify={homepage => this.setState({ token: true })}
        />
      </GoogleReCaptchaProvider>
    );
  }
}

export default Contact;
