import {
  REPORTS_GET_STARTED,
  REPORTS_GET_FINISHED,
  REPORTS_GET_ERROR
} from '../actions/reportsTypes';

export default (state = { items: [] }, action) => {
  switch (action.type) {
  case REPORTS_GET_STARTED:
    return { items: [], isLoading: true, error: '' };
  case REPORTS_GET_FINISHED:
    return { items: action.payload, isLoading: false, error: '' };
  case REPORTS_GET_ERROR:
    return {
      items: [],
      isLoading: false,
      error: action.payload
    };
  default:
    return state;
  }
};
