import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';


class editBoat extends Component  {
  constructor(props) {
    // let fname = 'editBoat.jsx';
    // console.log(`${fname} - in constructor...`);
    // console.log(`${fname} - props in constructor before super(props)...`,props);
    super(props);

    let fname = 'editBoat.jsx';
    console.log(`${fname} - props in constructor after super(props)...`,props);
    //there are two fields we will not update
    //boat_id
    //creator_id
    this.state = {
      description: 'tbd',
      location: 'tbd',
      photo: 'tbd'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    console.log('editBoat: in handleSubmit');
  }

  render () {
   let fname = 'editBoat.jsx';
    console.log(`${fname} - in render...`);
    return (
      <div>
        <h1>Edit This Boat:</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Boat Description:
            <input
              label='Boat Description'
              type='text'
              onChange={this.handleInputChange}
              value={this.state.description}
              name='description'
            />
          </label>
        </form>
      </div>
    )

  }
}

export default editBoat;
