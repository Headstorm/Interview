import React from 'react'
import loadReCaptcha from 'react-recaptcha-v3'
import ReCaptcha from 'react-recaptcha-v3'
import ContactInfo from '../models/contactInfo'

export class MainPage extends React.Component {
    state = {
        verified: false,
        firstName: "",
        lastName: "",
        email: "",
        infoList: []
    }

    // componentDidMount() {
    //     loadReCaptcha("6LfeYnYaAAAAABN3TVlw9TboosTP7WXDyFavJJ2x", this.recapLoaded);
    // }

    // recapLoaded = (recaptchaToken) => {
    //     console.log(recaptchaToken, '<= your recaptcha token')
    // }

    // updateToken = () => {
    //     this.recaptcha.execute();
    // }

    render() {
        return <>
            <div className="container">
                <h1 classsName="text-center">Big Red Tires Co.</h1>
            </div> 

            <div className="container">
                <h3><u>Contact Us</u></h3>
                <label htmlFor="firstName">First Name</label>
                <input name="firstName"
                    id="firstName"
                    className="form-control"
                    type="text"
                    value={this.state.firstName}
                    onChange={event => this.setState({firstName: event.target.value })} />
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName"
                    id="firstName"
                    className="form-control"
                    type="text"
                    value={this.state.lastName}
                    onChange={event => this.setState({lastName: event.target.value })} />
                <label htmlFor="email">Email</label>
                <input name="email"
                    id="email"
                    className="form-control"
                    type="text"
                    value={this.state.email}
                    onChange={event => this.setState({email: event.target.value })} />
                <button name="submit"
                    type="button"
                    className="btn btn-primary"
                    onClick={event => {
                        const list = this.state.infoList.concat(new ContactInfo(this.state.firstName,this.state.lastName,this.state.email))
                        console.log("Name: " + this.state.firstName + " " + this.state.lastName + " Email: " + this.state.email);
                        this.setState({
                            infoList: list
                        })
                    }}>Submit</button>

                {/* <ReCaptcha
                    ref={ref => this.recaptcha = ref}
                    sitekey="6LfeYnYaAAAAABN3TVlw9TboosTP7WXDyFavJJ2x"
                    action="action_name"
                    recapLoaded={this.recapLoaded}
                /> */}
            </div>
        </>
    }
}

export default MainPage;