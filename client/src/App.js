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
  const [taskEditing, setTaskEditing] = useState(false);
  const [ addingTask, setAddingTask ] = useState(false);
  const [deletedTask, setDeletedTask] = useState(false);

  const [activeStudent, setActiveStudent] = useState({})
  const [ isActive, setIsActive ] = useState(false)
  const [ isError, setIsError ] = useState(false)

  const [deadlines, setDeadlines] = useState([])


  // const [edit, setEdit] = useState(false)

  



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
        setEditing(!editing);
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
    setIsError(false)

    console.log("active student", activeStudent)
    console.log("isactive: ", isActive)
    
  }

  // const editTask = task => {
  //   setTaskEditing(true);
  //   setTaskToEdit(task);
  // };

  //save the edit by doing a put call
  // const saveTaskEdit = e => {
  //   e.preventDefault();

  //   axiosWithAuth()
  //     .put(`/tasks/${taskToEdit.task_id}`, taskToEdit)
  //     .then(res => {
  //       console.log("response from put: ", res);
  //       setDeadlines(deadlines);
  //       setTaskEditing(false);
  //       setAddingTask(true);
  //       setDeletedTask(true);
  //     })
  //     .catch(err => {
  //       console.log("error: ", err);
        
  //     });
  // };


  // const handleChanges = e => {
  //   setStudent({ ...student, [e.target.name]: e.target.value });
  // };

  // const submitForm = e => {
  //     e.preventDefault();
  //     addStudent(student);
  //     setStudent({
  //       username: '',
  //       firstname: '',
  //       lastname: '',
  //       email: '',
  //       password: '',
    
  //     })

  // };

  const deleteStudent = ev => {
    ev.preventDefault()
    console.log("student trying to delete: ", activeStudent)

    axiosWithAuth()
        .delete(`/users/student/${activeStudent.student_id}`)
        .then(res => {
          alert("Deleted Student")
          console.log("this is the response of delete: ", res)
          // props.history.push("/dashboard")
          setIsActive(false)
          setAdding(true)
        })
        .catch(err => alert("Error couldn't delete: ", err))

        // .finally(() => window.location.reload())
  }

  // const deleteTask = (ev, task) => {
  //   ev.preventDefault()
  //   console.log("task trying to delete: ", task)

  //   axiosWithAuth()
  //       .delete(`/tasks/${task.task_id}`)
  //       .then(res => {
  //         alert("Deleted Task")
  //         console.log("this is the response of delete task: ", res)
  //         setAdding(true)
  //         setTaskEditing(true);
  //       })
  //       .catch(err => alert("Error couldn't delete: ", err))

  // }

  //add student that is passed in to the array of students by registering them.
  // const addStudent = student => {
  //   const newStudent = {
  //     username: student.username,
  //     firstname: student.firstname,
  //     lastname: student.lastname,
  //     email: student.email,
  //     password: student.password

  //   }
  //   axiosWithAuth()
  //     .post('/auth/register', newStudent)
  //     .then(res => {
  //       console.log("this is the response", res);
  //       props.history.push("/dashboard")
        

  
  //     })
  //     .catch(err => {
  //       console.error("there was an error: ", err);
  //     })

  //   console.log("this is student list", studentList)
    
  // }

  useEffect(() => {
 
      axiosWithAuth()
      .get(`/users/all-students/${id}`)
      .then(response => {
          console.log('response of users on student list', response);
            setStudentList(response.data.student);
            // window.localStorage.setItem('professor_id', response.data.student.professor_id)
            // window.localStorage.setItem('student_id', response.data.student.student_id)
            setAdding(false);
      })
      .catch(err => {
          console.log('error, go fix!', err);
      })
  }, [adding]);

  //useEffect grabs student list and should update if new student is added or if student is edited
  useEffect(()=> {
    axiosWithAuth()
    .get(`/users/all-students/${id}`)
    .then(res => {
      console.log("this is the response of gets", res);
      setStudentList(res.data.student)

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
          setTaskEditing(false);
          setDeadlines(response.data);
          setIsActive(false)

      })
      .catch(err => {
          console.log('unable to fetch task projects', err);
      })
    }else{
      axiosWithAuth()
      .get(`/students/${activeStudent.student_id}/tasks`)
      .then(response => {
        
          console.log('this is the response from task get call for a student', response)
          // const filteredDeadlines= response.data.filter(student => student.id === activeStudent.id)
          setDeadlines(response.data.tasks);
          setAddingTask(false);
          setIsActive(true);
          setTaskEditing(false);
      })
      .catch(err => {
          console.log('unable to fetch task projects', err);
          setIsActive(false);
          setIsError(true);
          // setDeadlines([])
      })
  } 
}, [isActive, activeStudent, addingTask, taskEditing]);



  return (
    <div className="App">
      <StudentFormContext.Provider value = {{setAddingTask, taskToEdit, setTaskEditing, isError, setTaskToEdit, studentList, setStudentList, deleteStudent,  adding, setAdding, makeStudentActive, resetActiveStudent, activeStudent, isActive,setIsActive, deadlines, setDeadlines}}>
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
          {/* <PrivateRoute path="/student-dashboard/">
            <StudentList />
          </PrivateRoute>
          <PrivateRoute path="/student-dashboard/:id">
            <StudentCard/>
          </PrivateRoute> */}


          {/* <PrivateRoute path="/student-registration/">
            <AddStudent />
          </PrivateRoute> */}

          <PrivateRoute path="/student-details">
            <StudentDetails/>
          </PrivateRoute>


        </Router>
      </StudentFormContext.Provider>
    
    </div>
  );
}

export default App;
