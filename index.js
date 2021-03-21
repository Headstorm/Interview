import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {Component, useRef} from 'react';
import {useForm} from 'react-hook-form';
import ReCAPTCHA from "react-google-recaptcha";


export default function Home() {
  const {register, handleSubmit, errors} =  useForm();

  // const onSubmit =  (data) => {
    
  //   console.log(data);
   
  // }
  
      const recaptchaRef = React.useRef();
      const onSubmitWithReCAPTCHA = async (data) => {
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();
      console.log(data, token, 'token');
      // apply to form data
    
  }
  
  
  
  return (
    <>
      <Head>
        <title>Fimhar travels- explore the world!</title>
        <link rel="icon" href="icon.svg"/>
        
      </Head>
      <h1>Contact Us</h1>
      <p className="sub-title">Get in touch with us to get the best deals!</p>
    
      <div id= "main-container">
        <div className= "contact-info"> 
         
            <h4>Contact Information</h4>
            <p>Fill up the form and we will get back to you within 24 hours.</p>
             <div className="icon-container">
                <i class="fa fa-phone" aria-hidden="true"></i>
                  <span>976-687-1234</span>
              </div>
              <div className="icon-container">
                <i class="fa fa-envelope" aria-hidden="true"></i>
                  <span>fimtravels@gmail.com</span>
              </div>
              <div className="icon-container">  
                <i class="fa fa-location-arrow" aria-hidden="true"></i>
                 <span>9607 15th Street, Plano, TX 75025</span>
              </div> 
            <div className="social-media-icons">
                <a href="#"className="icon-area">
                <i class="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a href="#"className="icon-area">
                <i class="fa fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="#"className="icon-area">
                <i class="fa fa-instagram" aria-hidden="true"></i>
                </a>
            </div>

        </div>
        <form onSubmit={handleSubmit(onSubmitWithReCAPTCHA)} className="form">
          <div className="col">
            <div className="col-grp">
              <label>First Name</label>
              <input type="text" name= "firstname"  ref={register({required: "required"})} ></input>
              {errors.firstname ? <div className="error-message">{errors.firstname.message}</div> : null }
            </div>
            <div className="col-grp">
              <label>Last Name</label>
              <input type="text" name= "lastname"  ref={register({required: "required"})}></input>
              {errors.lastname ? <div className="error-message">{errors.lastname.message}</div> : null }
            </div>
          </div>
          <div className="col">
            <div className="col-grp">
              <label>Email</label>
              <input type="email" name= "email"  ref={register({required: "required"})} ></input>
              {errors.email ? <div className="error-message">{errors.email.message}</div> : null }
            </div>
            <div className="col-grp">
              <label>Phone</label>
              <input type="tel" name= "phone#"  ref={register} ></input>
            </div>
        
          </div>
          <div className="col">
            <div className="col-grp">
              <label>Message</label>
              <textarea rows="4" name= "message" ref={register({required: "required"})}></textarea>
              {errors.message ? <div className="error-message">{errors.message.message}</div> : null }
            </div>

          </div>
          <div className="button">
          <button type="submit" 
               >Submit</button>  
          </div>
          <ReCAPTCHA
          sitekey="6LeOXYgaAAAAAFloH0VlA3dQPEM4bU7OuG5blzwY" 
          size= "invisible"
          ref={recaptchaRef}
          />
        </form>

      </div>
      
      
    </>
  )
}
