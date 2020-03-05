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
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  professor_id: id,
}

const EditTaskForm = props => {
  const { setEditing, taskToEdit, setTaskToEdit } = useContext(StudentFormContext)
  const classes = useStyles();
  const student_id = activeStudent.id
  
  const [open, setOpen] = useState(false);
  
  const studentArrayLength = 0;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    editStudent(event.target.value);
  };

  useEffect(()=> {
   
    // const studentToEdit= studentList.find(student => student.student_id === activeStudent.id);
    console.log("Student to update", activeStudent);

    if(activeStudent) {
      setEditStudent(activeStudent);
      console.log("Student to update", activeStudent);

    }

  }, [studentList, activeStudent])

  
  const FormSubmit = (e) => {
    e.preventDefault()
    console.log("These are values", editStudent);
    // setStudentInfo({...studentInfo, professor_id: {id} })
    axiosWithAuth()
    //register student to api with pot
      .put(`/students/${activeStudent.student_id}`, editStudent)
      .then(res => {
        console.log("response from put: ", res);
        setStudentList(studentList);
        setEditing(true);
        handleClose()
        })
        .catch(error => console.log(error.response, "Didn't work"));

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <button type="button" onClick={handleOpen}>
          Edit Student
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
                Edit student
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
                        autoComplete="firstname"
                        name="firstname"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEditStudent({...editStudent, firstname: e.target.value})}
                        value={editStudent.firstname}
                        id="firstname"
                        label="student's first name"
                        autoFocus
                        helperText={
                          errors.firstname && touched.firstname
                            ? errors.firstname
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={errors.lastname && touched.lastname}
                        autoComplete="lastname"
                        name="lastname"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEditStudent({...editStudent, lastname: e.target.value})}
                        value={editStudent.lastname}
                        id="lastname"
                        label="student's last name"
                        autoFocus
                        helperText={
                          errors.lastname && touched.lastname
                            ? errors.lastname
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={errors.email && touched.email}
                        autoComplete="email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEditStudent({...editStudent, email: e.target.value})}
                        value={editStudent.email}
                        id="email"
                        label="student's email"
                        autoFocus
                        helperText={
                          errors.email && touched.email
                            ? errors.email
                            : null
                        }
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                  <TextField
                    error={errors.username && touched.username}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setEditStudent({...editStudent, username: e.target.value})}
                    value={editStudent.username}
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.password && touched.password}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setEditStudent({...editStudent, password: e.target.value})}
                    value={editStudent.password}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                  />
                </Grid> */}
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
                    Edit Student
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

export default EditStudentForm;