import axios from 'axios';

import {
  FRAUD_GET_STARTED,
  FRAUD_GET_FINISHED,
  FRAUD_GET_ERROR,
  FRAUD_SET_DATE
} from './fraudTypes';

export const fraudError = error => {
  return {
    type: FRAUD_GET_ERROR,
    payload: error
  };
};

export const setFraudPeriod = fraudPeriod => dispatch => {
  dispatch({ type: FRAUD_SET_DATE, payload: fraudPeriod });
  return dispatch(getFraud());
};

export const getFraud = () => (dispatch, getState) => {
  const curState = getState().fraudStore;
  dispatch({ type: FRAUD_GET_STARTED });

  const params = { period: curState.period };

  const authData = { authorization: localStorage.getItem('token') };
  axios
    .get('/api/discounts/fraud', { headers: authData, params })
    .then(response => {
      return dispatch({
        type: FRAUD_GET_FINISHED,
        payload: response.data.result
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        return dispatch(fraudError(error.response.data.result));
      }
      if (error.response && error.response.status === 401) {
        return dispatch(fraudError('Ошибка авторизации пользователя'));
      }
      return dispatch(fraudError('Внутренняя ошибка сервера!'));
    });
};
