import { combineReducers } from 'redux';
import authRedicer from './authReducer';
import mainReducer from './mainReducer';

const rootReducer = combineReducers({
  auth: authRedicer,
  main: mainReducer
});

export default rootReducer;
