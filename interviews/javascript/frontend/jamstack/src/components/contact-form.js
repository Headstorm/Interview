import React, { useState } from 'react'

const ContactForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    let form = {
      firstName, 
      lastName, 
      email, 
      additionalInfo
    }

    console.log(form)
  }

  return(
    <form onSubmit={(e) => handleSubmit(e)}>
      <div class="row">
        <div class="six columns">
          <label htmlFor="firstName">First Name</label>
          <input class="u-full-width" type="text" id="firstName" onChange={e => setFirstName(e.target.value)} required/>
        </div>
        <div class="six columns">
          <label htmlFor="lastName">Last Name</label>
          <input class="u-full-width" type="text" id="lastName" onChange={e => setLastName(e.target.value)} required/>
        </div>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input class="u-full-width" type="email" id="email" onChange={e => setEmail(e.target.value)} required/>
      </div>
      <div>
        <label htmlFor="addtionalInfo">Additional Info</label>
        <input type="text" id="addtionalInfo" onChange={e => setAdditionalInfo(e.target.value)} required/>
      </div>
      <button type="submit">Contact JamStack</button>
    </form>
  )
}

export default ContactForm