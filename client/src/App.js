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

const initialStudent = {
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  password: '',

}


const App = props => {
  // let history = useHistory();
  const [student, setStudent ] = useState(initialStudent)

  const [ studentList, setStudentList ] = useState([]);

  const [editing, setEditing] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(initialStudent);
  // const [edit, setEdit] = useState(false)

  //useEffect grabs student list and should update if new student is added or if student is edited
  useEffect(()=> {
    axiosWithAuth()
    .get(`/users`)
    .then(res => {
      console.log("this is the response", res);
      setStudentList(res.data)

    })
    .catch(err => {
      console.error("there was an error: ", err);
    })

  }, [student, editing]);


  //function that when called sets editing to true and sets StudentToEdit to student that is passed in 
  const editStudent = student => {
    setEditing(true);
    setStudentToEdit(student);
  };

  //save the edit by doing a put call
  const saveEdit = e => {
    e.preventDefault();

    axiosWithAuth()
      .put(`/${studentToEdit.id}`, studentToEdit)
      .then(res => {
        console.log("response from put: ", res);
        setStudentList(studentList);
        setEditing(false);
        // setEdit(true);
      })
      .catch(err => {
        console.log("error: ", err);
      });
  };

  




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
          props.history.push("/dashboard")
        })
        .catch(err => alert("Error couldn't delete: ", err))

        // .finally(() => window.location.reload())
  }

  //add student that is passed in to the array of students by registering them.
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
