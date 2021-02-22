import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Login from './Login/Login';
import style from './Auth.module.css';
import SignUp from './SignUp/SignUp';

function Auth() {
  const { authError } = useSelector((state) => state.auth);
  const [isSignup, setisSignup] = useState(false);
  const signUpHandler = () => setisSignup(true);
  const logInHandler = () => setisSignup(false);
  return (
    <div className={`${style.wrapper}`}>
    <div className={`${style.formContent}`}>
        <h2
        className={isSignup ? `${style.inactive} ${style.underlineHover}` : `${style.active}`}
        onClick={logInHandler}
        > Log In </h2>
        <h2
        className={isSignup ? `${style.active}` : `${style.inactive} ${style.underlineHover}`}
        onClick={signUpHandler}
        >Sign Up </h2>
        {isSignup ? <SignUp/> : <Login/>}
        <div className={style.error}>
          {authError && authError}
        </div>
    </div>
    </div>
  );
}

export default Auth;
