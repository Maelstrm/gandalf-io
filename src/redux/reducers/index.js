import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import shelf from './shelfReducer';

const store = combineReducers({
  user,
  login,
  shelf,
});

export default store;
