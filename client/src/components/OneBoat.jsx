import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading'

function OneBoat(props) {

    console.log('OneBoat - props: ', props);
    console.log('OneBoat - boat index', props.index);
    const this_boat = props.boats[props.index];
    console.log('OneBoat - Current Boat: ',this_boat);
    let response;


    if (!this_boat) {
        response = (
            <Loading />
        )
    }
    else {
      response = (
        <div>
            <Link to={`/boats/edit/${this_boat.boat_id}`}>Edit</Link>
            <button onClick={props.onDelete}>Delete</button>
            <h1>{this_boat.description}</h1>
            <h3>skipper: {this_boat.creator_id}</h3>
            <img src={this_boat.photo} alt='' />
            <p>Boat id: {this_boat.boat_id}</p>
            <p>Location: {this_boat.location}</p>
        </div>
      )
    }
    return(
      <div>
        {response}
      </div>
    )

}
export default OneBoat;





