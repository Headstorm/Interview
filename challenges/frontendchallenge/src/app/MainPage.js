import React from 'react'
import ContactInfo from '../models/contactInfo'
import GoogleCaptcha from 'react-google-recaptcha'

export class MainPage extends React.Component {
    state = {
        verified: false,
        firstName: "",
        lastName: "",
        email: "",
        infoList: []
    }

    render() {
        let button;
        if (this.state.canSubmit) {
          button = (
            <button
              name="submit"
              type="button"
              className="btn btn-primary"
              onClick={(event) => {
                const list = this.state.infoList.concat(
                  new ContactInfo(
                    this.state.firstName,
                    this.state.lastName,
                    this.state.email
                  )
                );
                console.log(
                  "Name: " +
                    this.state.firstName +
                    " " +
                    this.state.lastName +
                    " Email: " +
                    this.state.email
                );
                this.setState({
                  infoList: list,
                });
              }}
            >
              Submit
            </button>
          );
        } else {
          button = (
            <button
              disabled
              name="submit"
              type="button"
              className="btn btn-secondary"
            >
              Submit
            </button>
          );
        }
        return (
          <>
            <div className="container">
              <h1 classsName="text-center">Big Red Tires Co.</h1>
            </div>
    
            <div className="container">
              <h3>
                <u>Contact Us</u>
              </h3>
              <label htmlFor="firstName">First Name</label>
              <input
                name="firstName"
                id="firstName"
                className="form-control"
                type="text"
                value={this.state.firstName}
                onChange={(event) =>
                  this.setState({ firstName: event.target.value })
                }
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                name="lastName"
                id="firstName"
                className="form-control"
                type="text"
                value={this.state.lastName}
                onChange={(event) =>
                  this.setState({ lastName: event.target.value })
                }
              />
              <label htmlFor="email">Email</label>
              <input
                name="email"
                id="email"
                className="form-control"
                type="text"
                value={this.state.email}
                onChange={(event) => this.setState({ email: event.target.value })}
              />
              <GoogleCaptcha
                style={{ marginTop: 20 + "px", marginBottom: 20 + "px" }}
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={(event) => this.setState({ canSubmit: true })}
              />
              {button}
            </div>
          </>
        );
      }
}

export default MainPage;