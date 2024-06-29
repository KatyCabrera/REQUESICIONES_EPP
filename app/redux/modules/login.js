import produce from 'immer';
import { INIT } from '../constants/reduxFormConstants';

const initialState = {
  usersLogin: {
    username: '',
    password: '',
    remember: false
  },
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case INIT:
      draft.usersLogin = action.data;
      break;
    default:
      break;
  }
});

export default loginReducer;
