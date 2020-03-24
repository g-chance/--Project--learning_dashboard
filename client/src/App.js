import React, {useState, useEffect} from 'react';
import './App.css';
import {Router} from '@reach/router';
import Wrapper from './components/Wrapper';
import Success from './components/Success';
import axios from 'axios'
import StuffAndThings from './components/StuffAndThings';

// i used a wrapper so that you can see the registration and login as different components
// instead of on one page. the wrapper allows me to put both components on the same route.
// if the cookie was set with HttpOnly:false then you can show it using {document.cookie}
function App() {
  return (
    <div className="App">
      <StuffAndThings></StuffAndThings>
      <Router>
        <Wrapper path="/"/>
        <Success path="/success" />
      </Router> 
    </div>
  );
}

export default App;
