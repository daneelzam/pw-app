import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mainUserListFetchAC } from '../../../redux/actionCreators/mainAC';
import style from './Transaction.module.css';

function Transaction({ token }) {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.main);
  const [inputs, setInputs] = useState({ username: '' });
  const { username } = inputs;
  const searchRef = useRef();
  const searchHandler = () => {
    searchRef.current.style.display = 'block';
    console.log(searchRef.current.style.display);
  };
  const inputsHandler = ({ target: { name, value } }) => {
    if (name) {
      return setInputs((prevState) => ({ ...prevState, [name]: value }));
    }
    return setInputs((prevState) => ({ ...prevState, username: value }));
  };
  useEffect(() => {
    dispatch(mainUserListFetchAC(token, username));
  }, [token, username]);
  return (
    <form>
    <input
      type="text"
      name="username"
      className={`${style.formTextInp}`}
      placeholder="name"
      value={username}
      onChange={inputsHandler}
      onFocus={searchHandler}
    />
    <select ref={searchRef} multiple className={`${style.formTextSearch}`} onClick={inputsHandler}>
    { userList && userList.length > 0
      && userList.map((user) => (<option>{user.name}</option>))
    }
    </select>
    <input
      type="submit"
      className={`${style.btn}`}
      value="Send PW"
    />
    </form>
  );
}

export default Transaction;
