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
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  professor_id: id,
}

const AddStudent = props => {
  const { setAdding, adding, setIsActive } = useContext(StudentFormContext)
  const classes = useStyles();
  const [studentInfo, setStudentInfo] = useState(initialValues)
  
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setStudentInfo(event.target.value);
  };

  const FormSubmit = (e) => {
    e.preventDefault()
    console.log("These are values", studentInfo);
    axiosWithAuth()
    //register student to api with post
      .post(`/students`, studentInfo)
        .then(res => {
          console.log("success", res);
          console.log("this is response from add student", res)
          setIsActive(false);
          setAdding(!adding)
          handleClose()
        })
        .catch(error => console.log(error.response, "Didn't work"));

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <button type="button" onClick={handleOpen}>
          Add Student
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
                Add student
              </Typography>
              <Formik
                validationSchema={SignupSchema}
                onSubmit={(e)=> FormSubmit()}
              >
              {({ errors,  touched }) => (
                <Form className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        error={errors.firstname && touched.firstname}
                        autoComplete="firstname"
                        name="firstname"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setStudentInfo({...studentInfo, firstname: e.target.value})}
                        value={studentInfo.firstname}
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
                        onChange={(e) => setStudentInfo({...studentInfo, lastname: e.target.value})}
                        value={studentInfo.lastname}
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
                        onChange={(e) => setStudentInfo({...studentInfo, email: e.target.value})}
                        value={studentInfo.email}
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
                    <Grid item xs={12}>
                  <TextField
                    error={errors.username && touched.username}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setStudentInfo({...studentInfo, username: e.target.value})}
                    value={studentInfo.username}
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="uname"
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
                    onChange={(e) => setStudentInfo({...studentInfo, password: e.target.value})}
                    value={studentInfo.password}
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
                    Add Student
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

export default AddStudent;