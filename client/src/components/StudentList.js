import React, { useContext } from 'react';

import { StudentFormContext } from '../contexts/StudentFormContext';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import { useHistory } from 'react-router-dom';

export default function StudentList() {
  const id = parseInt(localStorage.getItem('id'),10);
  const { makeStudentActive, resetActiveStudent, studentList } = useContext(StudentFormContext)
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
