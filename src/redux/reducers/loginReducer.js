import { REQUEST_LOGIN, QUESTIONS_TO_STATE } from '../actions';

const INNITIAL_STATE = {
  userInfo: '',
  questions: [],
};

const user = (state = INNITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_LOGIN:
    return { ...state, userInfo: action.payload };
  case QUESTIONS_TO_STATE:
    return { ...state, questions: action.payload };
  default:
    return state;
  }
};

export default user;
