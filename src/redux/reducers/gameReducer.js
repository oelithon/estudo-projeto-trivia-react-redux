import { DISABLE_BUTTONS } from '../actions';

const INNITIAL_STATE = {
  statusButton: false,
};

const game = (state = INNITIAL_STATE, action) => {
  switch (action.type) {
  case DISABLE_BUTTONS:
    return { ...state, statusButton: true };
  default:
    return state;
  }
};

export default game;
