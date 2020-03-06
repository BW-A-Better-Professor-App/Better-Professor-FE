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
    const { deleteStudent, adding, setAdding, makeStudentActive, resetActiveStudent, studentList, setStudentList } = useContext(StudentFormContext)

    // const [students, setStudents] =  useState([])
    const history = useHistory();
    console.log("this is the student list from context to studentlist.js", studentList)





    return (

      <TableContainer className="table_container" component={Paper}>
        <Table  size="small" aria-label="a dense table">
          <TableHead className="table_head">
            <TableRow>
              <TableCell align="center">My Students</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>

                <TableRow onClick={ev => resetActiveStudent(ev)}>
                  <TableCell align="center">All Students</TableCell>
                </TableRow>
                {studentList.map(student => (
                  <TableRow onClick={ev => makeStudentActive(ev, student)} key={student.student_id}>
                  
                    <TableCell>{student.firstname} {student.lastname} </TableCell> 
                    </TableRow>
                  
                
                

                
              
            ))}
           
          </TableBody>
        </Table>
      </TableContainer>
    );

}

//needs to display a list of students.
//need to be able to click on each student's name and have their details display
