import React, { useState, useEffect } from 'react';
import './App.css';
import { Router } from '@reach/router';
import Wrapper from './components/Wrapper';
import Success from './components/Success';
import Timer20 from './components/Timer20';
import Timer50 from './components/Timer50';
import TimerCustom from './components/TimerCustom';
import TimerSelection from './components/TimerSelection';
import axios from 'axios'
import NavBar from './components/NavBar';
import TaskForm from './components/TaskForm';

// i used a wrapper so that you can see the registration and login as different components
// instead of on one page. the wrapper allows me to put both components on the same route.
// if the cookie was set with HttpOnly:false then you can show it using {document.cookie}
function App() {
  return (
    <div className="wrapper">
      <NavBar></NavBar>
      <Router>
        <Wrapper path="/" />
        <Success path="/success" />
        <TimerSelection path="/timer/select" />
        <TimerSelection path="/timer/select/:taskIdx" />
        <Timer20 path="/timer/timer20" />
        <Timer20 path="/timer/timer20/:taskIdx" />
        <Timer50 path="/timer/timer50" />
        <Timer50 path="/timer/timer50/:taskIdx" />
        <TimerCustom path="/timer/custom/:time" />
        <TimerCustom path="/timer/custom/:time/:taskIdx" />
        <TaskForm path="/tasks/new" />
      </Router>
    </div>
  );
}

export default App;
