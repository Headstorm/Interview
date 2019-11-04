import React, { useEffect } from 'react';
import './App.css';
import { Navbar, Footer, Form } from './components/index';
import { loadReCaptcha } from 'react-recaptcha-v3';

function App() {

  useEffect(() => {
    //This is to load the Google ReCaptcha with the sitekey
    loadReCaptcha('6Le3WMAUAAAAAOCR9AMk7lEj-N8S_bo-nLfRKOXW');
  })


  return (
    <div style={{position: 'relative'}}>
      <Navbar />
      
      {/*Adding MinHeight to keep footer at the bottom of the page*/}
      <div style={{minHeight: '100vh'}}>
        <Form />
      </div>
      
      <Footer />
    </div >
  );
}

export default App;
