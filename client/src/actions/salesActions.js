import axios from 'axios';

import {
  SALES1_GET_STARTED,
  SALES1_GET_FINISHED,
  SALES1_GET_ERROR,
  SALES2_GET_STARTED,
  SALES2_GET_FINISHED,
  SALES2_GET_ERROR,
  SALES3_GET_STARTED,
  SALES3_GET_FINISHED,
  SALES3_GET_ERROR,
  SALES_SET_DATE,
  SALES_SET_CURRENT_ACCOUNTS,
  SALES_GET_ACCOUNTS_FINISHED
} from './salesTypes';

export const sales1Error = error => {
  return {
    type: SALES1_GET_ERROR,
    payload: error
  };
};
export const sales2Error = error => {
  return {
    type: SALES2_GET_ERROR,
    payload: error
  };
};
export const sales3Error = error => {
  return {
    type: SALES3_GET_ERROR,
    payload: error
  };
};

export const setCurrentPosAccounts = posAccounts => dispatch => {
  dispatch({ type: SALES_SET_CURRENT_ACCOUNTS, payload: posAccounts });
  dispatch(getSales1Stats());
  dispatch(getSales3Stats());
};

export const setStatsPeriod = salesPeriod => dispatch => {
  dispatch({ type: SALES_SET_DATE, payload: salesPeriod });
  dispatch(getSales1Stats());
  dispatch(getSales2Stats());
  dispatch(getSales3Stats());
};

export const getSales1Stats = () => (dispatch, getState) => {
  const curState = getState().salesStore;
  dispatch({ type: SALES1_GET_STARTED });

  const params = {
    period: curState.period,
    accounts: curState.current_accounts
  };

  const authData = { authorization: localStorage.getItem('token') };
  axios
    .get('/api/stats/sales1', { headers: authData, params })
    .then(response => {
      return dispatch({
        type: SALES1_GET_FINISHED,
        payload: response.data.result
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        return dispatch(sales1Error(error.response.data.result));
      }
      if (error.response && error.response.status === 401) {
        return dispatch(sales1Error('Ошибка авторизации пользователя'));
      }
      return dispatch(sales1Error('Внутренняя ошибка сервера!'));
    });
};

export const getSales2Stats = () => (dispatch, getState) => {
  const curState = getState().salesStore;
  dispatch({ type: SALES2_GET_STARTED });

  const params = {
    period: curState.period
  };

  const authData = { authorization: localStorage.getItem('token') };
  axios
    .get('/api/stats/sales2', { headers: authData, params })
    .then(response => {
      return dispatch({
        type: SALES2_GET_FINISHED,
        payload: response.data.result
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        return dispatch(sales2Error(error.response.data.result));
      }
      if (error.response && error.response.status === 401) {
        return dispatch(sales2Error('Ошибка авторизации пользователя'));
      }
      return dispatch(sales2Error('Внутренняя ошибка сервера!'));
    });
};

export const getSales3Stats = () => (dispatch, getState) => {
  const curState = getState().salesStore;
  dispatch({ type: SALES3_GET_STARTED });

  const params = {
    period: curState.period,
    accounts: curState.current_accounts
  };

  const authData = { authorization: localStorage.getItem('token') };
  axios
    .get('/api/stats/sales3', { headers: authData, params })
    .then(response => {
      return dispatch({
        type: SALES3_GET_FINISHED,
        payload: response.data.result
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        return dispatch(sales3Error(error.response.data.result));
      }
      if (error.response && error.response.status === 401) {
        return dispatch(sales3Error('Ошибка авторизации пользователя'));
      }
      return dispatch(sales3Error('Внутренняя ошибка сервера!'));
    });
};

export const getPosAccounts = () => dispatch => {
  const authData = { authorization: localStorage.getItem('token') };
  axios
    .get('/api/discounts/accounts', { headers: authData })
    .then(response => {
      return dispatch({
        type: SALES_GET_ACCOUNTS_FINISHED,
        payload: response.data.result
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        // return dispatch(statsError(error.response.data.result));
      }
      if (error.response && error.response.status === 401) {
        // return dispatch(statsError('Ошибка авторизации пользователя'));
      }
      console.log(error.response.data.result);

      // return dispatch(statsError('Внутренняя ошибка сервера!'));
    });
};
