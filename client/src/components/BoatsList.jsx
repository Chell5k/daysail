import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
 import './List.css';
import { Link } from 'react-router-dom';

function BoatsList(props) {
  let fname='BoatsList';
  console.log(`${fname} - props`, props);
  return(
    <div className="card-list">
      {props.boats.map(boat => (
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
  )
}

export default BoatsList;
