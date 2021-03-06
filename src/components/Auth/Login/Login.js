import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginFetchAC } from '../../../redux/actionCreators/authAC';
import style from './Login.module.css';

function Login() {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({ email: '', password: '' });
  const { email, password } = inputs;
  const inputsHandler = ({ target: { name, value } }) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(loginFetchAC({ email, password }));
  };
  return (
        <form onSubmit={submitHandler}>
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
          value="Log In"
        />
        </form>
  );
}

export default Login;
