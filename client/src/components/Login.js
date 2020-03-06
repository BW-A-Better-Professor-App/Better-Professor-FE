import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

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
    <div>
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
		</div>
  );
};

export default Login;


