import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ReCaptcha } from 'react-recaptcha-v3'

const FormDiv = styled.form`
    margin: 10% 20%;
    width: 60%;
    display: inline-block;
    text-align: center;
    margin-bottom: 40vh;
`;


const SubmitButton = styled.div`
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    border: 1px solid rgb(216, 216, 216);
    border-radius: 0.5em;
    font-size: 120%;
    width: 10%;
    padding: 1%;
    min-width: 110px;
    min-height: 50px;
    padding-top: 20%;

    transition: transform 750ms;

    &:hover {
    transform: scale(1.25);
    }
`;

const MessageResponse = styled.div`
    text-align: center;
    margin-top: 1%;
`;


export default function Form() {
    const siteKey = '6Le3WMAUAAAAAOCR9AMk7lEj-N8S_bo-nLfRKOXW';
    const secretKey = '6Le3WMAUAAAAABGIP81B-wOoxHU3iUTTshD7Zlw8';
    const proxy = 'https://cors-anywhere.herokuapp.com/';

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [statusMessage, setStatusMessage] = useState('Awaiting Message');


    function clearStates() {
        setName("");
        setSubject("");
        setMessage("");
    }

    function verifyCallback(recaptchaToken){
        setRecaptchaToken(recaptchaToken);
    }

    function checkIdentity(){
        axios.post(`${proxy}https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`)
        .then((res) => {
            console.log(res.data);
            if (res.data.success) {
                setStatusMessage('Message Sent!');
            } else {
                setStatusMessage('Message Denied!');
            }
        })
        .catch((e) => {console.log(e)});
    }
    

    return (
        <FormDiv>
            <MessageResponse>{statusMessage}</MessageResponse>

            <input value={name} type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)}></input>
            <input value={subject} type="text" placeholder="Subject Line" onChange={(e) => setSubject(e.target.value)}></input>
            <textarea value={message} placeholder="Message" onChange={(e) => setMessage(e.target.value)}></textarea>

            <div style={{display: 'inline-block', textAlign: 'right'}}>
                <SubmitButton onClick={(e) => {
                    console.log({name, subject, message}); 
                    clearStates();
                    checkIdentity();
                    setStatusMessage('');   
                }}><p>Send</p></SubmitButton>
            </div>

            <ReCaptcha sitekey={siteKey} verifyCallback={verifyCallback}></ReCaptcha>
        </FormDiv>
    );
}