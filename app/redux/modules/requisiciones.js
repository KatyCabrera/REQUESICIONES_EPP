import produce from 'immer';
import { SET_SELECTED_REQUISICION } from '../constants/costants';

const initialState = {
  selectedRequisicion: null,
};

/* eslint-disable default-case, no-param-reassign */
const requisicionReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case SET_SELECTED_REQUISICION:
      draft.selectedRequisicion = action.data;
      break;
    default:
      break;
  }
});

export default requisicionReducer;
