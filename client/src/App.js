import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, withRouter, Redirect } from 'react-router-dom';
import { Container, Divider } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import BoatsList from './components/BoatsList';

import {
  getBoats,
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

  render() {
    let fname = 'App.js';
    console.log(`${fname} - in render...`);
    return (
    <Router>
      <div className="App">

        <h1 className="App-header">DAYSAIL</h1>
        <h4 className="App-title">"Connecting the recreational sailing community"</h4>
        <NavBar />

        <Route
          exact path = "/"
          component = { Landing }
        />

        <Route
          exact path = "/boats"
          render={(props) => (
            <BoatsList boats={this.state.boats} />
          )}
        />

      </div>
    </Router>
    );
  }
}

export default App;

// let fname = 'App.js';
// console.log(`${fname} starting...`);  //MMR REMOVE WHEN LIVE

// console.log(`${fname} complete.`);  //MMR REMOVE WHEN LIVE
