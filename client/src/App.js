import React, { Component } from 'react';
import './App.css';

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
      <div className="App">
        <h1>DAYSAIL APP</h1>
      </div>
    );
  }
}

export default App;

// let fname = 'App.js';
// console.log(`${fname} starting...`);  //MMR REMOVE WHEN LIVE

// console.log(`${fname} complete.`);  //MMR REMOVE WHEN LIVE
