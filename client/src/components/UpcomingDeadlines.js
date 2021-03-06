import React, { useEffect, useState, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { StudentFormContext } from "../contexts/StudentFormContext";

import Moment from "react-moment";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";

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
    minWidth: 550
  }
});

function createData(Name, Task, DueDate) {
  return { Name, Task, DueDate };
}

export default function UpcomingDeadlines() {
  const { deadlines } = useContext(StudentFormContext);

  if (!Array.isArray(deadlines)) {
    return (
      <div>
        <h2>No array</h2>
      </div>
    );
  } else {
    console.log("This is the deadlines", deadlines);

    return (
      <TableContainer className="table_container" component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead className="table_head">
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Task</TableCell>
              <TableCell align="center">Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deadlines.map(deadline => (
              <TableRow key={deadline.task_id}>
                <TableCell align="center">
                  {deadline.firstname} {deadline.lastname}{" "}
                </TableCell>
                <TableCell align="center">{deadline.task}</TableCell>
                <TableCell align="center">
                  <Moment add={{ days: 1 }} format="MM/DD/YYYY">
                    {deadline.due_date}
                  </Moment>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
