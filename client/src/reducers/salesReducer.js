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
} from '../actions/salesTypes';

const initialState = {
  totalSales: 0,
  bonusesAccrued: 0,
  bonusesCharges: 0,
  sales1: [],
  sales2: [],
  sales3: [],
  error1: '',
  error2: '',
  error3: '',
  pos_accounts: [],
  current_accounts: [],
  period: { date1: '', date2: '' }
};

export default (state = initialState, action) => {
  switch (action.type) {
  case SALES1_GET_STARTED:
    return { ...state, error1: '' };

  case SALES1_GET_FINISHED: {
    // calculate the sales totals
    const sales1 = action.payload;
    let totalSales = 0;
    for (let count = 0; count < sales1.length; count++) {
      totalSales = totalSales + sales1[count].chequetotal;
    }
    return { ...state, sales1: sales1, totalSales: totalSales, error1: '' };
  }

  case SALES1_GET_ERROR:
    return { ...state, error1: action.payload };

  case SALES2_GET_STARTED:
    return { ...state, error2: '' };

  case SALES2_GET_FINISHED: {
    // calculate the bonuses totals
    const sales2 = action.payload;
    let bonusesAccrued = 0;
    let bonusesCharges = 0;
    for (let count = 0; count < sales2.length; count++) {
      bonusesAccrued = bonusesAccrued + sales2[count].added;
      bonusesCharges = bonusesCharges + sales2[count].deducted;
    }
    return {
      ...state,
      sales2: sales2,
      bonusesAccrued: bonusesAccrued,
      bonusesCharges: bonusesCharges,
      error2: ''
    };
  }

  case SALES2_GET_ERROR:
    return { ...state, error2: action.payload };

  case SALES3_GET_STARTED:
    return { ...state, error3: '' };

  case SALES3_GET_FINISHED:
    return { ...state, sales3: action.payload, error3: '' };

  case SALES3_GET_ERROR:
    return { ...state, error3: action.payload };

  case SALES_SET_DATE:
    return { ...state, period: action.payload };

  case SALES_SET_CURRENT_ACCOUNTS:
    return { ...state, current_accounts: action.payload };

  case SALES_GET_ACCOUNTS_FINISHED:
    return { ...state, pos_accounts: action.payload };

  default:
    return state;
  }
};
