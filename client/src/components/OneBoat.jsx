import React, { Component } from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Loading from './Loading';


class OneBoat extends Component {
  constructor(props) {
    super(props);


    console.log('OneBoat - constructor - props: ', props);
    console.log('OneBoat - constructor - boat index', props.index);
    this.boat = props.boats[props.index];
    console.log('OneBoat - constructor - Current Boat: ', this.boat);

    let init_faves = this.props.faves;
    let init_there_are_faves = !! init_faves ? true : false;
    let init_this_boat_is_a_fave = init_there_are_faves && (init_faves.findIndex(fave => fave.boat_id === this.boat.boat_id) != -1)

    console.log('OneBoat - constructor - init_faves', init_faves);
    console.log('OneBoat - init_there_are_faves', init_there_are_faves);
    console.log('OneBoat - init_this_boat_is_a_fave', init_this_boat_is_a_fave);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleFave = this.handleFave.bind(this);
    // this.handleUnlike = this.handleUnlike.bind(this);

    this.state = {
      boat : props.boats[props.index],
      is_fave: init_this_boat_is_a_fave
    }

    console.log('OneBoat - constructor - (end) this.state', this.state);
  }

  componentDidUpdate() {
    console.log('OneBoat -componentDidUpdate - this.state', this.state);
  }

  handleDelete(e) {
    let fname = 'OneBoat - handleDelete';
    console.log(`${fname}`);
    this.props.onDelete();
    this.props.history.push('/boats');
  }

// update state to reflect the click....
  handleFave(e) {
    e.preventDefault();
    let fname = 'OneBoat - handleLike';
    console.log(`${fname}`);
    this.setState(prevState => ({
      is_fave: !prevState.is_fave
    }));
    console.log('OneBoat - handleFave - this.state.is_fave', this.state.is_fave);
    this.props.onToggleFave();
  }

//     handleUnlike(e) {
//     let fname = 'OneBoat - handleUnlike';
//     console.log(`${fname}`);
// //    this.props.onUnlike();

//   }


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
      let ok_to_fave = (loggedOn == true);
      let there_are_faves = !!faves ? true : false;
      let this_boat_is_a_fave = there_are_faves && (faves.findIndex(fave => fave.boat_id === this.boat.boat_id) != -1)

      console.log('OneBoat: loggedOn', loggedOn);
      console.log('OneBoat: username', username);
      console.log('OneBoat: owner', owner);
      console.log('OneBoat: ok_to_modify', ok_to_modify)
      console.log('OneBoat: ok_to_fave', ok_to_fave);
      console.log('OneBoat: there_are_faves', there_are_faves);

      //this variable is only accurate if state is lifted via a clickhandler and updated in App's state, and flows
      //down in a revised  faves array. This is because at the moment, it is referencing the faves array
      //prop which is only updated in App.js. This variable should probably be read out of local state, which is accurate.
      //
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
              content={this.state.is_fave ? 'In your faves' : 'Add to faves'}
              onClick={this.handleFave}
            />

            <h1>{this.boat.description}</h1>
            <h3>skipper: {this.boat.creator_id}</h3>
            <img src={this.boat.photo} alt='' />
            <p>Boat id: {this.boat.boat_id}</p>
            <p>Location: {this.boat.location}</p>

            </div>

        )
        }
        else if (ok_to_fave) {
        display = (

          <div>

            <Button
              content={this.state.is_fave ? 'In your faves' : 'Add to faves'}
              onClick={this.handleFave}
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





