import React, { useEffect, useState } from 'react';
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


const StyledBtn = styled.div`
background: rgba(61, 90, 241, 0.5);
border-radius: 30px;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 42px;
color: #000000;
`;

const useStyles = makeStyles({
    table: {
      minWidth: 550,
    },
  });

  function createData(Name, Task, DueDate) {
    return { Name, Task, DueDate};
  }

  const rows = [
    createData('Johm Smith','Review Term Paper', "March 10th"  ),
    createData('Johm burger','Review Term Paper', "March 11th"),
    createData('Johm hunger','Review Term Paper', "March 13th"),
    createData('Johm konmel','Review Term Paper', "March 14th"),
    createData('Johm hungt','Review Term Paper', "March 15th"),
  ];
  
export default function UpcomingDeadlines() {
        const [deadlines, setDeadlines] = useState([])

        useEffect(() => {
            console.log("get tasks coming");
            axiosWithAuth()
            .get(`/tasks`)
            .then(response => {
                
                console.log('this is the response from task get call', response)
                setDeadlines(response.data);
            })
            .catch(err => {
                console.log('unable to fetch task projects', err);
            })
        }, []);


        if(!Array.isArray(deadlines)){
            return(
               <div>
                   <h2>No array</h2>
               </div>

            )}else{

    // return(
    //     <div className='upcoming-deadlines'>
    //         {deadlines.map(deadline => (
    //             <div key={deadline.id}>
    //                 <h3> Student NAme{deadline.name}</h3>
    //                 <p> Due Date{deadline.duedate}</p>
    //             </div>
    //         ))}

    //     </div>
    // )
        // console.log("this is taskArray", taskArray)
    return (
        <TableContainer className="table_container" component={Paper}>
          <Table  size="small" aria-label="a dense table">
            <TableHead className="table_head">
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Task</TableCell>
                <TableCell align="center">Due Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

//               {rows.map(row => (
//                 <TableRow key={row.id}>
//                   {/* <TableCell component="th" scope="row">
//                     {row.name}
//                   </TableCell> */}
//                   <TableCell align="center">{row.Name}</TableCell>
//                   <TableCell align="center">{row.Task}</TableCell>
//                   <TableCell align="center">{row.DueDate}</TableCell>
//                   <TableCell align="center"><StyledBtn>View</StyledBtn></TableCell>

               {deadlines.map(deadline => (
                <TableRow key={deadline.task_id}>
                  <TableCell component="th" scope="row">
                    {/* {row.name} */}
                  </TableCell>
                  <TableCell align="right">{deadline.firstname}</TableCell>
                  <TableCell align="right">{deadline.task}</TableCell>
                  <TableCell align="right">{deadline.duedate}</TableCell>
                  <TableCell align="right"><StyledBtn>View</StyledBtn></TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
               }
}