import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from './Loading';


class CreateBoat extends Component  {
  constructor(props) {
    // let fname = 'editBoat.jsx';
    // console.log(`${fname} - in constructor...`);
    // console.log(`${fname} - props in constructor before super(props)...`,props);
    super(props);
    this.state = {
      boat: {
        description: '',
        location: '',
        photo: ''
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
 }

  handleInputChange(e) {
    // let fname='CreateBoat - handleInputChange';
    const {name, value} = e.target;
    // console.log(`${fname} name, value:`, name, value);
    this.setState((prevState, props) => ({
      boat: {
        ...prevState.boat,
        [name]: value
      }
    }))
  }

  handleSubmit(e) {
    e.preventDefault();
    let fname = 'CreateBoat - handleSubmit';
    console.log(`${fname} this.state.boat, this.props.currentUser: `, this.state.boat, this.props.currentUser);
    this.props.onCreate({...this.state.boat, creator_id: this.props.currentUser});
    this.setState({
      boat: {
        description: '',
        location: '',
        photo: ''
      }
    });
    this.props.history.push('/boats');
  }

  render(){
    let fname = 'CreateBoat.jsx';
    console.log(`${fname} - render - this.props.currentUser, this.state`, this.props.currentUser, this.state);

    return (
      <div>
        <h1>New Boat Information</h1>
        <form onSubmit={this.handleSubmit}>
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
export default CreateBoat;
