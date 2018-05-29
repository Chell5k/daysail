import React, { Component } from 'react';
import './NavBar.css';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  constructor(props)  {
    super(props);
  }

 render() {
    const display = (
      <Menu  color="grey" inverted stackable className='nav'>
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'>
          <Link to="/login">
            Login
          </Link>
        </Menu.Item>

        <Menu.Item
          name='register'>
          <Link to='/register'>
            Register
          </Link>
        </Menu.Item>

        <Menu.Item
          name='boats'>
          <Link to='/boats'>
            Sailboats
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