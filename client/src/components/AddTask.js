import React, {useState, useEffect, useContext} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

import { StudentFormContext } from '../contexts/StudentFormContext';

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import { Formik, Form } from "formik";
import * as  yup from "yup";

let SignupSchema = yup.object().shape({
  firstname: yup.string().required("This field is required."),
  lastname: yup.string().required("This field is required."),
  email: yup.string().email('Invalid email address').required('Required'),
  username: yup.string().required("This field is required."),
  password: yup
    .string()
    .min(6, "Password is too short.")
    .max(20, "Password is too long.")
    .required("This field is required.")
});

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
const id = parseInt(localStorage.getItem('id'),10);
const initialValues = {
  student: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  professor_id: id,
}

const AddTask = props => {
  const { setAddingTask, activeStudent } = useContext(StudentFormContext)
  const classes = useStyles();
  const [newTask, setNewTask] = useState({
    professor_id: id,
    student_id: activeStudent.student_id,
    task:"",
    due_date: Date()

  })
  
  const [open, setOpen] = useState(false);
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setNewTask(event.target.value);
  };

  const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate()+1),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  // const dateFormatter = (newTask) = {

  //   // console.log("this is task to format: ", newTask)





   
  //   return formmattedDate

  // }
  const FormSubmit = (e) => {
    e.preventDefault()

    const formattedTask = {
      ...newTask,
      due_date: formatDate(newTask.due_date)
    }
    console.log("These are values to be submitted for task", formattedTask);
    axiosWithAuth()
    //register student to api with pot
      .post(`/tasks`, newTask)
        .then(res => {
          console.log("success posting task", res);
          console.log("this is response from adding task", res)
          setAddingTask(true)
          setNewTask({
            professor_id: id,
            student_id: activeStudent.student_id,
            task:"",
            due_date: Date()

          })
          handleClose()
        })
        .catch(error => console.log(error.response, "Didn't work"));

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <button type="button" onClick={handleOpen}>
          Add Task
        </button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Add Task
              </Typography>
              <Formik
                validationSchema={SignupSchema}
                onSubmit={(e)=> FormSubmit()}
              >
              {({ errors, handleChange, touched, status }) => (
                <Form className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        error={errors.firstname && touched.firstname}
                        autoComplete="task"
                        name="task"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setNewTask({...newTask, task: e.target.value})}
                        value={newTask.task}
                        id="task"
                        label="task"
                        autoFocus
                        helperText={
                          errors.task && touched.task
                            ? errors.task
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={errors.date && touched.date}
                        autoComplete="date"
                        name="date"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setNewTask({...newTask, due_date: e.target.value})}
                        value={newTask.date}
                        id="date"
                        label="Select Date"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        defaultValue="05-24-2020"
                        autoFocus
                        helperText={
                          errors.date && touched.date
                            ? errors.date
                            : null
                        }
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={FormSubmit}
                    onSubmit={handleClose}
                  >
                    Add Task
                  </Button>
                </Form>
              )}
              </Formik>
            </div>
          </Fade>
        </Modal>
      </div>
    </Container>
  );
};

export default AddTask;