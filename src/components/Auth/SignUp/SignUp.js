import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpFetchAC } from '../../../redux/actionCreators/authAC';
import style from './SignUp.module.css';

function SignUp() {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({ email: '', password: '', username: '' });
  const { email, password, username } = inputs;
  const inputsHandler = ({ target: { name, value } }) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(signUpFetchAC({ username, password, email }));
  };
  return (
        <form onSubmit={submitHandler}>
        <input
          type="text"
          name="username"
          className={`${style.formTextInp}`}
          placeholder="name"
          value={username}
          onChange={inputsHandler}
        />
        <input
          type="email"
          name="email"
          className={`${style.formTextInp}`}
          placeholder="email"
          value={email}
          onChange={inputsHandler}
        />
        <input
          type="password"
          name="password"
          className={`${style.formTextInp}`}
          placeholder="password"
          value={password}
          onChange={inputsHandler}
        />
        <input
          type="submit"
          className={`${style.btn}`}
          value="Sing Up"
        />
        </form>
  );
}

export default SignUp;
