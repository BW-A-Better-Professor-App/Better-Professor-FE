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
import cuid from 'cuid';

// import data from './data.js'


const MessageList = props => {
  const id = parseInt(localStorage.getItem('id'),10);
    const { messages } = useContext(StudentFormContext)

    // const [students, setStudents] =  useState([])
    const history = useHistory();
    console.log("this is the message list from context to messagelist.js", messages)





    return (

      <TableContainer className="table_container" component={Paper}>
        <Table  size="small" aria-label="a dense table">
          <TableHead className="table_head">
            <TableRow>
              <TableCell align="center">My Project Messages</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>

                {messages.map(message => (
                  <TableRow key={cuid()}>
                  
                    <TableCell>{message.message_from_prof}</TableCell> 
                    </TableRow>
                  
                
                

                
              
            ))}
           
          </TableBody>
        </Table>
      </TableContainer>
    );

}
export default MessageList;


