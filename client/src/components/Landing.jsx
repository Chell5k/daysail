import React from 'react';
import './Landing.css';
// import { Link } from 'react-router-dom';
// import MySlider from './MySlider';
import Lagoon520 from '../lagoon-520.jpg';
import { Container } from 'semantic-ui-react';

function Landing (props)  {
return (
  <div class="landing">

      <div class= "fullwscreen">
        <img src={Lagoon520} />
      </div>

  </div>
  )
}

export default Landing;
