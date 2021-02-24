import React from 'react';
import { Link } from 'react-router-dom';
import style from './TrHistoryPoint.module.css';

function TrHistoryPoint({ point }) {
  const newDate = new Date(point.date);
  const currDate = new Date();
  const currTimezone = currDate.getTimezoneOffset() / 60;

  return (
        <tr>
            {point.amount < 0
              ? (
                <td className={style.linkRes}><Link to={{
                  pathname: '/newtransaction',
                  state: { defName: point.username, defSum: point.amount }
                }}>&#8618;</Link></td>
              )
              : (
                <td></td>
              )
            }
            <td>{newDate.toLocaleDateString('ru', {
              timezone: `UTC${-currTimezone}`,
              hour: 'numeric',
              minute: 'numeric'
            })}</td>
            <td>{point.username}</td>
            {point.amount > 0
              ? (
                <><td>{point.amount}</td>
                <td>{'-'}</td></>
              )
              : (
                <><td>{'-'}</td>
                <td>{point.amount}</td></>
              )
            }
            <td>{point.balance}</td>
        </tr>
  );
}

export default TrHistoryPoint;
