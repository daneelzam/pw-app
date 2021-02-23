/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mainTrHistoryFetchAC } from '../../../redux/actionCreators/mainAC';
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

  return (
    <>
    { (!trHistory || trHistory.length === 0)
    && 'You have not made any transactions yet'}
    { (trHistory || trHistory.length > 0)
    && (
    <table className={style.tableTrn}>
      <thead className={style.tableHeader}>
      <tr>
        <td>Date</td>
        <td>Username</td>
        <td>Debit</td>
        <td>Credit</td>
        <td>Balance</td>
      </tr>
      </thead>
      <tbody>
        {trHistory.map((point) => <TrHistoryPoint key={point.id} point={point}/>)}
      </tbody>
      <tfoot className={style.tableHeader}>
        <tr>
        <td colSpan='2'>Total:</td>
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
