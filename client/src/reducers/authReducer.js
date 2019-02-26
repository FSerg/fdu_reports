import {
  AUTH_SUCCESS,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_STARTED,
  AUTH_LOGINWAIT
} from '../actions/authTypes';

export default (state = {}, action) => {
  switch (action.type) {
  case AUTH_STARTED:
    return {
      ...state,
      error: '',
      authenticated: false,
      authLoading: true,
      user: null
    };
  case AUTH_SUCCESS:
    return {
      ...state,
      error: '',
      authenticated: true,
      authLoading: false,
      user: action.payload
    };
  case AUTH_LOGINWAIT:
    return {
      ...state,
      authLoading: false
    };
  case UNAUTH_USER:
    return {
      ...state,
      error: '',
      authenticated: false,
      user: null
    };
  case AUTH_ERROR:
    return {
      ...state,
      error: action.payload,
      authLoading: false
    };
  default:
    return state;
  }
};
