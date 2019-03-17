import {
  FRAUD_GET_STARTED,
  FRAUD_GET_FINISHED,
  FRAUD_GET_ERROR,
  FRAUD_SET_DATE
} from '../actions/fraudTypes';

const initialState = {
  frauds: [],
  isLoading: false,
  error: '',
  period: { date1: '', date2: '' }
};
export default (state = initialState, action) => {
  switch (action.type) {
  case FRAUD_GET_STARTED:
    return { ...state, frauds: [], isLoading: true, error: '' };

  case FRAUD_GET_FINISHED:
    return { ...state, frauds: action.payload, isLoading: false, error: '' };

  case FRAUD_GET_ERROR:
    return {
      ...state,
      frauds: [],
      isLoading: false,
      error: action.payload
    };

  case FRAUD_SET_DATE:
    return { ...state, period: action.payload };

  default:
    return state;
  }
};
