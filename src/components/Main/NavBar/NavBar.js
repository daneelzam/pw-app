import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './NavBar.module.css';

function NavBar() {
  const location = useLocation();
  return (
        <nav>
            <Link to='/history' className={
                location.pathname === '/history'
                  ? `${style.active}`
                  : `${style.inactive} ${style.underlineHover}`
            }>History</Link>
            <Link to='/newtransaction' className={
                location.pathname === '/newtransaction'
                  ? `${style.active}`
                  : `${style.inactive} ${style.underlineHover}`
            }>New transaction</Link>
        </nav>
  );
}

export default NavBar;
