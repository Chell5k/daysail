import './LoginForm.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Message, Divider } from 'semantic-ui-react'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: ''
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
    console.log('handling submit')
    e.preventDefault();
    console.log(this.state)
    // this.props.onLogin(this.state);
    this.setState({
      username: '',
      email: '',
      isUserLoggedIn: true
    });
  }

 // goToBoats ()  {
 // {this.props.history.push('/boats')}
 // }


  render() {
    return (
  <div className='create-box'>
    <Form success className='form'>
      {this.state.isUserLoggedIn && <Redirect to ='/boats' />}
      <form onSubmit={this.handleSubmit}>

      <Message
        attached
        content='Please enter your login details below:'
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

          <Divider hidden />
        <Button
          type='submit'
          className='login-button'>
          Login
        </Button>

      </form>
    </Form>
  </div>
    )
  }
}
//        <Message
//            success
//            header='Form Completed'
//            content="You're all signed up for DaySail"
//          />



export default LoginForm;
