import React, { useState } from 'react';
import style from './Login.module.css';

function Login() {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const { email, password } = inputs;
  const inputsHandler = ({ target: { name, value } }) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
        <form>
        <input
          type="email"
          name="email"
          className={`${style.formTextInp}`}
          placeholder="email"
          value={email}
          onChange={inputsHandler}
        />
        <input
          type="text"
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
