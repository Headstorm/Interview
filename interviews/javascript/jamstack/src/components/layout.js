import React from "react"
import PropTypes from "prop-types"
import "./normalize.css"
import "./skeleton.css"
import "./layout.css"

const Layout = ({ children }) => (
  <div className="content">
    <main>{children}</main>
    <footer>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>,
      engineered by Zach Banducci
    </footer>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
