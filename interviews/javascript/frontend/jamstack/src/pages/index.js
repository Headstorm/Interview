import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ContactForm from "../components/contact-form"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Jamstack</h1>
      <h4>Democratize the aux</h4>
      <h2>A new way to listen to music</h2>
      <p>
        Listening to music is a social experience, so why not make it more
        collaborative? JamStack allows you to create collaborative queues with
        Spotify
      </p>
      <ContactForm />
    </Layout>
  )
}

export default IndexPage
