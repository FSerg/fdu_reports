import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reportsReducer from './reportsReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  auth: authReducer,
  reportsStore: reportsReducer,
  modal: modalReducer
});
