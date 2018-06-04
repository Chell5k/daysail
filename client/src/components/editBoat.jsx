import './EditBoat.css';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Button, Form, Message, Divider  } from 'semantic-ui-react';
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
        <div className='create-box'>
            <Container>

                <Form success className='form'>
                    <form onSubmit={this.handleSubmit}>
                    {this.state.redirectOneBoat && <Redirect to={`/boats/${this.state.boat.boat_id}`} />}
                    <Message
                      attached
                      content='Edit Boat Details'
                    />
                    <Divider hidden/>

                    <label>
                        Description
                        <textarea
                        label='Boat Description'
                        type='text'
                        onChange={this.handleInputChange}
                        value={this.state.boat.description}
                        name='description'
                        />
                    </label>

                    <Divider hidden />

                    <label>
                        Location
                        <textarea
                        label='Boat location'
                        type='text'
                        onChange={this.handleInputChange}
                        value={this.state.boat.location}
                        name='location'
                        />
                    </label>

                    <Divider hidden />

                    <label>
                        Photo
                        <textarea
                        label='Boat photo'
                        type='text'
                        onChange={this.handleInputChange}
                        value={this.state.boat.photo}
                        name='photo'
                    />
                    </label>
                    <Divider hidden/>


                    <Button type='submit'>Save Changes</Button>


                    <Button>
                    <Link to='/boats'>Cancel</Link>
                    </Button>

                    </form>
                </Form>
            </Container>
        </div>
    )

  }
}

export default EditBoat;
