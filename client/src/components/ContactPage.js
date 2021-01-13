import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import CaptchaProvider from './CaptchaProvider';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBInput } from "mdbreact";



const ContactPage = () => {

    // pulling the token from local storage and sending the token to the NodeJS backend
    const submitCaptcha = () => {
        const token = localStorage.getItem('token')
        // console.log("submit data token: " + token)
        // call a backend API to verify reCAPTCHA response
        fetch('http://localhost:8000/verify', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "g-recaptcha-response": token
            })
        }).then(res => res.json()).then(res => {
            if (res.success == true) {
                submit();
            }
            else {
                alert("ReCaptcha Verification Failed");
            }
        });
    }

    // declare hooks
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subj, setSubj] = useState("");
    const [msg, setMsg] = useState("");

    // if the reCaptcha is verified, print the info from the form into the console
    const submit = () => {
        console.log("Name: " + name);
        console.log("Email: " + email);
        console.log("Subj: " + subj);
        console.log("Msg: " + msg);
    }

    // change hook values
    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleSubj = (e) => {
        setSubj(e.target.value);
    }

    const handleMsg = (e) => {
        setMsg(e.target.value);
    }

    // displays form on the page
    // an alert will display if the reCaptcha is not valid -- you will need to refresh the page to recieve a new token
    return (
        <MDBContainer>

            <h2 className="h1-responsive font-weight-bold text-center my-5">
                Contact us
      </h2>
            <p className="text-center w-responsive mx-auto pb-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
                error amet numquam iure provident voluptate esse quasi, veritatis
                totam voluptas nostrum quisquam eum porro a pariatur veniam.
      </p>
            <MDBRow>
                <MDBCol md="9" className="md-0 mb-5">
                    <form>
                        <MDBRow>
                            <MDBCol md="6">
                                <div className="md-form mb-0">
                                    <MDBInput
                                        type="text" id="contact-name" label="Your name"
                                        onChange={(e) => handleName(e)}
                                    />
                                </div>
                            </MDBCol>
                            <MDBCol md="6">
                                <div className="md-form mb-0">
                                    <MDBInput
                                        type="text"
                                        id="contact-email"
                                        label="Your email"
                                        onChange={(e) => handleEmail(e)}
                                    />
                                </div>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="12">
                                <div className="md-form mb-0">
                                    <MDBInput
                                        type="text" id="contact-subject" label="Subject"
                                        onChange={(e) => handleSubj(e)}
                                    />
                                </div>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="12">
                                <div className="md-form mb-0">
                                    <MDBInput
                                        type="textarea"
                                        id="contact-message"
                                        label="Your message"
                                        onChange={(e) => handleMsg(e)}

                                    />
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </form>
                    <div className="text-center text-md-left">
                        <CaptchaProvider />
                        <Button
                            color="primary"
                            size="md"
                            onClick={submitCaptcha}>
                            Send
            </Button>
                    </div>
                </MDBCol>
                <MDBCol md="3" className="text-center">
                    <ul className="list-unstyled mb-0">
                        <li>
                            <MDBIcon icon="map-marker-alt" size="2x" className="blue-text" />
                            <div>Dallas, TX USA</div>
                        </li>
                        <li>
                            <MDBIcon icon="phone" size="2x" className="blue-text mt-4" />
                            <div>(469) 555 - 1234 </div>
                        </li>
                        <li>
                            <MDBIcon icon="envelope" size="2x" className="blue-text mt-4" />
                            <div>contact@company.com</div>
                        </li>
                    </ul>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default ContactPage;