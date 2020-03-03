import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path = '/'>
          <Login />
        </Route>



      </Router>
     
    </div>
  );
}

export default App;
