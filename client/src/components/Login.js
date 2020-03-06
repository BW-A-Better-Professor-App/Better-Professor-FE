import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components'


const Login = () => {
  const history = useHistory();

  const [ login, setLogin ] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    setLogin({
      ...login, 
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log('what are we posting to login: ', login);
    axiosWithAuth()
      .post('/auth/login', login)
      .then(res => {
        console.log('this is the response from post: ', res);
        console.log("token", res.data.token)
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('id', res.data.id);
        window.localStorage.setItem('welcome', res.data.message);
        history.push('/dashboard');
      })  
      .catch(err => {
        console.log('there was an error with login: ', err)
      });

  }
  return (
    <Container>
			<form className='' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='username'
          name='username'
          value={login.username}
          label='username'
          onChange={handleChange}
          className='input'
        />
        <input
          type='password'
          placeholder='password'
          name='password'
          value={login.password}
          label='password'
          onChange={handleChange}
          className=''
        />
        <button className=''>Login</button>
        <div className="extra-options">
          <Link to= '/Login/Student' className="FormField_Link">Not a Teacher? Login As Student Here</Link>
        </div>
      </form>
      </Container>
  );
};

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
export default Login;


