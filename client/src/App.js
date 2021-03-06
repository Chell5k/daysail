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
import UserView from './components/UserView';
import Logout from './components/Logout';
import BoatFaves from './components/BoatFaves';

import {
  getBoats,
  getOneBoat,
//  createBoat,
  deleteBoat,
  updateBoat,
  login,
  register,
  getFaves,
  deleteFave
} from './services/apiService';

class App extends Component {
  constructor (props) {
    super(props);
    this.fname = 'App.js';
    console.log(`${this.fname} - in constructor...`);  //MMR REMOVE WHEN LIVE
    console.log('App: props', props);
    this.state = {
      boats: [],
      currentUser: null,
      currentFaves: []
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleFave = this.handleFave.bind(this);
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

//MMR I believe I need to have createBoat defined here and not in apiService, because it needs
// to have this.state in scope.
  createBoat(boat) {
    const authToken = localStorage.getItem('authToken');
    console.log('createBoat - authToken');
    fetch('/api/boats', {
      method: 'POST',
      body: JSON.stringify(boat),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(resp => {
        if (!resp.ok) throw new Error(resp.statusMessage);
        console.log('createBoat - got response from server.');
        return resp.json();
      })
      .then(resBody => {
        console.log('createBoat - resBody: ', resBody);
        this.setState((prevState, props) => {
          return {
            boats: prevState.boats.concat(resBody.data)
          }
        })
      })
  }

  createFave(details) {
    console.log('App.js - createFave details', details);

    const authToken = localStorage.getItem('authToken');
    console.log('createFave - authToken');
    fetch('/api/boats/faves', {
      method: 'POST',
      body: JSON.stringify(details),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(resp => {
        if (!resp.ok) throw new Error(resp.statusMessage);
        console.log('createFave - got response from server.');
        return resp.json();
      })
      .then(resBody => {
        console.log('createFave - resBody: ', resBody);
        this.setState((prevState, props) => {
          return {
            currentFaves: prevState.currentFaves.concat(resBody.data)
          }
        })
      })
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
          currentUser: null,
          currentFaves: null
      });
   })
}

// handleLogin(creds) {
//   this.loginRequest(creds);
//   let fname = 'App.js - handleLogin';
//   console.log(`${fname} - `);
// }

  handleLogin(creds) {
    console.log(`App.js:handleLogin:creds `, creds);
     login(creds)
     .then(user => {
        console.log('App.js handleLogin - user: ', user);
        this.setState({currentUser: user});
        console.log('App.js handlelogin - this.state.currentUser: ', this.state.currentUser);
        console.log('App.js handlelogin - this.state.currentUser.username: ', this.state.currentUser.username);

// Load the user's faves when they log in.
       getFaves(this.state.currentUser.username)
        .then(faves =>{
            console.log('here are the ACTUAL faves results.', faves);
            this.setState({currentFaves: faves.data})
          })
        }).catch(err => {
        console.log('not logged in');
 //       localStorage.removeItem('authToken');
        this.setState({
          currentUser: null,
          currentFaves: null
      });
   })
  }

  handleLogout(){
    console.log(`App.js: handleLogout`);
      localStorage.removeItem('authToken');
      this.setState({
 //     boats: [],
        currentUser: null,
        currentFaves: []
    });
      console.log(`App.js: handleLogout - this.state after logout`, this.state);
  }

// handleRegister(creds) {
// //  console.log(creds)
//   this.registerRequest(creds);
// }

handleRegister(creds) {
  console.log(`App.js:handleRegister:creds`, creds);
  register(creds);

}

  handleCreate(boat) {
    this.createBoat(boat)
    //No need to do the following here, it is done above in this.createBoat.
    // .then(resBody => {
    //   this.setState((prevState, props) => {
    //     return {
    //       boats: prevState.boats.concat(resBody.data)
    //     }
    //   })
    // });
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

//handleFave
  handleFave(boat_id, user) {
    console.log('App.js - handleFave - boat_id', boat_id);
    console.log('App.js - handleFave - user', user);
    console.log('App.js - handleFave - this.state', this.state);

    //------------------
    //if boat_id is currently a fave then DELETE. If boat_id is not in the faves array then INSERT
    let faves = this.state.currentFaves;
    let username = this.state.currentUser.username;
    console.log('App.js - handleFave - faves array', faves);
    console.log('App.js - typeof boat_id', typeof(boat_id));
//    console.log("App.js - typeof faves[0]['boat_id']", typeof(faves[0]['boat_id']));
    let index = faves.findIndex(fave => fave.boat_id === parseInt(boat_id, 10));
    let is_fave = index != -1;
    console.log('App.js - handleFave - index:',index);
    console.log ('App.js - handleFave - is_fave', is_fave);
    //-------------------

    if (is_fave) {
      console.log(`App.js - handleFave - call the DELETE function`);
      deleteFave({boat_id: boat_id, username: username})
      .then(respBody => {
        this.setState((prevState, props) => {
          return {
            currentFaves: prevState.currentFaves.filter(boat => boat.boat_id !== parseInt(boat_id,10))
          }
        })
      });
    } else {
      console.log(`App.js - handleFave - call the CREATE function`);
        this.createFave({boat_id: boat_id, username: username});
    }
  }

  render() {

    let fname = 'App.js';
    console.log(`${fname} - render - this.state`, this.state);
    return (
    <Router>
      <div className="App">

        <h1 className="App-header">DAYSAIL</h1>
        <h4 className="App-title">"Connecting the recreational sailing community"</h4>
        <NavBar
          currentUser={this.state.currentUser}
        />
        <div className="clearfix"></div>
        <div className="App-daysail">

        <Switch>

          <Route
            exact path = "/"
            component = { Landing }
          />
        <Route
          path = "/login"
          render = {(props) => (
            <LoginForm
              {...props}
              onLogin={this.handleLogin}
            />
          )}
        />

        <Route
          path = "/logout"
          render = {(props) => (
            <Logout
              {...props}
              onLogout={this.handleLogout}
            />
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
                {...props}
                currentUser = {this.state.currentUser}
                index={this.findBoat(props.match.params.id)}
                onDelete={()=> this.handleDelete(props.match.params.id)}
                onToggleFave={()=> this.handleFave(props.match.params.id, this.state.currentUser)}
                history = {props.history}
                boats={this.state.boats}
                faves={this.state.currentFaves}
                />
              )}
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
           exact path = "/boats/faves/:user"
           render={(props) => (
               <BoatFaves
               {...props}
               all_boats={this.state.boats}
               faves={this.state.currentFaves} />
             )}
           />

         </Switch>
         </div>
         <div className='App-footer'>
          <p>&copy; 2018 cheledev.com</p>
         </div>
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
