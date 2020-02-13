import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from './Home/Home';

function App() {
  return (
    <div className="App">

      <Router>

        <Route component={Home}>

        </Route>

      </Router>

    </div>
  );
}

export default App;
