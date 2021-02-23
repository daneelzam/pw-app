import {
  MAIN_CREATE_TRANSACTION,
  MAIN_ERROR, MAIN_LOGOUT, MAIN_USER_HISTORY, MAIN_USER_INIT, MAIN_USER_LIST
} from '../types';

export const userInitAC = (id, name, email, balance) => ({
  type: MAIN_USER_INIT,
  payload: {
    id, name, email, balance
  }
});
export const mainTrHistoryAC = (trHistory) => ({ type: MAIN_USER_HISTORY, payload: trHistory });
export const mainUserListAC = (userList) => ({ type: MAIN_USER_LIST, payload: userList });
export const mainCreateTrnAC = (balance) => ({ type: MAIN_CREATE_TRANSACTION, payload: balance });
export const mainErrorAC = (error) => ({ type: MAIN_ERROR, payload: error });
export const mainLogoutAC = () => ({ type: MAIN_LOGOUT });

// redux-thunk
export const userInitFetchAC = (token) => (dispatch) => {
  fetch(`${process.env.REACT_APP_BASE_URL}/api/protected/user-info`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      if (res.status === 400 || res.status === 401) {
        return res.text();
      }
      return res.json();
    })
    .then((data) => {
      if (data.user_info_token) {
        return dispatch(userInitAC(
          data.user_info_token.id,
          data.user_info_token.name,
          data.user_info_token.email,
          data.user_info_token.balance
        ));
      }
      return dispatch(mainErrorAC(data));
    });
};

export const mainTrHistoryFetchAC = (token) => (dispatch) => {
  fetch(`${process.env.REACT_APP_BASE_URL}/api/protected/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      if (res.status === 401) {
        return res.text();
      }
      return res.json();
    }).then((data) => {
      if (data.trans_token) {
        dispatch(userInitFetchAC(token));
        return dispatch(mainTrHistoryAC(data.trans_token));
      }
      return dispatch(mainErrorAC(data));
    });
};

export const mainUserListFetchAC = (token, filter) => (dispatch) => {
  fetch(`${process.env.REACT_APP_BASE_URL}/api/protected/users/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ filter })
  }).then((res) => {
    if (res.status === 401) {
      return res.text();
    }
    return res.json();
  }).then((data) => {
    if (typeof data === 'object') {
      return dispatch(mainUserListAC(data));
    }
    return dispatch(mainUserListAC(''));
  });
};

export const mainCreateTrnFetchAC = (token, name, amount) => (dispatch) => {
  fetch(`${process.env.REACT_APP_BASE_URL}/api/protected/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, amount })
  }).then((res) => {
    if (res.status === 400 || res.status === 401) {
      return res.text();
    }
    return res.json();
  }).then((data) => {
    if (data.trans_token) {
      return dispatch(mainCreateTrnAC(data.trans_token.balance));
    }
    return dispatch(mainErrorAC(data));
  });
};
