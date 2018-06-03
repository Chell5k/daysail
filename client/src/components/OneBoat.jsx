import React, { Component } from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Loading from './Loading';


class OneBoat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle_Like: true
    };

    console.log('OneBoat - props: ', props);
    console.log('OneBoat - boat index', props.index);
    this.boat = props.boats[props.index];
    console.log('OneBoat - Current Boat: ', this.boat);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleUnlike = this.handleUnlike.bind(this);
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

// update state to reflect the click....
  handleLike(e) {
    e.preventDefault();
    let fname = 'OneBoat - handleLike';
    console.log(`${fname}`);
    this.setState(prevState => ({
      toggle_like: !prevState.toggle_like
    }));
  console.log('OneBoat - handleLike - this.state.toggle_like', this.state.toggle_like);
//    this.props.onLike();
  }

    handleUnlike(e) {
    let fname = 'OneBoat - handleUnlike';
    console.log(`${fname}`);
//    this.props.onUnlike();

  }


  handleDelete(e) {
    let fname = 'OneBoat - handleDelete';
    console.log(`${fname}`);
    this.props.onDelete();
    this.props.history.push('/boats');
  }
  render () {
    console.log('OneBoat - render: this.state', this.props);
    console.log('OneBoat - render: this.state', this.state);

    // let loggedOn = !!this.props.currentUser;
    // let username = !!this.props.currentUser ? this.props.currentUser.username : null;
    // let owner    = !!this.props.currentUser ? username === this.boat.creator_id : null;

    let boat_ready = !!this.boat ? true : false;
    let display;

    if  ( boat_ready )  {
      let faves = this.props.faves;
      let loggedOn = !!this.props.currentUser; //logged on status
      let username = loggedOn ? this.props.currentUser.username : null;  //name of current user
      let owner    = loggedOn ? username === this.boat.creator_id : false;  //boolean
      let ok_to_modify = (loggedOn && owner ); //only logged on boaters get the update/edit
      let ok_to_toggle_like = (loggedOn == true);
      let there_are_faves = !!faves ? true : false;
      let this_boat_is_a_fave = there_are_faves && (faves.findIndex(fave => fave.boat_id === this.boat.boat_id) != -1)

      console.log('OneBoat: loggedOn', loggedOn);
      console.log('OneBoat: username', username);
      console.log('OneBoat: owner', owner);
      console.log('OneBoat: ok_to_modify', ok_to_modify)
      console.log('OneBoat: ok_to_toggle_like', ok_to_toggle_like);
      console.log('OneBoat: there_are_faves', there_are_faves);
      console.log('OneBoat: this_boat_is_a_fave', this_boat_is_a_fave);


      //figure out if this boat has been liked by this user.


      if (ok_to_modify) {
        //Create the ok to modify response
        console.log('OneBoat: ok_to_modify: ', ok_to_modify)
        display = (

          <div>


            <Link to={`/boats/edit/${this.boat.boat_id}`}>Edit</Link>
            <button onClick={this.handleDelete}>Delete</button>

            <Button
              content={this_boat_is_a_fave ? 'In your faves' : 'Add to faves'}
              onClick={this.handleLike}
            />

            <h1>{this.boat.description}</h1>
            <h3>skipper: {this.boat.creator_id}</h3>
            <img src={this.boat.photo} alt='' />
            <p>Boat id: {this.boat.boat_id}</p>
            <p>Location: {this.boat.location}</p>

            </div>

        )
        }
        else if (ok_to_toggle_like) {
        display = (

          <div>

            <Button
              content={this_boat_is_a_fave ? 'In your faves' : 'Add to faves'}
              onClick={this.handleLike}
            />

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





