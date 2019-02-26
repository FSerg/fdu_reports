import axios from 'axios';
import md5 from 'md5-hash';

import {
  AUTH_SUCCESS,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_STARTED,
  AUTH_LOGINWAIT
} from './authTypes';
import history from '../history';

export const signoutUser = () => {
  localStorage.removeItem('token');
  history.push('/login');
  return { type: UNAUTH_USER };
};

export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

export const loginSubmit = userData => dispatch => {
  dispatch({ type: AUTH_STARTED });

  // prepare userData
  const passForHash = `${userData.name}:${userData.password}`;
  const newUserData = {
    id: userData.name,
    password: md5(passForHash)
  };

  axios
    .post('/api/users/login', newUserData)
    .then(response => {
      dispatch({ type: AUTH_SUCCESS, payload: response.data.result });

      localStorage.setItem('token', response.data.token);
      history.push('/report');
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        dispatch(authError(error.response.data.result));
      } else if (error.response && error.response.status === 401) {
        dispatch(
          authError(
            'Ошибка авторизации (неправильное имя пользователя или пароль)'
          )
        );
      } else {
        dispatch(authError('Внутренняя ошибка сервера'));
      }
    });
};

export const getCurrentUser = () => dispatch => {
  dispatch({ type: AUTH_STARTED });
  const authData = { authorization: localStorage.getItem('token') };
  axios
    .get('/api/users/current', { headers: authData })
    .then(response => {
      // console.log(response.data.result);
      dispatch({ type: AUTH_SUCCESS, payload: response.data.result });
    })
    .catch(error => {
      // console.log(error.response);

      if (error.response && error.response.status === 400) {
        dispatch(authError(error.response.data.result));
      } else if (error.response && error.response.status === 401) {
        dispatch(authError('Ошибка авторизации!'));
      } else if (error.response && error.response.status === 403) {
        dispatch(authError('Недостаточно прав доступа!'));
      } else {
        dispatch(authError('Внутренняя ошибка сервера!'));
      }
    });
};
