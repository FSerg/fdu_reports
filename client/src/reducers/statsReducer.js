import {
  STATS_GET_STARTED,
  STATS_GET_FINISHED,
  STATS_GET_ERROR,
  STATS_SET_DATE,
  STATS_SET_CURRENT_ACCOUNTS,
  STATS_GET_ACCOUNTS_FINISHED
} from '../actions/statsTypes';

const initialState = {
  totalsStats: {
    totalCards: 0,
    namedCards: 0
  },
  stats: {
    namesStats: [],
    phonesStats: [],
    birthdaysStats: [],
    sexStats: [],
    smsEnabled: [],
    emailsEnabled: []
  },
  pos_accounts: [],
  current_accounts: [],
  isLoading: false,
  error: '',
  period: { date1: '', date2: '' }
};
export default (state = initialState, action) => {
  switch (action.type) {
  case STATS_GET_STARTED:
    return { ...state, isLoading: true, error: '' };

  case STATS_GET_FINISHED: {
    const stats = {
      namesStats: action.payload.namesStats,
      phonesStats: action.payload.phonesStats,
      birthdaysStats: action.payload.birthdaysStats,
      sexStats: action.payload.sexStats,
      smsEnabled: action.payload.smsEnabled,
      emailsEnabled: action.payload.emailsEnabled
    };
    return {
      ...state,
      totalsStats: action.payload.totalsStats,
      stats,
      isLoading: false,
      error: ''
    };
  }

  case STATS_GET_ERROR:
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };

  case STATS_SET_DATE:
    return { ...state, period: action.payload };

  case STATS_SET_CURRENT_ACCOUNTS:
    return { ...state, current_accounts: action.payload };

  case STATS_GET_ACCOUNTS_FINISHED:
    return { ...state, pos_accounts: action.payload };

  default:
    return state;
  }
};
