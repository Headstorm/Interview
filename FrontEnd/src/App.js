import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';
import Recaptcha from 'react-recaptcha';

export default class App extends Component {
  render() {
    return (
      <Register />
    );
  }
}

// eslint-disable-next-line
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );    
    return valid;
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    
    this.state = {
      firstName: null,
      email: null,
      message: null,
      isVerified: false,
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      }
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'firstName': 
        errors.firstName = value.length == 0 ? 'Please enter your first name' : '';
        break;

        case 'lastName': 
        errors.lastName = value.length == 0  ? 'Please enter your last name'  : '';
        break;
      case 'email': 
        errors.email = validEmailRegex.test(value) ? '' : 'Please enter a valid email address';
        break;
      case 'message': 
        errors.message = value.length == 0 ? 'Please enter your message or question' : '';
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }
 
  recaptchaLoaded(){
    console.log('recaptcha loaded');
  }

  verifyCallback = (response) => {
    console.log("verifyCallback called and set to true");

    if(response){      
      this.setState({
        isVerified: true
      })
      
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();    

    if(!this.state.isVerified){
      alert('Pleave verify that you are a human using the reCaptcha'); 
      return;
    }

    if(validateForm(this.state.errors)  && 
            this.state.firstName != null && 
            this.state.lastName != null && 
            this.state.email != null && 
            this.state.message != null){    
      console.info(this.state)
      alert('Thank you! \nYour message has been successfully sent. We will contact you shortly!')   
    }else{
      alert('Oops! The form is missing information — please review.')
    }
  }

  render() {
    const {errors} = this.state;
    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>Contact Us</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className='firstName'>
              <label htmlFor="firstName">First Name</label>
              <input type='text' name='firstName' onChange={this.handleChange} Validate />
              {errors.firstName.length > 0 && 
                <span className='error'>{errors.firstName}</span>}
            </div>
            <div className='lastName'>
              <label htmlFor="lastName">Last Name</label>
              <input type='text' name='lastName' onChange={this.handleChange} Validate />
              {errors.lastName.length > 0 && 
                <span className='error'>{errors.lastName}</span>}
            </div>
            <div className='email'>
              <label htmlFor="email">Email</label>
              <input type='email' name='email' onChange={this.handleChange} Validate />
              {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
            </div>
            <div className='message'>
              <label htmlFor="message">Message</label>
              <textarea type='message' name='message' onChange={this.handleChange} Validate />
              {errors.message.length > 0 && 
                <span className='error'>{errors.message}</span>}
            </div>   
            <br/> 
            <div class ='g-recaptcha'>              
              <Recaptcha sitekey = "6Ldj9-EUAAAAAHoDaurvBY6BAt1CdrP2d0jyd8Sy" 
              render="explicit" 
              onloadCallback={() => console.log("recaptcha loaded")} 
              verifyCallback={(response) => {this.verifyCallback(response)}}              />
            </div>  
            <div className='submit'>            
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));