import { AUTH_ERROR, AUTH_LOGOUT, AUTH_OK } from '../types';

const windowState = JSON.parse(window.localStorage.getItem('state'));
let preloadedState = {};
if (windowState && windowState.auth) {
  preloadedState = {
    isAuth: windowState.auth.isAuth,
    authError: null,
    token: windowState.auth.token
  };
} else {
  preloadedState = {
    isAuth: false,
    authError: null,
    token: ''
  };
}

const authReducer = (state = preloadedState, action) => {
  switch (action.type) {
    case AUTH_OK:
      return {
        ...state, isAuth: true, authError: null, token: action.payload
      };
    case AUTH_LOGOUT:
      window.localStorage.removeItem('state');
      return {
        ...state, isAuth: false, authError: null, token: ''
      };
    case AUTH_ERROR:
      return {
        ...state, authError: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
