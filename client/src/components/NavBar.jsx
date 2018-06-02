import React, { Component } from 'react';
import './NavBar.css';
import { Menu, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  constructor(props)  {
    super(props);
  }

 render() {
    const isLoggedOn = !!this.props.currentUser;
    let username;
    let welcome;
    console.log('NavBar: isLoggedOn', isLoggedOn);
    if (isLoggedOn === true) {
      username = this.props.currentUser.username;
      welcome = 'Welcome, ' + username + '!';
      console.log('NavBar - render - username: ', username);
    }

    const display = isLoggedOn ?
      (
      <Menu color="grey" inverted stackable className='nav'>
        <Menu.Menu text position='right'>

          <Menu.Item header
            name='welcome-message'>
              { welcome }
          </Menu.Item>

          <Menu.Item
            name='boats'>
            <Link to='/boats'>
              Sailboats
            </Link>
          </Menu.Item>

          <Menu.Item
            name='add boat'>
            <Link to='/boats/new'>
              Add boat
            </Link>
          </Menu.Item>

          <Menu.Item
            name='home'>
            <Link to="/">
              Home
            </Link>
          </Menu.Item>

        <Menu.Item
          name='Logout'>
          <Link to='/logout'>

            <Button
            color='grey'
            >
              Logout
            </Button>

          </Link>
        </Menu.Item>
        </Menu.Menu>
      </Menu>
      )

      :

   (
    <Menu  color="grey" inverted stackable className='nav'>
      <Menu.Menu position='right'>

        <Menu.Item
          name='boats'>
          <Link to='/boats'>
            Sailboats
          </Link>
        </Menu.Item>

        <Menu.Item
          name='home'>
          <Link to="/">
            Home
          </Link>
        </Menu.Item>

        <Menu.Item
          name='login'>
          <Link to="/login">
            Login
          </Link>
        </Menu.Item>

        <Menu.Item
          name='register'>
          <Link to='/register'>
            <Button primary>Register</Button>
          </Link>
        </Menu.Item>

      </Menu.Menu>
    </Menu>
    )

    return (
      <div>
        { display }
      </div>
    )

  }

}
