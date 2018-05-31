import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from './Loading';


class EditBoat extends Component  {
  constructor(props) {
    // let fname = 'editBoat.jsx';
    // console.log(`${fname} - in constructor...`);
    // console.log(`${fname} - props in constructor before super(props)...`,props);
    super(props);

    let fname = 'EditBoat.jsx';
    console.log(`${fname} - constructor props after super...`,props);
    //there are two fields we will not update
    //boat_id
    //creator_id
    //Here we will merge in the current values for this boat, so that the form's fields are pre-filled.
    this.state = {
      redirectOneBoat: false,
      boat : Object.assign({
        description: '',
        location: '',
        photo: ''
      }, props.boats[props.index])
    };
    console.log(`${fname} - constructor - this.state `,this.state);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //  handleInputChange(e) {
  //   const { name, value } = e.target;
  //   this.setState({
  //     [name]: value
  //   });
  // }

    handleInputChange(e) {
    const {name, value} = e.target;
    console.log(name, value);
    this.setState((prevState, props) => ({
      boat: {
        ...prevState.boat,
        [name]: value
      }
    }))
  }

  handleSubmit(e) {
    e.preventDefault();
    let fname = 'EditBoat.jsx';
    console.log(this.state);
    console.log(`${fname}: in handleSubmit`);
    this.props.onEdit(this.state.boat, this.state.boat.boat_id);
    console.log(`${fname} - handleSubmit - this.state: `, this.state);
    this.setState({
      redirectOneBoat: true
    })
  }

  render () {
   let fname = 'EditBoat.jsx';
    console.log(`${fname} - in render - this.props, this.state`, this.props, this.state);
    return (
      <div>
        <h1>Edit This Boat:</h1>
        <form onSubmit={this.handleSubmit}>
        {this.state.redirectOneBoat && <Redirect to={`/boats/${this.state.boat.boat_id}`} />}
          <label>
            Boat Description:
            <textarea
              label='Boat Description'
              type='text'
              onChange={this.handleInputChange}
              value={this.state.boat.description}
              name='description'
            />
          </label>

          <br/>
          <br/>

           <label>
            Boat Location:
            <textarea
              label='Boat location'
              type='text'
              onChange={this.handleInputChange}
              value={this.state.boat.location}
              name='location'
            />
          </label>

          <br/>
          <br/>

           <label>
            Boat Photo:
            <textarea
              label='Boat photo'
              type='text'
              onChange={this.handleInputChange}
              value={this.state.boat.photo}
              name='photo'
            />
          </label>
          <button type='submit'>Save Changes</button>
          <Link to='/'>Cancel</Link>
        </form>
      </div>
    )

  }
}

export default EditBoat;