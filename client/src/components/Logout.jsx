//import './LoginForm.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Message, Divider } from 'semantic-ui-react'

class Logout extends Component {
  constructor(props)  {
    super(props);

    this.state = {
      loggedOn: true
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout () {
    console.log('Logout: handleLogout')
    this.props.onLogout();
    this.setState({
      loggedOn: false
    });
    this.props.history.push("/login");
  }

  render (){
    console.log('Logout - render - this.state ', this.state);
    console.log('Logout - render - this.props', this.props);

    if (this.state.loggedOn) {

      console.log('Logout - about to fire the onLogout handler.');
      this.handleLogout();
    }

    const display = (

      <h1>THANK YOU FOR VISITING!</h1>

    )

    return (

      <div>
        { display }
      </div>

    )
  }
}

export default Logout;
