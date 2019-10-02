import React from 'react'
import { Typography } from 'antd'
import './App.css'
import ContactForm from './components/contactForm'
const { Title } = Typography;

class App extends React.Component {
  printInput = e => {
    console.log('user input is', e);
  }

  render() {
    return (
      <div className='container'>
        <Title>
          REPORTS
      </Title>
        <ContactForm onSubmit={this.printInput} />
      </div>
    );
  }
}

export default App;
