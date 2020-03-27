import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Wrapper from './components/Wrapper';
import Success from './components/Success';
import Timer20 from './components/Timer20';
import Timer50 from './components/Timer50';
import TimerCustom from './components/TimerCustom';
import TimerSelection from './components/TimerSelection';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Notes from './components/Notes';

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
        <Profile path="/profile"/>
        <TimerSelection path="/timer/select" />
        <TimerSelection path="/timer/select/:taskIdx" />
        <Timer20 path="/timer/timer20" />
        <TaskList path="/tasklist"></TaskList>
        <Timer20 path="/timer/timer20/:taskIdx" />
        <Timer50 path="/timer/timer50" />
        <Timer50 path="/timer/timer50/:taskIdx" />
        <TimerCustom path="/timer/custom/:time" />
        <TimerCustom path="/timer/custom/:time/:taskIdx" />
        <TaskForm path="/tasks/new" />
        <Notes path="/tasks/notes/:taskIdx/new"/>
      </Router>
    </div>
  );
}

export default App;
