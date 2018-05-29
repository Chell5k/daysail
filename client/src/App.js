import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, withRouter, Redirect } from 'react-router-dom';
import { Container, Divider } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import BoatsList from './components/BoatsList';
import OneBoat from './components/OneBoat';
import editBoat from './components/editBoat';

import {
  getBoats,
  getOneBoat,
  // createBoat,
  // deleteBoat,
  // updateBoat,
  // login
} from './services/apiService';

class App extends Component {
  constructor (props) {
  let fname = 'App.js';
  console.log(`${fname} - in constructor...`);  //MMR REMOVE WHEN LIVE
    super(props);
    this.state = {
      boats: []
    }
  }

  componentDidMount () {
    let fname = 'App.js';
    console.log(`${fname} - in componentDidMount...`);
    getBoats()
      .then(resBody => {
        console.log(`${fname} resBody.data: `,resBody.data);
        this.setState({
          boats: resBody.data
        })
      });
  }

    findBoat(id) {
    console.log(`findBoat - The boat whose index we need from the current array has boat_id of ${id}`);
    const index = this.state.boats.findIndex((boat) => boat.boat_id === parseInt(id, 10));
    console.log('findBoat - boat_id, index (in current state array) ', id, index);
    return index;
  }
    findBoatForEdit(id) {
    console.log(`findBoatForEdit - The boat whose index we need from the current array has boat_id of ${id}`);
    const index = this.state.boats.findIndex((boat) => boat.boat_id === parseInt(id, 10));
    console.log('findBoatForEdit - boat_id, index (in current state array) ', id, index);
    return index;
  }
  render() {
    let fname = 'App.js';
    console.log(`${fname} - in render...`);
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
           exact path = "/edit/boats/:id"
           render={(props) => (
               <editBoat
               index={this.findBoatForEdit(props.match.params.id)}
               boats={this.state.boats} />
             )}
           />

          <Route
            exact path = "/boats"
            render={(props) => (
              <BoatsList boats={this.state.boats} />
            )}
          />

          <Route
            exact path = "/boats/:id"
            render={(props) => (
                <OneBoat
                index={this.findBoat(props.match.params.id)}
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



// let fname = 'App.js';
// console.log(`${fname} starting...`);  //MMR REMOVE WHEN LIVE

// console.log(`${fname} complete.`);  //MMR REMOVE WHEN LIVE
