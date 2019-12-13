import React from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

function App() {
  return (
      <Container>
        <Image src="logo.png" fluid></Image>
        <h3 className="brief">
          At Custom Curriculum, we design curriculum for your school based on
          your specific needs.
        </h3>
      </Container>
  );
}

export default App;
