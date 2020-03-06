import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { StudentFormContext } from '../contexts/StudentFormContext';



import { axiosWithAuth } from '../utils/axiosWithAuth';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';





const MessageList = ({task}) => {
  const id = parseInt(localStorage.getItem('id'),10);
  const { messages, activeStudent, setTaskEditing } = useContext(StudentFormContext)


  const history = useHistory();
  console.log("this is the message list from context to messagelist.js", messages)


  const filteredMessage = messages.filter(message => message.task_id === task.task_id);
  console.log("this is the filtered messages by task", filteredMessage)

  const deleteMessage = (ev, message) => {
    ev.preventDefault()
    const token = window.localStorage.getItem('token')
    console.log("task trying to delete: ", message)

    axiosWithAuth()
    .delete(`/messages/${message.id}`)
    .then(res => {
      alert("Deleted Message")
      console.log("this is the response of delete task: ", res)
      setTaskEditing(true);
    })
    .catch(err => alert("Error couldn't delete: ", err))

  }

  return (

    <TableContainer className="table_container" component={Paper}>
      <Table  size="small" aria-label="a dense table">
        <TableHead className="table_head">
          <TableRow>
            <TableCell align="center">My Project Messages</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMessage.map(message => (
            <TableRow key={message.id}>
              <TableCell>{message.message}</TableCell>
              <button onClick={ev => deleteMessage(ev, message)}>Delete Message</button> 
              </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
  );

}
export default MessageList;


