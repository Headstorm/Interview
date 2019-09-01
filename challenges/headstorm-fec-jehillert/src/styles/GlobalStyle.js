import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    /*different background colors are mostly for debugging css*/
    background-color: black;
    color: white;
    position: fixed;
    overflow: hidden;

    /*create react app stuff*/
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button:hover {
    outline:none;
  }

  button:focus {
    outline:none;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-size: 16px;
  }

  #primary-container {
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-column-gap: 0;

    @media ${props => props.theme.device.phone} {
      grid-template-areas: "mainBody";
      grid-template-columns: auto;
      grid-template-rows: auto;
    }

    @media ${props => props.theme.device.tabletSM} {
      grid-template-areas:
        "left mainHead right"
        "left mainBody right"
        "left mainFoot right";
      grid-template-columns: 1fr auto 1fr;
      grid-template-rows: 5vh auto 1fr;
    }
  }
`;


export default GlobalStyle;
