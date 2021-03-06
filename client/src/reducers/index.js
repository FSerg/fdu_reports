import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reportsReducer from './reportsReducer';
import chequesReducer from './chequesReducer';
import statsReducer from './statsReducer';
import salesReducer from './salesReducer';
import fraudReducer from './fraudReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  auth: authReducer,
  reportsStore: reportsReducer,
  chequesStore: chequesReducer,
  statsStore: statsReducer,
  salesStore: salesReducer,
  fraudStore: fraudReducer,
  modal: modalReducer
});
