import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';


class OneBoat extends Component {
  constructor(props) {
    super(props);
    console.log('OneBoat - props: ', props);
    console.log('OneBoat - boat index', props.index);
    this.boat = props.boats[props.index];
    console.log('OneBoat - Current Boat: ', this.boat);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      boat : props.boats[props.index]
    }
  }

  handleDelete(e) {
    let fname = 'OneBoat - handleDelete';
    console.log(`${fname}`);
    this.props.onDelete();
    this.props.history.push('/boats');
  }

  render () {

    // let loggedOn = !!this.props.currentUser;
    // let username = !!this.props.currentUser ? this.props.currentUser.username : null;
    // let owner    = !!this.props.currentUser ? username === this.boat.creator_id : null;

    let boat_ready = !!this.boat ? true : false;
    let display;

    if  ( boat_ready )  {
      let loggedOn = !!this.props.currentUser; //logged on status
      let username = loggedOn ? this.props.currentUser.username : null;  //name of current user
      let owner    = loggedOn ? username === this.boat.creator_id : false;  //boolean
      let ok_to_modify = (loggedOn && owner );

      console.log('OneBoat: loggedOn', loggedOn);
      console.log('OneBoat: username', username);
      console.log('OneBoat: owner', owner);
      console.log('OneBoat: ok_to_modify', ok_to_modify)

      if (ok_to_modify) {
        //Create the ok to modify response
        console.log('OneBoat: ok_to_modify: ', ok_to_modify)
        display = (

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
          console.log('OneBoat: ok_to_modify: ', ok_to_modify)
          display = (
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

    else  {  //boat is not ready
      display =  (
       <Loading />
      )
    }

    return (
      <div>
        { display }
      </div>
    )
  }
}
export default OneBoat;





