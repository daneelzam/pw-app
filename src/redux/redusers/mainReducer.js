import {
  MAIN_ERROR,
  MAIN_LOGOUT,
  MAIN_USER_HISTORY,
  MAIN_USER_INIT,
  MAIN_USER_LIST
} from '../types';

const windowState = JSON.parse(window.localStorage.getItem('state'));
let preloadedState = {};
if (windowState && windowState.main) {
  preloadedState = {
    mainError: null,
    id: windowState.main.id,
    name: windowState.main.name,
    email: windowState.main.email,
    balance: windowState.main.balance,
    trHistory: windowState.main.trHistory,
    userList: windowState.main.userList
  };
} else {
  preloadedState = {
    mainError: null,
    id: '',
    name: '',
    email: '',
    balance: '',
    trHistory: '',
    userList: ''
  };
}

const authReducer = (state = preloadedState, action) => {
  switch (action.type) {
    case MAIN_USER_INIT:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        balance: action.payload.balance
      };
    case MAIN_USER_HISTORY:
      return {
        ...state,
        trHistory: action.payload
      };
    case MAIN_USER_LIST:
      return {
        ...state,
        userList: action.payload
      };
    case MAIN_ERROR:
      return {
        ...state,
        mainError: action.payload
      };
    case MAIN_LOGOUT:
      window.localStorage.removeItem('state');
      return {
        ...state,
        mainError: null,
        id: '',
        name: '',
        email: '',
        balance: '',
        trHistory: '',
        userList: ''
      };
    default:
      return state;
  }
};

export default authReducer;
