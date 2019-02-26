import axios from 'axios';

import {
  REPORTS_GET_STARTED,
  REPORTS_GET_FINISHED,
  REPORTS_GET_ERROR
} from './reportsTypes';

export const reportsError = error => {
  return {
    type: REPORTS_GET_ERROR,
    payload: error
  };
};

export const getReport = reportType => dispatch => {
  dispatch({ type: REPORTS_GET_STARTED });

  const authData = { authorization: localStorage.getItem('token') };
  axios
    .get('/api/discounts', { headers: authData, params: { sort: reportType } })
    .then(response => {
      return dispatch({
        type: REPORTS_GET_FINISHED,
        payload: response.data.result
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        return dispatch(reportsError(error.response.data.result));
      }
      if (error.response && error.response.status === 401) {
        return dispatch(reportsError('Ошибка авторизации пользователя'));
      }
      return dispatch(reportsError('Внутренняя ошибка сервера!'));
    });
};
