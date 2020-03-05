import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import StudentCard from './StudentCard'
import { axiosWithAuth } from '../utils/axiosWithAuth';
// import data from './data.js'

const data = [
  { name: 'John Smith', email: 'john@gmail.com',  phone: '202-389-8765', task: 'Review Term Paper', Date: 'March 10th'},
  { name: 'John Smith', email: 'john@gmail.com' , phone: '202-389-8765', task: 'Review Term Paper', Date: 'March 10th'},
  { name: 'John Smith', email: 'john@gmail.com' , phone: '202-389-8765', task: 'Review Term Paper', Date: 'March 10th'},
  { name: 'John Smith', email: 'john@gmail.com' , phone: '202-389-8765', task: 'Review Term Paper', Date: 'March 10th'},
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
        <TableContainer className="table_container" component={Paper}>
        <Table  size="small" aria-label="a dense table">
          <TableHead className="table_head">
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Task</TableCell>
              <TableCell align="center">Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.id}>
                {/* <TableCell component="th" scope="row">
                  {row.name}
                </TableCell> */}
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.task}</TableCell>
                <TableCell align="center">{row.Date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}
