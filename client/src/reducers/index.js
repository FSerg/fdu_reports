import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reportsReducer from './reportsReducer';
import chequesReducer from './chequesReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  auth: authReducer,
  reportsStore: reportsReducer,
  chequesStore: chequesReducer,
  modal: modalReducer
});
