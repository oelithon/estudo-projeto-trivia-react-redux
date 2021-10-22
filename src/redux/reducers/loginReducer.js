import { REQUEST_LOGIN, QUESTIONS_TO_STATE, REQUEST_QUESTIONS } from '../actions';

const INNITIAL_STATE = {
  userInfo: '',
  questions: [],
  loading: true,
};

const user = (state = INNITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_LOGIN:
    return { ...state, userInfo: action.payload };
  case QUESTIONS_TO_STATE:
    return { ...state, questions: action.payload };
  case REQUEST_QUESTIONS:
    return { ...state, loading: !state.loading };
  default:
    return state;
  }
};

export default user;
