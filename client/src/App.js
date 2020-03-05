import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, useHistory} from 'react-router-dom';

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
  // let history = useHistory();
  const id = parseInt(localStorage.getItem('id'),10);
  const [student, setStudent ] = useState(initialStudent)

  const [ studentList, setStudentList ] = useState([]);

  const [editing, setEditing] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(initialStudent);
  const [ adding, setAdding ] = useState(false);

  const [taskToEdit, setTaskToEdit] = useState({})
  const [taskEditing, setTaskEditing] = useState(false)
  const [ addingTask, setAddingTask ] = useState(false);

  const [activeStudent, setActiveStudent] = useState({})
  const [ isActive, setIsActive ] = useState(false)

  const [deadlines, setDeadlines] = useState([])


  // const [edit, setEdit] = useState(false)

  //useEffect grabs student list and should update if new student is added or if student is edited
  useEffect(()=> {
    axiosWithAuth()
    .get(`/users/all-students/${id}`)
    .then(res => {
      console.log("this is the response of gets", res);
      setStudentList(res.data)

    })
    .catch(err => {
      console.error("there was an error: ", err);
    })

  }, []);
  //Grab single student projects or tasks
  useEffect(() => {
    console.log("get tasks coming");
    if(!isActive){
   
      axiosWithAuth()
      .get(`/tasks`)
      .then(response => {
          
          console.log('this is the response from task get call for all', response)
          setDeadlines(response.data);

      })
      .catch(err => {
          console.log('unable to fetch task projects', err);
      })
    }else{
      axiosWithAuth()
      .get(`/students/${activeStudent.student_id}/tasks`)
      .then(response => {
        
          console.log('this is the response from task get call for a student', response)
          setDeadlines(response.data.tasks);
          setAddingTask(false);
      })
      .catch(err => {
          console.log('unable to fetch task projects', err);
          // setDeadlines([])
      })
  } 
}, [isActive, activeStudent, addingTask]);



  //function that when called sets editing to true and sets StudentToEdit to student that is passed in 
  const editStudent = student => {
    setEditing(true);
    setStudentToEdit(student);
  };

  //save the edit by doing a put call
  const saveEdit = e => {
    e.preventDefault();

    axiosWithAuth()
      .put(`/students/${studentToEdit.student_id}`, studentToEdit)
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

    console.log("active student", activeStudent)
    console.log("isactive: ", isActive)
    
  }

  const editTask = task => {
    setTaskEditing(true);
    setTaskToEdit(task);
  };

  //save the edit by doing a put call
  const saveTaskEdit = e => {
    e.preventDefault();

    axiosWithAuth()
      .put(`/tasks/${taskToEdit.task_id}`, taskToEdit)
      .then(res => {
        console.log("response from put: ", res);
        setDeadlines(deadlines);
        setTaskEditing(false);
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

  const deleteStudent = ev => {
    ev.preventDefault()
    console.log("student trying to delete: ", activeStudent)

    axiosWithAuth()
        .delete(`/students/${activeStudent.student_id}`)
        .then(res => {
          alert("Deleted Student")
          // props.history.push("/dashboard")
          setIsActive(false)
          setAdding(true)
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
      <StudentFormContext.Provider value = {{setAddingTask, studentList, deleteStudent, adding, setAdding, makeStudentActive, resetActiveStudent, activeStudent, isActive, deadlines, setDeadlines }}>
        <Router>
          <Header />
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
          <PrivateRoute path="/student-dashboard/:id">
            <StudentCard/>
          </PrivateRoute>


          <PrivateRoute path="/student-registration/">
            <AddStudent />
          </PrivateRoute>

          <PrivateRoute path="/student-details">
            <StudentDetails/>
          </PrivateRoute>

          <Route  exact path = '/'>
            <Register/>
          </Route>


        </Router>
      </StudentFormContext.Provider>
    
    </div>
  );
}

export default App;
