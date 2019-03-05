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
} from '../actions/chequesTypes';

const initialState = {
  cheques: [],
  pos_accounts: [],
  current_accounts: [],
  isLoading: false,
  error: '',
  page: 1,
  period: { date1: '', date2: '' }
};
export default (state = initialState, action) => {
  switch (action.type) {
  case CHEQUES_GET_STARTED:
    return { ...state, cheques: [], isLoading: true, error: '' };

  case CHEQUES_GET_FINISHED:
    return { ...state, cheques: action.payload, isLoading: false, error: '' };

  case CHEQUES_GET_ERROR:
    return {
      ...state,
      cheques: [],
      isLoading: false,
      error: action.payload
    };

  case CHEQUES_PREV_PAGE: {
    const curPage = state.page;
    return { ...state, page: curPage + 1 };
  }

  case CHEQUES_NEXT_PAGE: {
    const curPage = state.page;
    if (curPage > 1) {
      return { ...state, page: curPage - 1 };
    }
    return state;
  }

  case CHEQUES_FIRST_PAGE:
    return { ...state, page: 1 };

  case CHEQUES_SET_DATE:
    return { ...state, period: action.payload };

  case CHEQUES_SET_CURRENT_ACCOUNTS:
    return { ...state, current_accounts: action.payload };

  case CHEQUES_GET_ACCOUNTS_FINISHED:
    return { ...state, pos_accounts: action.payload };

  default:
    return state;
  }
};
