import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, useHistory} from 'react-router-dom';

import { StudentFormContext } from './contexts/StudentFormContext'

import Login from './components/Login';
import Header from './components/Header'
import Register from "./components/Registration"
import './App.css';
import PrivateRoute from './utils/PrivateRoute';
import TeacherDashboard from './components/TeacherDashboard';
import StudentCard from './components/StudentCard';
import StudentList from './components/StudentList';
import { axiosWithAuth } from './utils/axiosWithAuth';

const App = props => {
  // let history = useHistory();
  const [student, setStudent ] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',

  })

  const [ studentList, setStudentList ] = useState([]);
  


  useEffect(()=> {
    axiosWithAuth()
    .get()
    .then(res => {
      console.log("this is the response", res);
      setStudentList(res.data)

    })
    .catch(err => {
      console.error("there was an error: ", err);
    })

  }, [student]);

  const handleChanges = e => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const submitForm = e => {
      e.preventDefault();
      addStudent(student);
      setStudent({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    
      })

  };

  const deleteStudent = student => {

    axiosWithAuth()
        .delete(`/${student.id}`)
        .then(res => {
          alert("Deleted Student")
        })
        .catch(err => alert("Error couldn't delete: ", err))
        // .finally(() => window.location.reload())
  }

  const addStudent = student => {
    const newStudent = {
      username: student.username,
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
      password: student.password

    }
    axiosWithAuth()
      .post('/auth/register', newStudent)
      .then(res => {
        console.log("this is the response", res);
        props.history.push("/dashboard")
        

  
      })
      .catch(err => {
        console.error("there was an error: ", err);
      })

    console.log("this is student list", studentList)
    
  }





  return (
    <div className="App">
      <StudentFormContext.Provider value = {{}}>
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
      </StudentFormContext.Provider>
     
    </div>
  );
}

export default App;
