import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mainTrHistoryFetchAC } from '../../../redux/actionCreators/mainAC';

function TrHistory({ token }) {
  const dispatch = useDispatch();
  const { trHistory } = useSelector((state) => state.main);
  useEffect(() => {
    dispatch(mainTrHistoryFetchAC(token));
  }, [token]);
  return (
        <div>
            {!trHistory || trHistory.length === 0 ? 'You have not made any transactions yet' : trHistory}
        </div>
  );
}

export default TrHistory;
