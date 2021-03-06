import {
  MAIN_CREATE_TRANSACTION,
  MAIN_ERROR,
  MAIN_LOGOUT,
  MAIN_SORT_HISTORY_DOWN,
  MAIN_SORT_HISTORY_UP,
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

const mainReducer = (state = preloadedState, action) => {
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
    case MAIN_CREATE_TRANSACTION:
      return {
        ...state,
        balance: action.payload
      };
    case MAIN_SORT_HISTORY_DOWN:
      return {
        ...state,
        trHistory: state.trHistory.sort((a, b) => a[action.payload] - b[action.payload])
      };
    case MAIN_SORT_HISTORY_UP:
      return {
        ...state,
        trHistory: state.trHistory.sort((a, b) => b[action.payload] - a[action.payload])
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

export default mainReducer;
