import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import './List.css';
import { Link } from 'react-router-dom';

class BoatFaves extends Component {
  render() {
    console.log(`BoatFaves - render - this.props`, this.props);

    let all_boats = this.props.all_boats;
    let faves = this.props.faves;
    let user_faves = [];

    console.log('BoatFaves - all_boats', all_boats);
    console.log('BoatFaves - faves', faves);

    let id, full_boat, display;

    faves.forEach (fave => {
      let id = fave.boat_id;
      let full_boat = all_boats.find(boat => boat.boat_id === id);
      user_faves.push(full_boat);
      console.log('boatFaves - foreach: id, full_boat', id, full_boat);
    });
    console.log('BoatFaves - user_faves:', user_faves);

  // display = (
  //   <div>FAVORITES LIST TBD...</div>
  //   );

    return (
      <div className="card-list">
        {user_faves.map(boat => (
          <Link to={'/boats/' + boat.boat_id}>
          <Card className="space-card" key={boat.boat_id}>
            <Image className="card-image" src={boat.photo}/>
            <Card.Content className="card-content">
              <Card.Header>
                {boat.description}
              </Card.Header>
              <Card.Meta>
                <span className='date'>
                  Skipper: {boat.creator_id}
                </span>
              </Card.Meta>
              <Card.Description>
               Address: {boat.location}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
            </Card.Content>
          </Card>
          </Link>
        ))}
      </div>
    );
  };
}

export default BoatFaves;
