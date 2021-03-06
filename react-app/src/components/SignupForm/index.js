import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signupForm.css'

const SignUpForm = ({setShowModal}) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  // const onSignUp = async (e) => {
  //   e.preventDefault();
  //   if (password === repeatPassword) {
  //     const data = await dispatch(signUp(username, email, password, repeatPassword));
  //     if (data) {
  //       setErrors(data)
  //     }
  //   }
  // };

  const onSignUp = async (e) => {
    e.preventDefault();

    const data = await dispatch(signUp(username, email, password, repeatPassword));
    if (data?.errors) setErrors(data?.errors)
    if (data) {
      setErrors(data)
    }

  };


  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp} className='signup_form'>
      <div>
        {errors.map((error, ind) => (
          <div className='errors' key={ind}>{error}</div>
        ))}
      </div>
      <div className='form-input'>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          placeholder='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className='form-input'>
        <label>Email</label>
        <input
          type='text'
          name='email'
          placeholder='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className='form-input'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          placeholder='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className='form-input'>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          placeholder='repeat password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          // required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
