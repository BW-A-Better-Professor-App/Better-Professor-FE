import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { StudentFormContext } from '../contexts/StudentFormContext';


import StudentCard from './StudentCard'
import { axiosWithAuth } from '../utils/axiosWithAuth';


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';

// import data from './data.js'

const data = [
  { name: 'John Smith', task: 'Review Term Paper', Date: 'March 10th'},
  { name: 'John burger', task: 'Review Term Paper', Date: 'March 11th'},
  { name: 'John stonper', task: 'Review Term Paper', Date: 'March 13th'},
  { name: 'John lamoni', task: 'Review Term Paper', Date: 'March 16th'},
]
export default function StudentList() {
  const id = parseInt(localStorage.getItem('id'),10);
    const { deleteStudent, adding, setAdding, makeStudentActive, resetActiveStudent } = useContext(StudentFormContext)

    const [students, setStudents] =  useState([])
    const history = useHistory();



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

      <TableContainer className="table_container" component={Paper}>
        <Table  size="small" aria-label="a dense table">
          <TableHead className="table_head">
            <TableRow>
              <TableCell align="center">My Students</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {data.map(student => (
              <TableRow key={student.id}>
                {/* <TableCell component="th" scope="row">
                  {row.name}
                </TableCell> */}
                {/* <TableCell align="center">{student.name}</TableCell> */}

          {/* <section className="student-list">
                {/* <SearchFrom /> */}
                {/* <div> */}
                <TableRow onClick={ev => resetActiveStudent(ev)}>
                  <TableCell align="center">All Students</TableCell>
                </TableRow>
                {students.map(student => (
                  <TableRow onClick={ev => makeStudentActive(ev, student)} key={student.id}>
                  
                    <TableCell>{student.firstname} {student.lastname} </TableCell> 
                    </TableRow>
                  
                
                

                
              
            ))}
           
          </TableBody>
        </Table>
      </TableContainer>
    );

    // return (
    //     <section className="student-list">
    //         {/* <SearchFrom /> */}
    //         <div>
    //          {data.map(student => (
    //           <div key={data.id}>
              
    //             <h1>{student.name}</h1> 
                
                
    //             {/* // assignments={student.assignments}
    //             // dueDate={student.assignments.dueDates}
    //             // notes={student.notes} */}
              
    //           </div>
    //         ))}
    //         </div>
    //     </section>
    // );
}

//needs to display a list of students.
//need to be able to click on each student's name and have their details display
