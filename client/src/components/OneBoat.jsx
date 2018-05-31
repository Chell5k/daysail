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
  //  e.preventDefault();
    let fname = 'OneBoat - handleDelete';
    console.log(`${fname}`);
    this.props.onDelete();
    // this.setState({
    //   deletedEntry: true
    // });
    this.props.history.push('/boats');
  }

  render () {
    let response;
    if (!this.boat ) {
      response = (
        <Loading />
      )
    }
    else {
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
    return(
      <div>
        {response}
      </div>
    )
  }
}
export default OneBoat;





