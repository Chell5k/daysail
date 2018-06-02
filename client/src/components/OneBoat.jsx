import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading'

class OneBoat extends Component {
  constructor(props) {
    super(props);
    console.log('OneBoat - props: ', props);
    console.log('OneBoat - boat index', props.index);
    this.boat = props.boats[props.index];
    console.log('OneBoat - Current Boat: ', this.boat);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    let fname = 'OneBoat - handleDelete';
    console.log(`${fname}`);
    this.props.onDelete();
    this.props.history.push('/boats');
  }

  render () {
    let response;
    let ok_to_update = true;
    let username = !!this.props.currentUser ? this.props.currentUser.username : 'not_present';
    console.log('OneBoat - username: ', username)

    if (!this.boat ) {
      response = (
        <Loading />
      )
    }

    else {

      //Getting ready to display our boat...decide if it is ok to update

        ok_to_update = this.boat.creator_id === username ? true : false;
        console.log('OneBoat - we have decided that ok_to_update is: ', ok_to_update);

        if (ok_to_update) {
          //Create the ok to update response
          console.log('OneBoat: ok_to_update: ', ok_to_update)
        response = (

          <div>


            <Link to={`/boats/edit/${this.boat.boat_id}`}>Edit</Link>
            <button onClick={this.handleDelete}>Delete</button>


            <h1>{this.boat.description}</h1>
            <h3>skipper: {this.boat.creator_id}</h3>
            <img src={this.boat.photo} alt='' />
            <p>Boat id: {this.boat.boat_id}</p>
            <p>Location: {this.boat.location}</p>

          </div>

        )
      }
      else {
        //create the not-ok-to-update response
        console.log('OneBoat: ok_to_update: ', ok_to_update)
        response = (
          <div>

            <h1>{this.boat.description}</h1>
            <h3>skipper: {this.boat.creator_id}</h3>
            <img src={this.boat.photo} alt='' />
            <p>Boat id: {this.boat.boat_id}</p>
            <p>Location: {this.boat.location}</p>

          </div>
        )

      }

  }
    return(
      <div>
        {response}
      </div>
    )
  }
}
export default OneBoat;





