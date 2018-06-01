import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, withRouter, Redirect } from 'react-router-dom';
import { Container, Divider } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import BoatsList from './components/BoatsList';
import OneBoat from './components/OneBoat';
import EditBoat from './components/EditBoat';
import CreateBoat from './components/CreateBoat';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

import {
  getBoats,
  getOneBoat,
  createBoat,
  deleteBoat,
  updateBoat,
  login,
  register,
} from './services/apiService';

class App extends Component {
  constructor (props) {
    super(props);
    this.fname = 'App.js';
    console.log(`${this.fname} - in constructor...`);  //MMR REMOVE WHEN LIVE
    console.log('App: props', props);
    this.state = {
      boats: [],
      currentUser: null
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount () {
    console.log(`${this.fname} - componentDidMount`);
    this.fetchBoats();
    this.checkToken();
  }

  fetchBoats () {
    let fname = 'App.js';
    console.log(`${this.fname} - fetchBoats...`);
    getBoats()
      .then(resBody => {
        console.log(`${this.fname} resBody.data: `,resBody.data);
        this.setState({
          boats: resBody.data
        })
      });
  }

  checkToken()  {
    const authToken = localStorage.getItem('authToken');
    fetch('/api/auth', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(resp => {
        if (!resp.ok) throw new Error(resp.message);
        return resp.json()
      })
      .then(respBody => {
        this.setState({
          currentUser: respBody.user
        })
      })
      .catch(err => {
        console.log('not logged in');
        localStorage.removeItem('authToken');
        this.setState({
          currentUser: null
      });
   })
}

// handleLogin(creds) {
//   this.loginRequest(creds);
//   let fname = 'App.js - handleLogin';
//   console.log(`${fname} - `);
// }

  handleLogin(creds) {
    let fname = 'App.js - handleLogin';
    console.log(`${this.fname} - creds `, creds);
     login(creds)
     .then(user => this.setState({currentUser: user}));
  }

// handleRegister(creds) {
// //  console.log(creds)
//   this.registerRequest(creds);
// }

handleRegister(creds) {
  let fname = 'App.js - handleRegister';
  console.log(`${this.fname} - creds`, creds);
  register(creds);

}

  handleCreate(boat) {
    createBoat(boat)
    .then(resBody => {
      this.setState((prevState, props) => {
        return {
          boats: prevState.boats.concat(resBody.data)
        }
      })
    });
  }

  handleEdit(boat, id) {
    updateBoat(boat, id)
    .then(resBody => {
      this.setState((prevState, props) => {
        const { boats } = prevState;
        const indx = boats.findIndex(b => b.boat_id === id);
        console.log('App - handleEdit - boats, id, indx: ', boats, id, indx);
        return {
          boats: [
            ...boats.slice(0, indx),
            resBody.data,
            ...boats.slice(indx + 1)
          ]
        }
      })
    });
  }

  handleDelete(id) {
    console.log('App - in handle delete, about to delete boat_id  from db',id);
    console.log('App - this.state.boats before deletion: ', this.state.boats);
    console.log('App - typeof id', typeof(id));
    let num_id = parseInt(id, 10);
    deleteBoat(num_id)
    .then(respBody => {
      this.setState((prevState, props) => {
        return {
          boats: prevState.boats.filter(boat => boat.boat_id !== num_id)
        }
      })
    });
     console.log('App - this.state.boats after deletion: ', this.state.boats)
  }
    findBoat(id) {
    console.log(`findBoat - The boat whose index we need from the current array has boat_id of ${id}`);
    const index = this.state.boats.findIndex((boat) => boat.boat_id === parseInt(id, 10));
    console.log('findBoat - boat_id, index (in current state array) ', id, index);
    return index;
  }
  //   findBoatForEdit(id) {
  //   console.log(`findBoatForEdit - The boat whose index we need from the current array has boat_id of ${id}`);
  //   const index = this.state.boats.findIndex((boat) => boat.boat_id === parseInt(id, 10));
  //   console.log('findBoatForEdit - boat_id, index (in current state array) ', id, index);
  //   return index;
  // }
  render() {
    let fname = 'App.js';
    console.log(`${fname} - render - this.state`, this.state);
    return (
    <Router>
      <div className="App">

        <h1 className="App-header">DAYSAIL</h1>
        <h4 className="App-title">"Connecting the recreational sailing community"</h4>
        <NavBar />

        <Switch>

          <Route
            exact path = "/"
            component = { Landing }
          />
        <Route
          path = "/login"
          render = { () => (<LoginForm onLogin={this.handleLogin} />)}
        />
         <Route
           exact path = "/boats/edit/:id"
           render={(props) => (
               <EditBoat
               index={this.findBoat(props.match.params.id)}
               boats={this.state.boats}
               onEdit={this.handleEdit} />
             )}
           />

        <Route
          path = "/register"
          render = {() => (
            <RegisterForm
              onLogin={this.handleRegister}
            />
          )}
        />

          <Route
            exact path = "/boats"
            render={(props) => (
              <BoatsList
                boats={this.state.boats}
              />
            )}
          />

          <Route
            exact path = "/boats/new"
            render={(props) => (
              <CreateBoat
                currentUser = {this.state.currentUser}
                history = {props.history}
                onCreate={this.handleCreate}
               />
            )}
          />

          <Route
            exact path = "/boats/:id"
            render={(props) => (
              <OneBoat
                index={this.findBoat(props.match.params.id)}
                onDelete={()=> this.handleDelete(props.match.params.id)}
                history = {props.history}
                boats={this.state.boats} />
              )}
            />


         </Switch>
      </div>
    </Router>
    );
  }
}

export default App;

//          <Route
//           exact path = "/boats/:id"
//            render={(props) => (
//              <OneBoat
//               index={this.findBoat(props.match.params.id)}
//                onDelete={()=> this.handleDelete(props.match.params.id)}
//                boats={this.state.boats} />
//              )}
//            />

// let fname = 'App.js';
// console.log(`${fname} starting...`);  //MMR REMOVE WHEN LIVE

// console.log(`${fname} complete.`);  //MMR REMOVE WHEN LIVE
