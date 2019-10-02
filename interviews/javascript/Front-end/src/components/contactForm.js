import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import ReCAPTCHA from 'react-google-recaptcha'
import { SITE_KEY } from '../config'
const { TextArea } = Input

class ContactForm extends React.Component {

    state = {
        captchaValid: false
    }

    handleSubmit = e => {
        e.preventDefault();
        // checks for errors in the input
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // if there are none, sends props to App.js to print the input
                this.props.onSubmit(e)
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            // form to handle the user input 
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        }, {
                            required: true,
                            message: 'Please input your email addres!'
                        }],
                    })(
                        <Input
                            prefix={<Icon type="mail" />}
                            placeholder="Email Address"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('description', {
                        rules: [{ required: true, message: 'Please input the body of the email!' }],
                    })(
                        <TextArea
                            autosize={{ minRows: 5, maxRows: 10 }}
                            placeholder="Message"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <ReCAPTCHA
                        sitekey={SITE_KEY}
                        onChange={this.handleSubmit}
                        className='form-button'
                    />
                </Form.Item>
            </Form>
        );
    }
}
const WrappedContactForm = Form.create({ name: 'contact_form' })(ContactForm)
export default WrappedContactForm