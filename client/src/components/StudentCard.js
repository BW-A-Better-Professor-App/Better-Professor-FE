import React, { useContext } from "react";
import { StudentFormContext } from '../contexts/StudentFormContext';
import Moment from 'react-moment';
import AddTask from "./AddTask";
import EditStudentForm from "./EditStudentForm";
import EditTaskForm from "./EditTask";
import AddMessage from "./AddMessage"
import MessageList from "./MessageList"
import { axiosWithAuth } from '../utils/axiosWithAuth'

const StudentCard = props => {

  const { activeStudent, deadlines, deleteStudent, setTaskEditing, messages } = useContext(StudentFormContext)

  
  console.log('this is first name: ', activeStudent.firstname)

  const deleteTask = (ev, task) => {
    ev.preventDefault()
    const token = window.localStorage.getItem('token')
    console.log("task trying to delete: ", task)

    axiosWithAuth()
    .delete(`/tasks/${task.task_id}`)
    .then(res => {
      alert("Deleted Task")
      console.log("this is the response of delete task: ", res)
      setTaskEditing(true);
    })
    .catch(err => alert("Error couldn't delete: ", err))

  }
  return (
    <div>
      <h1>{activeStudent.firstname}</h1>
      <EditStudentForm />
      <button onClick={ev => deleteStudent(ev)}>Delete Student</button>
      <AddTask />
      
      
      {deadlines.map(deadline => (
        <div key={deadline.task_id }>
          <p align="center">{deadline.firstname} {deadline.lastname} </p>
          <p align="center">{deadline.task}</p>
          <p align="center"><Moment format="MM/DD/YYYY">{deadline.due_date}</Moment></p>
          <EditTaskForm task = {deadline} />
          <AddMessage task = {deadline} />
        
          
          <button onClick={ev => deleteTask(ev, deadline)}>Delete Project</button>
          <MessageList task = {deadline}/>
        </div>
        
      ))}
    </div>
  );
};
export default StudentCard;
