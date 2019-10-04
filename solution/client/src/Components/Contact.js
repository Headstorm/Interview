import React from "react"


const Contact = ({name1, name1Onchange, email, emailOnchange, company, companyOnchange}) => (
    <div>

        <h3>Contact Us</h3>
        <p>Name:</p>
        <input type="text" name="firstname" value={name1} onChange={name1Onchange} placeholder="Your name.."/>
        <p>Email:</p>
        <input type="text" name="email" value={email} onChange={emailOnchange} placeholder="Your email.."/>
        <p>Company</p>
        <input type="text" name="company" value={company} onChange={companyOnchange} placeholder="Your company.."/>
    </div>
)
export default Contact