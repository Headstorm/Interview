import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
const SITE_KEY = "6Lcq-FwaAAAAAL1RlPuPDjUUbUCY9dIwpti9Egyf";
const ContactForm = () => {
  const { register, errors, handleSubmit, reset } = useForm();
  const [disabled, setDisabled] = useState(false);
//   useEffect(() => {
//     const loadScriptByURL = (id, url, callback) => {
//       const isScriptExist = document.getElementById(id);

//       if (!isScriptExist) {
//         var script = document.createElement("script");
//         script.type = "text/javascript";
//         script.src = url;
//         script.id = id;
//         script.onload = function () {
//           if (callback) callback();
//         };
//         document.body.appendChild(script);
//       }

//       if (isScriptExist && callback) callback();
//     }

//     // load the script by passing the URL
//     loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`, function () {
//       console.log("Script loaded!");
//     });
//   }, []);
//   const handleOnClick = e => {
//     e.preventDefault();
//     setLoading(true);
//     window.grecaptcha.ready(() => {
//       window.grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(token => {
//         submitData(token);
//       });
//     });
//   }
  const toastifySuccess = () => {
    toast('Form sent!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success',
      toastId: 'notifyToast'
    });
  };

  const onSubmit = async (data) => {
    // Send form email
    console.log('Name: ', data.name);
    console.log('Email: ', data.email);
    console.log('Subject: ', data.subject);
    console.log('Message: ', data.message);
    try {
      setDisabled(true);
      const templateParams = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message
      };
      console.log('clicked');

      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_USER_ID
      );

      reset();
      toastifySuccess();
      setDisabled(false);
    } catch (e) {
      console.log(e);
    }
  };
//   const submitData = token => {
//     // call a backend API to verify reCAPTCHA response
//     fetch('http://localhost:4000/verify', {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         "name": name,
//         "email": email,
//         "g-recaptcha-response": token
//       })
//     }).then(res => res.json()).then(res => {
//       setLoading(false);
//       setResponse(res);
//     });
//   }
  return (
    <div className='ContactForm'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 text-center'>
            <div className='contactForm'>
              <form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Row 1 of form */}
                <div className='row formRow'>
                  <div className='col-6'>
                    <input
                      type='text'
                      name='name'
                      ref={register({
                        required: { value: true, message: 'Please enter your name' },
                        maxLength: {
                          value: 30,
                          message: 'Please use 30 characters or less'
                        }
                      })}
                      className='form-control formInput'
                      placeholder='Name'
                    ></input>
                    {errors.name && <span className='errorMessage'>{errors.name.message}</span>}
                  </div>
                  <div className='col-6'>
                    <input
                      type='email'
                      name='email'
                      ref={register({
                        required: true,
                        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                      })}
                      className='form-control formInput'
                      placeholder='Email address'
                    ></input>
                    {errors.email && (
                      <span className='errorMessage'>Please enter a valid email address</span>
                    )}
                  </div>
                </div>
                {/* Row 2 of form */}
                <div className='row formRow'>
                  <div className='col'>
                    <input
                      type='text'
                      name='subject'
                      ref={register({
                        required: { value: true, message: 'Please enter a subject' },
                        maxLength: {
                          value: 75,
                          message: 'Subject cannot exceed 75 characters'
                        }
                      })}
                      className='form-control formInput'
                      placeholder='Subject'
                    ></input>
                    {errors.subject && (
                      <span className='errorMessage'>{errors.subject.message}</span>
                    )}
                  </div>
                </div>
                {/* Row 3 of form */}
                <div className='row formRow'>
                  <div className='col'>
                    <textarea
                      rows={3}
                      name='message'
                      ref={register({
                        required: true
                      })}
                      className='form-control formInput'
                      placeholder='Message'
                    ></textarea>
                    {errors.message && <span className='errorMessage'>Please enter a message</span>}
                  </div>
                </div>

                <button className='submit-btn' disabled={disabled} type='submit' onClick = {handleOnClick}>
                  Submit
                </button>
              </form>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;