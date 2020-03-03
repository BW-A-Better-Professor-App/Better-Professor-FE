import React, { useEffect, useState } from 'react';
import axios from 'axios'

import StudentCard from './StudentCard'
import { axiosWithAuth } from '../utils/axiosWithAuth';
// import data from './data.js'

const data = [
  { name: 'John Smith', task: 'Review Term Paper', Date: 'March 10th'},
  { name: 'John burger', task: 'Review Term Paper', Date: 'March 11th'},
  { name: 'John stonper', task: 'Review Term Paper', Date: 'March 13th'},
  { name: 'John lamoni', task: 'Review Term Paper', Date: 'March 16th'},
]
export default function StudentList() {
    const [students, setStudents] =  useState([])

    useEffect(() => {
      // setStudents(data);
      // console.log("dummy students: ", students)
        axiosWithAuth()
        .get(`/users`)
        .then(response => {
            console.log('response of tasks', response);
              setStudents(response.data);
        })
        .catch(err => {
            console.log('error, go fix!', err);
        })
    }, []);

    return (
        <section className="student-list">
            {/* <SearchFrom /> */}
            <div>
            {students.map(student => (
              <div key={student.id}>
              
                <StudentCard name={student.firstname} />
                
                
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
