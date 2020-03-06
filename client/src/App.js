import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { StudentFormContext } from './contexts/StudentFormContext'

import Login from './components/Login';
import StudentLogin from './components/StudentLogin';
import Header from './components/Header'
import Register from "./components/Registration"
import './App.css';
import PrivateRoute from './utils/PrivateRoute';
import TeacherDashboard from './components/TeacherDashboard';
import StudentCard from './components/StudentCard';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import { axiosWithAuth } from './utils/axiosWithAuth';
import StudentDetails from './components/StudentDetails'

const initialStudent = {
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  password: '',

}


const App = props => {

  const id = parseInt(localStorage.getItem('id'),10);
  const [student, setStudent ] = useState(initialStudent)

  const [ studentList, setStudentList ] = useState([]);

  const [editing, setEditing] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(initialStudent);
  const [ adding, setAdding ] = useState(false);

  const [taskToEdit, setTaskToEdit] = useState({});
  const [taskEditing, setTaskEditing] = useState(false);
  const [ addingTask, setAddingTask ] = useState(false);
  const [deletedTask, setDeletedTask] = useState(false);

  const [activeStudent, setActiveStudent] = useState({});
  const [ isActive, setIsActive ] = useState(false);
  const [ isError, setIsError ] = useState(false);

  const [deadlines, setDeadlines] = useState([]);

  const [messages, setMessages] = useState([]);
  const [messageToAdd, setMessageToAdd] = useState("");


  // const [edit, setEdit] = useState(false)

  



  //function that when called sets editing to true and sets StudentToEdit to student that is passed in 
  // const editStudent = student => {
  //   setEditing(true);
  //   setStudentToEdit(student);
  // };

  // //save the edit by doing a put call
  // const saveEdit = e => {
  //   e.preventDefault();

  //   axiosWithAuth()
  //     .put(`/students/${studentToEdit.student_id}`, studentToEdit)
  //     .then(res => {
  //       console.log("response from put: ", res);
  //       setStudentList(studentList);
  //       setEditing(!editing);
  //       // setEdit(true);
  //     })
  //     .catch(err => {
  //       console.log("error: ", err);
  //     });
  // };

  
  const makeStudentActive = (ev, student) => {
    ev.preventDefault();
    setActiveStudent(student);
    setIsActive(true);

    console.log("active student", activeStudent)
    console.log("isactive: ", isActive)
    
  }

    
  const resetActiveStudent = ev => {
    ev.preventDefault();
    setActiveStudent({});
    setIsActive(false);
    setIsError(false)

    console.log("active student", activeStudent)
    console.log("isactive: ", isActive)
    
  }



  const deleteStudent = ev => {
    ev.preventDefault()
    console.log("student trying to delete: ", activeStudent)
    const token = window.localStorage.getItem('token')
    console.log("this is the token being used to delete: ", token)

    axiosWithAuth()
        .delete(`/students/${activeStudent.student_id}`, token)
        .then(res => {
          alert("Deleted Student")
          console.log("this is the response of delete: ", res)
          setIsActive(false)
          setAdding(true)
        })
        .catch(err => alert("Error couldn't delete: ", err))

  }

  //grabs messages for student
  useEffect(() => {
 
      axiosWithAuth()
      .get(`/students/${activeStudent.student_id}/messages`)
      .then(response => {
          console.log('response of messages for active student', response);
            // setStudentList(response.data.student);
            setMessages(response.data.messages)
          
            // setAdding(false);
      })
      .catch(err => {
          console.log('error, go fix!', err);
      })
  }, [taskEditing, activeStudent]);
//useEffect grabs student list and should update if new student is added or if student is edited
  
  useEffect(() => {
 
    axiosWithAuth()
    .get(`/users/all-students/${id}`)
    .then(response => {
        console.log('response of users on student list', response);
          setStudentList(response.data.student);
        
          setAdding(false);
    })
    .catch(err => {
        console.log('error, go fix!', err);
    })
}, [taskEditing, adding]);




  //Grab all task if no active student but if active student only grabs single student projects or tasks
  useEffect(() => {
    console.log("get tasks coming");
    if(!isActive){
   
      axiosWithAuth()
      .get(`/tasks`)
      .then(response => {
          
          console.log('this is the response from task get call for all', response)
          const filteredDeadlines= response.data.filter(data => data.task_id !== null)
          const sortedDeadlines= filteredDeadlines.sort((a,b) => b.due_date-a.due_date);
          console.log('this is the sorted Deadlines', sortedDeadlines)
          setTaskEditing(false);
          setDeadlines(sortedDeadlines);
          // setIsActive(false)

      })
      .catch(err => {
          console.log('unable to fetch task projects', err);
          // setIsActive(true);//was set to false
      })
    }else{
      axiosWithAuth()
     
      .get(`/tasks`)
      .then(response => {
        
          console.log('this is the response from task get call for a student', response)
          const studentFilteredDeadlines= response.data.filter(data => data.lastname === activeStudent.lastname && data.task_id !== null)
          // const sortedDeadlines= filteredDeadlines.sort((a,b) => b.due_date-a.due_date);
          console.log('this is the filtered student Deadlines', studentFilteredDeadlines)
          
          setDeadlines(studentFilteredDeadlines);
          setAddingTask(false);
          setIsActive(true);
          setTaskEditing(false);
          setEditing(false);
      })
      .catch(err => {
          console.log('unable to fetch task projects', err);
          setIsActive(true);//was set to false
          setIsError(true);
          // setDeadlines([])
      })
  } 
}, [editing, isActive, activeStudent, addingTask, taskEditing]);



  return (
    <div className="App">
      <StudentFormContext.Provider value = {{messages, setAddingTask, taskToEdit, setTaskEditing, isError, setTaskToEdit, studentList, setStudentList, deleteStudent,  adding, setAdding, makeStudentActive, resetActiveStudent, activeStudent, isActive,setIsActive, deadlines, setDeadlines}}>
        <Router>
          <Header />
          <Switch>
          <Route  exact path = '/'>
            <Register/>
          </Route>
          <Route  exact path = '/Login'>
            <Login />
          </Route>

          <Route  exact path = '/Login/Student'>
            <StudentLogin />
          </Route>

          <PrivateRoute  exact path = '/dashboard'>
            <TeacherDashboard/>
          </PrivateRoute>
          <PrivateRoute path="/student-dashboard/">
            <StudentList />
          </PrivateRoute>
          {/* <PrivateRoute path="/student-dashboard/:id">
            <StudentCard/>
          </PrivateRoute> */}


          {/* <PrivateRoute path="/student-registration/">
            <AddStudent />
          </PrivateRoute> */}

          <PrivateRoute path="/student-details">
            <StudentDetails/>
          </PrivateRoute>

      
          <Route render={() => (<h2>Not Found</h2>)} />
          </Switch>


        </Router>
      </StudentFormContext.Provider>
    
    </div>
  );
}

export default App;
