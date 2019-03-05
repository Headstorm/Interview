import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />


      <h1>Jamstack</h1>
      <caption>Democratize the aux</caption>
      <h2>A new way to listen to music</h2>
      <p>Listening to music is a social experience, so why not make it more collaborative? JamStack allows you to create collaborative queues with Spotify</p>
  </Layout>
)

export default IndexPage
