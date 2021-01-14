import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';
import React from 'react';

// on component load, saves the token from Google into local storage
const CaptchaProvider = () => {
    const handleVerify = (e) => {
        localStorage.setItem('token', e);
    }

    // loading the Captcha
    return (<>
        <GoogleReCaptchaProvider
            useRecaptchaNet="true"
            reCaptchaKey="6Le-8icaAAAAAJGMYqtwWyK6fyoIB-2-QQFfZc9O"
            scriptProps={{ async: true, defer: true, appendTo: 'body' }}
        >
            <GoogleReCaptcha onVerify={handleVerify} />
        </GoogleReCaptchaProvider>
    </>
    );
}

export default CaptchaProvider;
