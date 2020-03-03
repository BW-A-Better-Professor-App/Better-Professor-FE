import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header'
import Register from "./components/Registration"
import './App.css';
import PrivateRoute from './utils/PrivateRoute';
import TeacherDashboard from './components/TeacherDashboard';
import StudentCard from './components/StudentCard';
import StudentList from './components/StudentList';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route  exact path = '/'>
          <Register/>
        </Route>
        <Route  exact path = '/Login'>
          <Login />
        </Route>

        <PrivateRoute  exact path = '/dashboard'>
          <TeacherDashboard/>
        </PrivateRoute>
        <PrivateRoute path="/student-dashboard/">
          <StudentList />
        </PrivateRoute>
        <PrivateRoute path="/student-dashboard/:id">
          <StudentCard/>
        </PrivateRoute>

      </Router>
     
    </div>
  );
}

export default App;
