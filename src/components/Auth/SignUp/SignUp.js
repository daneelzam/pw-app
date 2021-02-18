import React, { useState } from 'react';
import style from './SignUp.module.css';

function SignUp() {
  const [inputs, setInputs] = useState({ email: '', password: '', userName: '' });
  const { email, password, userName } = inputs;
  const inputsHandler = ({ target: { name, value } }) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
        <form>
        <input
          type="text"
          name="userName"
          className={`${style.formTextInp}`}
          placeholder="name"
          value={userName}
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
          value="Sing Up"
        />
        </form>
  );
}

export default SignUp;
