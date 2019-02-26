import { SHOW_MODAL, HIDE_MODAL } from '../actions/modalActionsTypes';

const initialState = {
  type: null,
  props: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
  case SHOW_MODAL:
    return {
      ...state,
      type: action.payload.type,
      props: action.payload.props
    };
  case HIDE_MODAL:
    return initialState;
  default:
    return state;
  }
};
