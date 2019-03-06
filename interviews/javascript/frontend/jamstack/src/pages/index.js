import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ContactForm from "../components/contact-form"
import "./index.css"
import Logo from "../components/logo"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div style={{ width: "400px" }}>
          <Logo />
        </div>
        <div className="banner">
            <h1>Jamstack</h1>
            <h4>Democratize the aux</h4>
        </div>
      </div>
      <div>
        <h2>A new way to listen to music</h2>
        <p>
          Listening to music is a social experience, so why not make it more
          collaborative? JamStack allows you to create collaborative queues with
          Spotify
        </p>
        <h3>Contact the JamStack Crew</h3>
        <ContactForm />
      </div>
    </Layout>
  )
}

export default IndexPage
