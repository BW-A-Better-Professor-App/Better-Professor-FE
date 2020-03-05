import React, { useContext } from "react";
import { StudentFormContext } from '../contexts/StudentFormContext';
import Moment from 'react-moment';

// import EditStudentForm from './EditStudentForm'


const StudentCard = props => {

  const { activeStudent, deadlines, deleteStudent } = useContext(StudentFormContext)
  console.log()

  
  console.log('this is first name: ', activeStudent.firstname)
  return (
    <div>
      <h1>{activeStudent.firstname}</h1>
      <button onClick={ev => deleteStudent(ev)}>Delete Student</button>
      {/* <EditStudentForm/> */}
      
      {deadlines.map(deadline => (
                <div key={deadline.task_id}>
                  {/* <p component="th" scope="row">
                    {/* {row.name} */}
                  {/* </p> */} 
                  <p align="center">{deadline.firstname} {deadline.lastname} </p>
                  <p align="center">{deadline.task}</p>
                  <p align="center"><Moment format="DD/MM/YYYY">{deadline.due_date}</Moment></p>
                  <p align="center"><button>Edit</button></p>
                  <p align="center"><button>Delete</button></p>

                </div>
              ))}
    </div>
  );
};
export default StudentCard;
