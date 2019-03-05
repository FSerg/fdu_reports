import axios from 'axios';

import {
  REPORTS_GET_STARTED,
  REPORTS_GET_FINISHED,
  REPORTS_GET_ERROR,
  REPORTS_NEXT_PAGE,
  REPORTS_PREV_PAGE,
  REPORTS_FIRST_PAGE,
  REPORTS_SET_TYPE
} from './reportsTypes';

export const reportsError = error => {
  return {
    type: REPORTS_GET_ERROR,
    payload: error
  };
};

export const getReportNextPage = () => dispatch => {
  dispatch({ type: REPORTS_NEXT_PAGE });
  return dispatch(getReport());
};

export const getReportPrevPage = () => dispatch => {
  dispatch({ type: REPORTS_PREV_PAGE });
  return dispatch(getReport());
};

export const getReportFirstPage = () => dispatch => {
  dispatch({ type: REPORTS_FIRST_PAGE });
  return dispatch(getReport());
};

export const setReportType = reportType => dispatch => {
  dispatch({ type: REPORTS_SET_TYPE, payload: reportType });
  return dispatch(getReport());
};

export const getReport = () => (dispatch, getState) => {
  const curState = getState().reportsStore;
  dispatch({ type: REPORTS_GET_STARTED });

  const params = {
    sort: curState.type,
    page: curState.page
  };

  const authData = { authorization: localStorage.getItem('token') };
  axios
    .get('/api/discounts', { headers: authData, params })
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
