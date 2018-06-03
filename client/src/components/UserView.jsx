import React, { Component } from 'react';
import BoatFaves from './BoatFaves';
import OwnerBoats from './OwnerBoats';

class UserView extends Component {
  render() {
    return (
      <div>
        <BoatFaves />
        <OwnerBoats />
      </div>
    );
  };
}

export default UserView;
