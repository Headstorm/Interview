import React, { useState } from 'react'

const ContactForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(firstName, lastName, email, additionalInfo)
  }

  return(
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" onChange={e => setFirstName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" onChange={e => setLastName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="addtionalInfo">Additional Info</label>
        <input type="text" id="addtionalInfo" onChange={e => setAdditionalInfo(e.target.value)} />
      </div>
      <button type="submit">Contact JamStack</button>
    </form>
  )
}

export default ContactForm