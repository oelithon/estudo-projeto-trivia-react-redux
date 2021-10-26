import { IMAGE_GRAVATAR } from '../actions';

const INNITIAL_STATE = {
  imageGravatar: '',
};

const score = (state = INNITIAL_STATE, action) => {
  switch (action.type) {
  case IMAGE_GRAVATAR:
    return { ...state, imageGravatar: action.payload };
  default:
    return state;
  }
};

export default score;
