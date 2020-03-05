import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { StudentFormContext } from '../contexts/StudentFormContext';


import StudentCard from './StudentCard'
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
// import data from './data.js'

const data = [
  { name: 'John Smith', task: 'Review Term Paper', Date: 'March 10th'},
  { name: 'John burger', task: 'Review Term Paper', Date: 'March 11th'},
  { name: 'John stonper', task: 'Review Term Paper', Date: 'March 13th'},
  { name: 'John lamoni', task: 'Review Term Paper', Date: 'March 16th'},
]
export default function StudentList() {
    const id = localStorage.getItem('id');
    const { adding, setAdding } = useContext(StudentFormContext)

    const [students, setStudents] =  useState([])
    const history = useHistory();
    const routeToStudent = (ev, student) => {
      ev.preventDefault();
      history.push(`/dashboard/${student.id}`);
    }


    useEffect(() => {
      // setStudents(data);
      // console.log("dummy students: ", students)
        axiosWithAuth()
        .get(`/users/all-students/${id}`)
        .then(response => {
            console.log('response of users on student list', response);
              setStudents(response.data.student);
              // window.localStorage.setItem('professor_id', response.data.student.professor_id)
              // window.localStorage.setItem('student_id', response.data.student.student_id)
              setAdding(false)
        })
        .catch(err => {
            console.log('error, go fix!', err);
        })
    }, [adding]);

    return (
        <section className="student-list">
            {/* <SearchFrom /> */}
            <div>
            {students.map(student => (
              <div onClick={ev => routeToStudent(ev, student)} key={student.id}>
              
                <h1>{student.firstname} {student.lastname}</h1> 
                
                
                
                {/* // assignments={student.assignments}
                // dueDate={student.assignments.dueDates}
                // notes={student.notes} */}
              
              </div>
            ))}
            </div>
        </section>
    );
}

//needs to display a list of students.
//need to be able to click on each student's name and have their details display
