import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { authLogoutAC } from '../../redux/actionCreators/authAC';
import { mainLogoutAC, userInitFetchAC } from '../../redux/actionCreators/mainAC';
import style from './Main.module.css';
import NavBar from './NavBar/NavBar';
import Transaction from './Transaction/Transaction';
import TrHistory from './TrHistory/TrHistory';

function Main() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { mainError, name, balance } = useSelector((state) => state.main);
  const logoutHandler = () => {
    dispatch(authLogoutAC());
    dispatch(mainLogoutAC());
  };
  useEffect(() => {
    dispatch(userInitFetchAC(token));
  }, [token]);

  return (
  <main className={style.wrapper}>
  <div className={style.content}>
    {mainError
    && <div className={style.error}>{mainError}</div>}
    <input
      type="submit" className={style.btn} value="Logout" onClick={logoutHandler}
    />
    { name && <div>{name}</div>}
    { balance && <div>balance: {balance}</div>}
    <Router>
      <NavBar/>
      <Switch>
        <Route path='/history'><TrHistory token={token}/></Route>
        <Route path='/newtransaction'><Transaction token={token}/></Route>
      </Switch>
    </Router>
  </div>
  </main>
  );
}

export default Main;
