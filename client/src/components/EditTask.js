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
  task: yup.string().required("This field is required."),
  due_date: yup.string().required("This field is required.")
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
  task: "",
  due_date: Date.now(),
  
}

const EditTaskForm = ({task}) => {
  const { setTaskEditing, studentList, activeStudent, setStudentList } = useContext(StudentFormContext)
  const classes = useStyles();
  const [edittedTask, setEditedTask] = useState(initialValues)
  const student_id = activeStudent.student_id
  
  const [open, setOpen] = useState(false);
  
  const studentArrayLength = 0;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleChange = event => {
  //   console.log("student editing", edittedTask)
  //   edittedTask(event.target.value);
  // };
 
   
 

  useEffect(()=> {


    if(task) {
      setEditedTask({
        task: task.task,
        due_date: task.due_date
      
      });
      console.log("task to update", task);

    }

  }, [])

  
  const FormSubmit = (e) => {
    e.preventDefault()
   
    console.log("These are values", edittedTask);
   
    // setStudentInfo({...studentInfo, professor_id: {id} })
    axiosWithAuth()
    //register student to api with pot
      .put(`/tasks/${task.task_id}`, edittedTask)
      .then(res => {
        console.log("response from put: ", res);
        
      
        setTaskEditing(true)
        handleClose();
        })
        .catch(error => {
          console.log(error.response, "Didn't work There was error")
        });

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <button type="button" onClick={handleOpen}>
          Edit Task
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
                Edit Task
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
                        error={errors.task && touched.task}
                        autoComplete="task"
                        name="task"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEditedTask({...edittedTask, task: e.target.value})}
                        value={edittedTask.task}
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

                    {/* {/* <Grid item xs={12}>
                  <TextField
                    error={errors.username && touched.username}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setEditedTask({...edittedTask, username: e.target.value})}
                    value={edittedTask.username}
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    helperText={
                      errors.username && touched.username
                        ? errors.username
                        : null
                    }
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    error={errors.due_date && touched.due_date}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setEditedTask({...edittedTask, due_date: e.target.value})}
                    value={edittedTask.due_date}
                    name="due_date"
                    label="due_date"
                    type="date"
                    id="due_date"
                    autoComplete=""
                    helperText={
                      errors.due_date && touched.due_date
                        ? errors.due_date
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
                    Edit Task
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

export default EditTaskForm;