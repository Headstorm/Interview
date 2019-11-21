import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from './components/ContactForm';

class App extends React.Component {
  render() {
    return (
      <div class="container">
        <h1>Your Company Name</h1>
        <br />
        <h3>Contact Us</h3>
        <ContactForm />
      </div>
    );
  }
}

export default App;
