import React from 'react';
import './ContactForm.css';
import GoogleCaptcha from 'react-google-recaptcha'

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          buttonIsDisabled: true,
          name: '',
          email: '',
          phone: '',
          message: '',
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    enableButton() { document.getElementById("submitBtn").disabled = false; }

    handleNameChange = (e) => { this.setState({name: e.target.value}); }
    handleEmailChange = (e) => { this.setState({email: e.target.value}); }
    handlePhoneChange = (e) => { this.setState({phone: e.target.value}); }
    handleMessageChange = (e) => { this.setState({message: e.target.value}); }

    handleSubmit() {
        console.log('Name: ' + this.state.name);
        console.log('Email: ' + this.state.email);
        console.log('Phone: ' + this.state.phone);
        console.log('Message: ' + this.state.message);
    }

    render() {
        return (
            <div className = "centerBox">
                <div className = "form">
                    <h1>BODYRAIN SOFTWARE SOLUTIONS</h1>
                    <h2>Contact Form</h2>
    
                    <h4> Name <input type="text" id="nameId" onChange={(e) => this.handleNameChange(e)} /> </h4>
                    <h4> Email <input type="text" id="emailId" onChange={(e) => this.handleEmailChange(e)} /> </h4>
                    <h4> Phone <input type="text" id="phoneId" onChange={(e) => this.handlePhoneChange(e)} /> </h4>
                    <h4> Message <input type="text" className = "messageField" id="messageId" onChange={(e) => this.handleMessageChange(e)} /> </h4>
                </div>
    
                <div className = "captcha">
                    <GoogleCaptcha
                        sitekey="6Lf2TZoaAAAAALttxj9Li7-wz62EtXdZ2vZTdLKF"
                        onChange={(event) => this.enableButton() }
                    />
                </div>
    
                <div className = "submitButton">
                    <button id="submitBtn" className = "btn btn-primary" disabled={this.state.buttonIsDisabled}> Submit </button>
                </div>
                <button onClick = {this.handleSubmit()}></button>
            </div>
        );
    }
}

export default ContactForm;