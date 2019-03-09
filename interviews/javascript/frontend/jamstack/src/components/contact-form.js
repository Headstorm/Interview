import React, { useState } from "react"
import Helmet from "react-helmet"
import { ReCaptcha } from "recaptcha-v3-react"
import './contact-form.css'

const ContactForm = () => {
  const [captchaToken, setCaptchaToken] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()

    let result = await verifyCaptcha(captchaToken)

    if(result.score > 0.5) {
      const form = { firstName, lastName, email, message }
      
      console.log(form)
      
    } else {
      alert("Sorry, no bots allowed")
    }
  }

  const verifyCaptcha = async (token) => {
   let req = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}`
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
              placeholder="John"
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
              placeholder="Doe"
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
            placeholder="johnnyappleseed@gmail.com"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            className="u-full-width"
            style={{resize: "vertical"}}
            onChange={e => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send email</button>
      </form>
    </>
  )
}

export default ContactForm
