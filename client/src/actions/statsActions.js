import axios from 'axios';

import {
  STATS_GET_STARTED,
  STATS_GET_FINISHED,
  STATS_GET_ERROR,
  STATS_SET_DATE,
  STATS_SET_CURRENT_ACCOUNTS,
  STATS_GET_ACCOUNTS_FINISHED
} from './statsTypes';

export const statsError = error => {
  return {
    type: STATS_GET_ERROR,
    payload: error
  };
};

export const setCurrentPosAccounts = posAccounts => dispatch => {
  dispatch({ type: STATS_SET_CURRENT_ACCOUNTS, payload: posAccounts });
  // return dispatch(getSalesStats());
};

export const setStatsPeriod = statsPeriod => dispatch => {
  dispatch({ type: STATS_SET_DATE, payload: statsPeriod });
  // return dispatch(getSalesStats());
};

export const getCardsStats = () => (dispatch, getState) => {
  const curState = getState().chequesStore;
  dispatch({ type: STATS_GET_STARTED });

  const params = {
    period: curState.period,
    accounts: curState.current_accounts
  };

  const authData = { authorization: localStorage.getItem('token') };
  axios
    .get('/api/stats/cards', { headers: authData, params })
    .then(response => {
      return dispatch({
        type: STATS_GET_FINISHED,
        payload: response.data.result
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        return dispatch(statsError(error.response.data.result));
      }
      if (error.response && error.response.status === 401) {
        return dispatch(statsError('Ошибка авторизации пользователя'));
      }
      return dispatch(statsError('Внутренняя ошибка сервера!'));
    });
};

export const getPosAccounts = () => dispatch => {
  const authData = { authorization: localStorage.getItem('token') };
  axios
    .get('/api/discounts/accounts', { headers: authData })
    .then(response => {
      return dispatch({
        type: STATS_GET_ACCOUNTS_FINISHED,
        payload: response.data.result
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        return dispatch(statsError(error.response.data.result));
      }
      if (error.response && error.response.status === 401) {
        return dispatch(statsError('Ошибка авторизации пользователя'));
      }
      return dispatch(statsError('Внутренняя ошибка сервера!'));
    });
};
