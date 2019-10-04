import React from "react"
import {Component} from "react"
import './App.css';
import Header from "./Components/Header.js"
import Contact from "./Components/Contact.js"
import { loadReCaptcha } from 'react-recaptcha-v3'

class App extends Component {
  //here is the constructor
  constructor(props){
    super(props)
    //binding the appropriate elements
    this.handleSubmit = this.handleSubmit.bind(this);
    this.recapchaLoaded = this.recapchaLoaded.bind(this);
    //state information
    this.state = {
      name1: '',
      email: '',
      company: '',
      response: '',
      responseToPost: '',
      info:[]
    };
    

  }
  
  //content for the recaptcha
  verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!  
    console.log(recaptchaToken, "<= your recaptcha token")
  }
  //this handle the changes of states
  handleChange = event => this.setState({name1: event.target.value})
  handleChange1 = event => this.setState({email: event.target.value})
  handleChange2 = event => this.setState({company: event.target.value})
  
  recapchaLoaded() {
    console.log('captcha successfully loaded');
  }

  componentDidMount() {
    //call our fetch function below once the component mounts
    loadReCaptcha('6LeacrsUAAAAANxWwyss8BQzOFYkHBHFib-YAx7b');
    this.callAPI()
      .then(res => this.setState({data: res.express}))
      .catch(err => console.log(err));

  }

  //fethc our GET route from the Express server. note the path we are
  //fetching matches the express server.js
  callAPI = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if(response.status !== 200) {
      throw Error(body.message)

    }
    return body;
  }
  //when we submit this occurs handles
  handleSubmit = async event => {
    event.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      info: [this.state.name1, this.state.email, this.state.company],
      body: JSON.stringify({ info: this.state.info })
     
    });
    
    const body = await response.text();
    

      console.log("name ", this.state.name1);
      console.log("email " ,this.state.email)
      console.log("company ",this.state.company)

    
   
  };
  

  render(){
    
    return (
      
      
      <div>
        <Header/>
        
        <Contact name1={this.state.name1} name1Onchange={this.handleChange} 
        email={this.state.email} emailOnchange={this.handleChange1} 
        company={this.state.company} companyOnchange={this.handleChange2}/>  
             
          <form onSubmit={this.handleSubmit}>
          <button type="submit">Submit</button>            
          </form>
          
      </div>

    )
  }
}

export default App;