import React from 'react';

function TrHistoryPoint({ point }) {
  const newDate = new Date(point.date);
  const currDate = new Date();
  const currTimezone = currDate.getTimezoneOffset() / 60;

  return (
        <tr>
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
