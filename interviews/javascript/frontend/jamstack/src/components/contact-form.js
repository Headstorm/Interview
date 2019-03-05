import React, { useState } from "react"
import Helmet from "react-helmet"
import { ReCaptcha } from "recaptcha-v3-react"

const ContactForm = () => {
  const [captchaToken, setCaptchaToken] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()

    let result = await verifyCaptcha(captchaToken)

    if(result.score > 0.5) {
      const form = { firstName, lastName, email, additionalInfo }
      console.log(form)
      
    } else {
      alert("Sorry, no bots allowed")
    }
  }

  const verifyCaptcha = async (token) => {
   let req = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=6Lf7tJUUAAAAAA97fQZMreHBIQR7TvwV-4b70uQv&response=${token}`
    })

    let resp = await req.json()
    return resp
  }

  return (
    <>
      <Helmet>
        <script src="https://www.google.com/recaptcha/api.js?render=6Lf7tJUUAAAAAKuWyhYqnMAVLgoj0yS2UEcv0MDq"></script>
      </Helmet>
      <ReCaptcha
        sitekey='6Lf7tJUUAAAAAKuWyhYqnMAVLgoj0yS2UEcv0MDq'
        action='formSubmission'
        verifyCallback={(token) => setCaptchaToken(token)}
      />
      <form onSubmit={e => handleSubmit(e)}>
        <div className="row">
          <div className="six columns">
            <label htmlFor="firstName">First Name</label>
            <input
              className="u-full-width"
              type="text"
              id="firstName"
              onChange={e => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="six columns">
            <label htmlFor="lastName">Last Name</label>
            <input
              className="u-full-width"
              type="text"
              id="lastName"
              onChange={e => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="u-full-width"
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="addtionalInfo">Additional Info</label>
          <input
            type="text"
            id="addtionalInfo"
            onChange={e => setAdditionalInfo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Contact JamStack</button>
      </form>
    </>
  )
}

export default ContactForm
