import React, { useState, } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Login from './Login'
import { Link } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

function Register(props) {

    let history = useHistory();

   

    // state for new user to be created
    const [newUser, setNewUser] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        // phone_number: ''
    });

    const [errorText, setErrorText] = useState('');
    const [successText, setSuccessText] = useState('');

    // input change handler
    const handleChange = (e) => {

        console.log("this is the newUser: ", newUser)

        // update new user state
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    }

    let cb = (user) => {
        if (user.username === "" ||
            user.password === "" ||
            // newUser.phone_number === "" ||
            user.email === "" ||
            user.firstname === "" ||
            user.lastname === "" ) {
            setErrorText("Please fill out all fields!");
        }
        else if (user.username.length < 4 || user.username.length > 12) {
            setErrorText("Your username must be at least 4 characters, and no longer than 12.");
            return;
        }
        else if (user.password.length < 4 || user.password.length >= 32) {
            setErrorText("Your password must be between 4 and 32 characters.")
            return;
        }
  

        axiosWithAuth()
        .post('/auth/register', user)
            .then((res) => {
                console.log("this is registration response: ", res);
                setNewUser({
                    username: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                });
                console.log("token", res.data.payload)
                window.localStorage.setItem('token',)
                setSuccessText('Success...');
                history.push(`/Login`);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return (
        <Container>

            <div>
            </div>

            <h3>Create a New Account</h3>

            {/* Register Form */}
            <form onSubmit={(e) => {
                e.preventDefault();

                cb(newUser);
            }}>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={newUser.firstname}
                    onChange={handleChange}
                    autoComplete="off"
                />
                 <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={newUser.lastname}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={handleChange}
                    autoComplete="off"
                />
                {/* <input
                    type="tel"
                    name="phone_number"
                    placeholder="Phone #"
                    value={newUser.phone_number}
                    onChange={handleChange}
                    autoComplete="off"
                /> */}
                <button type="submit">Register</button>
                <div className="extra-options">
                    <Link to= './Login' className="FormField_Link">Already have an account? Login</Link>
                </div>
                {errorText && <p>{errorText}</p>}
            </form>

        </Container >
    )
}

const Container = styled.div`
    color: #444444;
    h3 {
        font-size: 2.5rem;
        font-weight: 700;
        letter-spacing: 0.1rem;
        padding-bottom: 1rem;
        border-bottom: 1px dotted #444444;
        margin-bottom: 5%;
        text-align: center;
        @media (max-width: 400px) {
            font-size: 2rem;
        }
    }
    
    /* Registration form styling */
    form {
        padding: 2.5rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        /* Input styling */
        input {
            margin: 0.5rem 0;
            width: 20rem;
            height: 3.5rem;
            background: #bfbfbf;
            border: none;
            border-radius: 0.3rem;
            padding: 0.5rem 0.5rem 0.5rem 1rem;
            font-size: 1.2rem;
            font-weight: 300;
            letter-spacing: 0.1rem;
        
            &:focus {
                outline: none;
                border: 1px solid #ababab;
            }
        }
        
        /* Button Styling */
        button {
            width: 20rem;
            height: 3.5rem;
            margin: 1rem 0;
            background: #d1ffd6;
            border: none;
            border-radius: 0.3rem;
            transition: all 100ms;
            box-shadow: 0px 2px 5px -5px;
            letter-spacing: 0.1rem;
        
            &:hover {
                transition: background 100ms;
                cursor: pointer;
                background: #afdeb4;
            }
        }
        /* Login if already registered */
        .extra-options {
            margin: 1rem 0;
            width: 80%;
            display: flex;
            justify-content: center;
            span {
                color: black;
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
`;

export default Register;
