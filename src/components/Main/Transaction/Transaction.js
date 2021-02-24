import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { mainCreateTrnFetchAC, mainUserListFetchAC } from '../../../redux/actionCreators/mainAC';
import style from './Transaction.module.css';

function Transaction({ token }) {
  const location = useLocation();

  const dispatch = useDispatch();
  const { userList, balance } = useSelector((state) => state.main);
  const [inputs, setInputs] = useState({ username: '', sum: '' });
  const { username, sum } = inputs;

  useEffect(() => {
    dispatch(mainUserListFetchAC(token, username));
  }, [token, username]);

  useEffect(() => {
    if (location.state && location.state.defName && -location.state.defSum) {
      setInputs({ username: location.state.defName, sum: -location.state.defSum });
    }
  }, []);

  const inputsHandler = ({
    target: {
      name, value
    }
  }) => setInputs((prevState) => ({ ...prevState, [name]: value }));

  const trnHandler = (event) => {
    event.preventDefault();
    dispatch(mainCreateTrnFetchAC(token, username, sum));
    setInputs({ username: '', sum: '' });
  };

  return (
    <form onSubmit={trnHandler}>

    <input type="search" list='filter' name="username" placeholder="name"
      className={`${style.formTextInp}`} value={username} onChange={inputsHandler} />

    <datalist id='filter'>
    { userList && userList.length > 0
      && userList.map((user) => (<option key={user.id}>{user.name}</option>))
    }
    </datalist>

    <input type="number" min='1' max={balance} name="sum" placeholder="sum"
      className={`${style.formTextInp}`} value={sum} onChange={inputsHandler} />

    <input type="submit" className={`${style.btn}`} value="Send PW" />

    </form>
  );
}

export default Transaction;
