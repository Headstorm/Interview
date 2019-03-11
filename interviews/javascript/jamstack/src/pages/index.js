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
      <div className="landing">
        <div className="u-full-width" style={{ width: "400px" }}>
          <Logo />
        </div>
        <div className="banner">
          <h1>Jamstack</h1>
          <h4>Democratize the aux</h4>
        </div>
      </div>
      <div>
        <h2>A new way to listen to music <span role="img" aria-label="headphones">🎧</span></h2>
        <p>
          Listening to music is a social experience, so why not make it more
          collaborative? JamStack allows you to create collaborative queues using the power of Spotify. All you need is to download the application, give the room code to your friends, and let the party begin!
        </p>
        <h3>Contact the Jamstack Crew <span role="img" aria-label="mail">💌</span></h3>
        <ContactForm />
      </div>
    </Layout>
  )
}

export default IndexPage
