import {
  REPORTS_GET_STARTED,
  REPORTS_GET_FINISHED,
  REPORTS_GET_ERROR,
  REPORTS_NEXT_PAGE,
  REPORTS_PREV_PAGE,
  REPORTS_FIRST_PAGE,
  REPORTS_SET_TYPE
} from '../actions/reportsTypes';

export default (
  state = { items: [], isLoading: false, error: '', page: 1, type: 'total' },
  action
) => {
  switch (action.type) {
  case REPORTS_GET_STARTED:
    return { ...state, items: [], isLoading: true, error: '' };
  case REPORTS_GET_FINISHED:
    return { ...state, items: action.payload, isLoading: false, error: '' };
  case REPORTS_GET_ERROR:
    return {
      ...state,
      items: [],
      isLoading: false,
      error: action.payload
    };

  case REPORTS_PREV_PAGE: {
    const curPage = state.page;
    return { ...state, page: curPage + 1 };
  }

  case REPORTS_NEXT_PAGE: {
    const curPage = state.page;
    if (curPage > 1) {
      return { ...state, page: curPage - 1 };
    }
    return state;
  }

  case REPORTS_FIRST_PAGE:
    return { ...state, page: 1 };

  case REPORTS_SET_TYPE:
    return { ...state, type: action.payload };

  default:
    return state;
  }
};
