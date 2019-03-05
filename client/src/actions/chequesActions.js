import axios from 'axios';

import {
  CHEQUES_GET_STARTED,
  CHEQUES_GET_FINISHED,
  CHEQUES_GET_ERROR,
  CHEQUES_NEXT_PAGE,
  CHEQUES_PREV_PAGE,
  CHEQUES_FIRST_PAGE,
  CHEQUES_SET_DATE,
  CHEQUES_SET_CURRENT_ACCOUNTS,
  CHEQUES_GET_ACCOUNTS_FINISHED
} from './chequesTypes';

export const chequesError = error => {
  return {
    type: CHEQUES_GET_ERROR,
    payload: error
  };
};

export const getChequesNextPage = () => dispatch => {
  dispatch({ type: CHEQUES_NEXT_PAGE });
  return dispatch(getCheques());
};

export const getChequesPrevPage = () => dispatch => {
  dispatch({ type: CHEQUES_PREV_PAGE });
  return dispatch(getCheques());
};

export const getChequesFirstPage = () => dispatch => {
  dispatch({ type: CHEQUES_FIRST_PAGE });
  return dispatch(getCheques());
};

export const setCurrentPosAccounts = posAccounts => dispatch => {
  dispatch({ type: CHEQUES_SET_CURRENT_ACCOUNTS, payload: posAccounts });
  return dispatch(getCheques());
};

export const setChequesPeriod = chequesPeriod => dispatch => {
  dispatch({ type: CHEQUES_SET_DATE, payload: chequesPeriod });
  return dispatch(getCheques());
};

export const getCheques = () => (dispatch, getState) => {
  const curState = getState().chequesStore;
  dispatch({ type: CHEQUES_GET_STARTED });

  const params = {
    sort: curState.type,
    page: curState.page,
    period: curState.period,
    accounts: curState.current_accounts
  };

  const authData = { authorization: localStorage.getItem('token') };
  axios
    .get('/api/discounts/cheques', { headers: authData, params })
    .then(response => {
      return dispatch({
        type: CHEQUES_GET_FINISHED,
        payload: response.data.result
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        return dispatch(chequesError(error.response.data.result));
      }
      if (error.response && error.response.status === 401) {
        return dispatch(chequesError('Ошибка авторизации пользователя'));
      }
      return dispatch(chequesError('Внутренняя ошибка сервера!'));
    });
};

export const getPosAccounts = () => dispatch => {
  const authData = { authorization: localStorage.getItem('token') };
  axios
    .get('/api/discounts/accounts', { headers: authData })
    .then(response => {
      return dispatch({
        type: CHEQUES_GET_ACCOUNTS_FINISHED,
        payload: response.data.result
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        return dispatch(chequesError(error.response.data.result));
      }
      if (error.response && error.response.status === 401) {
        return dispatch(chequesError('Ошибка авторизации пользователя'));
      }
      return dispatch(chequesError('Внутренняя ошибка сервера!'));
    });
};
