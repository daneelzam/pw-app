import { AUTH_ERROR, AUTH_LOGOUT, AUTH_OK } from '../types';

export const authOkAC = (token) => ({ type: AUTH_OK, payload: token });
export const authLogoutAC = () => ({ type: AUTH_LOGOUT });
export const authErrorAC = (error) => ({ type: AUTH_ERROR, payload: error });

// redux-thunk
export const loginFetchAC = ({ email, password }) => (dispatch) => {
  fetch(`${process.env.REACT_APP_BASE_URL}/sessions/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then((responce) => {
    if (responce.status === 400 || responce.status === 401) {
      return responce.text();
    }
    return responce.json();
  }).then((serverData) => {
    if (serverData.id_token) {
      return dispatch(authOkAC(serverData.id_token));
    }
    return dispatch(authErrorAC(serverData));
  });
};

export const signUpFetchAC = ({ username, password, email }) => (dispatch) => {
  fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, email })
  }).then((responce) => {
    if (responce.status === 400) {
      return responce.text();
    }
    return responce.json();
  }).then((serverData) => {
    if (serverData.id_token) {
      return dispatch(authOkAC(serverData.id_token));
    }
    return dispatch(authErrorAC(serverData));
  });
};
