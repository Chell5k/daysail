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

  }

  render (){

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
