import React from 'react';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',               // Name filled into contact form
      email: '',              // Email filled into contact form
      messageBody: '',        // Message filled into contact form
      recaptchaValid: false,  // Set to true in the verifyCaptcha callback
      isFormValid: false      // Determines if submit button will be enabled
    };
    
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.verifyCaptcha = this.verifyCaptcha.bind(this);
  }

  // Checks whether the values for a given state
  // are in a format that can be submitted.
  // For now we just check that they are not empty
  // and that the captcha is valid.
  validateForm(state) {
    return state.name !== "" 
      && state.email !== "" 
      && state.messageBody !== ""
      && state.recaptchaValid;
  }
  
  // Called when a value from a form control changes.
  // We check if the form is valid and update the
  // state accordingly.
  handleFormChange(event) {
    var state = this.state;
    state[event.target.name] = event.target.value
    
    this.setState({
      [event.target.name]: event.target.value, 
      isFormValid: this.validateForm(state)
    });
  }
  
  // Called when the submit button is pressed. Logs
  // contact information into the console.
  handleFormSubmit(event) {
    event.preventDefault();
    
    var state = this.state;
    console.log('Name: ' + state['name'] + '\n'
      + 'Email: ' + state['email'] + '\n'
      + 'Message: ' + state['messageBody']);
  }
  
  // Callback for Google ReCaptcha
  verifyCaptcha(token) {
    console.log('Captcha verified: ' + token);
    this.setState({recaptchaValid: true});
  }
  
  // Form controls were styled with the use of Bootstrap
  render() {
    return (
      <>
        <form onSubmit={this.handleFormSubmit}>
          <div class="form-group">
            <label for="nameInput">Name</label>
            <input id="nameInput" class="form-control" name="name" type="text" value={this.state.name} onChange={this.handleFormChange} /><br />
          </div>
          
          <div class="form-group">
            <label for="emailInput">Email</label>
            <input id="emailInput" class="form-control" name="email" type="email" value={this.state.email} onChange={this.handleFormChange} /><br />
          </div>
          
          <div class="form-group">
            <label for="messageInput">Message</label>
            <textarea id="messageInput" class="form-control" name="messageBody" value={this.state.messageBody} onChange={this.handleFormChange} /><br />
          </div>
          
          <input id="submitButton" disabled={!this.state.isFormValid} type="submit" value="Submit" class="btn btn-primary" />
        </form>
        
        <GoogleReCaptchaProvider reCaptchaKey="6LdIocEUAAAAAE1CovahwssG1dQg-zDDe8QbWpJW">
          <GoogleReCaptcha onVerify={this.verifyCaptcha} />
        </GoogleReCaptchaProvider>
      </>
    );
  }
}

export default ContactForm;