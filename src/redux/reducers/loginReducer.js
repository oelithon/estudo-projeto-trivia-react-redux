import { REQUEST_LOGIN } from '../actions';

const INNITIAL_STATE = {
  userInfo: '',
};

const user = (state = INNITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_LOGIN:
    return { ...state, userInfo: action.payload };
  default:
    return state;
  }
};

export default user;
