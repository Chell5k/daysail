import './LoginForm.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Message, Divider } from 'semantic-ui-react'

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('RegisterForm - handleSubmit - this.state',this.state)
    this.props.onLogin(this.state);
    this.setState({
      username: '',
      email: '',
      password: '',
      isUserRegistered: true
    });
  }

  render() {
    return (
      <div className='create-box'>
      <Form success className='form'>
        {this.state.isUserRegistered && <Redirect to ='/login'/>}
        <form onSubmit={this.handleSubmit}>

        <Message
          attached
          content='Please enter your registration details below:'
        />
        <Divider hidden/>

          <label>
            User Name:
            <input
              type='text'
              onChange={this.handleInputChange}
              value={this.state.username}
              name='username'
            />
          </label>

          <label>
            Email:
            <input
              type='email'
              onChange={this.handleInputChange}
              value={this.state.email}
              name='email'
            />
          </label>

          <label>
            Password:
            <input
              type='password'
              onChange={this.handleInputChange}
              value={this.state.password}
              name='password'
            />
          </label>

          <Divider hidden />

          <Button
            type='submit'
            className='register-button'>
            Register
          </Button>

        </form>
      </Form>
    </div>
    )
  }
}

export default RegisterForm;
