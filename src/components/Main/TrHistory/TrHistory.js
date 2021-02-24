/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mainSortDownAC, mainSortUpAC, mainTrHistoryFetchAC } from '../../../redux/actionCreators/mainAC';
import TrHistoryPoint from './TrHistoryPoint/TrHistoryPoint';
import style from './TrHistory.module.css';

function TrHistory({ token }) {
  const dispatch = useDispatch();
  const { trHistory } = useSelector((state) => state.main);
  const { balance } = useSelector((state) => state.main);

  const [debit, setDebit] = useState(0);
  const [credit, setCredit] = useState(0);

  const sumResult = () => {
    if (trHistory || trHistory.length > 0) {
      let dbRes = 0;
      let cdRes = 0;
      trHistory.forEach((point) => {
        point.amount > 0 ? dbRes += point.amount : cdRes += point.amount;
      });
      setDebit(dbRes);
      setCredit(cdRes);
    }
  };

  useEffect(() => {
    dispatch(mainTrHistoryFetchAC(token));
  }, [token]);

  useEffect(() => {
    sumResult();
  }, [trHistory]);

  const sortDownHandler = (event) => {
    dispatch(mainSortDownAC(event.target.name));
  };
  const sortUpHandler = (event) => {
    dispatch(mainSortUpAC(event.target.name));
  };
  return (
    <>
    { (!trHistory || trHistory.length === 0)
    && 'You have not made any transactions yet'}
    { (trHistory || trHistory.length > 0)
    && (
    <table className={style.tableTrn}>
      <thead className={style.tableHeader}>
      <tr>
        <td></td>
        <td>
          <div className={style.sortTd}>
          <span>Date</span>
          <span>
            <input className={style.sortInp} type='button' value='&#11014;' name='id' onClick={sortUpHandler}/>
            <input className={style.sortInp} type='button' value='&#11015;' name='id' onClick={sortDownHandler}/>
          </span>
          </div>
        </td>
        <td>Username</td>
        <td>
        <div className={style.sortTd}>
          <span>Debit</span>
          <span>
            <input className={style.sortInp} type='button' value='&#11014;' name='amount' onClick={sortUpHandler}/>
            <input className={style.sortInp} type='button' value='&#11015;' name='amount' onClick={sortDownHandler}/>
          </span>
        </div>
        </td>
        <td>
        <div className={style.sortTd}>
          <span>Credit</span>
          <span>
            <input className={style.sortInp} type='button' value='&#11014;' name='amount' onClick={sortUpHandler}/>
            <input className={style.sortInp} type='button' value='&#11015;' name='amount' onClick={sortDownHandler}/>
          </span>
        </div>
        </td>
        <td>Balance</td>
      </tr>
      </thead>
      <tbody>
        {trHistory.map((point) => <TrHistoryPoint key={point.id} point={point}/>)}
      </tbody>
      <tfoot className={style.tableHeader}>
        <tr>
        <td colSpan='3'>Total:</td>
        <td>{debit}</td>
        <td>{credit}</td>
        <td>{balance}</td>
        </tr>
      </tfoot>
    </table>)}
    </>
  );
}

export default TrHistory;
