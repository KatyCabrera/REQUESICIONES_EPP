import produce from 'immer';
import { SET_USER_DATA, CLEAR_USER_DATA, UPDATE_USER_DATA } from '../constants/costants';

const initialState = {
  userData: null,
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case SET_USER_DATA:
      draft.userData = action.data;
      break;
    case UPDATE_USER_DATA:
      draft.userData = {
        ...draft.userData,
        ...action.data,
      };
      break;
    case CLEAR_USER_DATA:
      draft.userData = null;
      break;
    default:
      break;
  }
});

export default userReducer;
