import './App.css';
import React from 'react';
import { useState} from 'react';
import { BrowserRouter as Router, Route, Switch as RSwitch } from 'react-router-dom';
import { Autorefresh } from './Component/Autorefresh'

function App() {
  return (
    <Router>
      <div className='App'>
      <RSwitch>
        <Route exact path="/" component={Autorefresh} />
      </RSwitch>
      </div>
    </Router>
  );
}

export default App;
