import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, withRouter, Redirect } from 'react-router-dom';
import { Container, Divider } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import Landing from './components/Landing';

class App extends Component {
  constructor (props) {
  let fname = 'App.js';
  console.log(`${fname} - in constructor...`);  //MMR REMOVE WHEN LIVE
    super(props);
  }

  componentDidMount () {
  let fname = 'App.js';
  console.log(`${fname} - in componentDidMount...`);

  }

  render() {
  let fname = 'App.js';
  console.log(`${fname} - in render...`);
    return (
      <Router>

        <div className="App">
          <Container>
            <h1 className="App-header">DAYSAIL</h1>
            <h4 className="App-title">"Connecting the recreational sailing community"</h4>
            <NavBar />
            <Landing />
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;

// let fname = 'App.js';
// console.log(`${fname} starting...`);  //MMR REMOVE WHEN LIVE

// console.log(`${fname} complete.`);  //MMR REMOVE WHEN LIVE
