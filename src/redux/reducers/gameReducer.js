import {
  DISABLE_BUTTONS, ABLE_BUTTONS, RESET_TIMER, STOP_TIME, SAVE_SCORE } from '../actions';

const INNITIAL_STATE = {
  statusButton: false,
  resetTimer: false,
  stopTime: false,
  currentDificulty: 0,
  clickedTimes: [],
};

const game = (state = INNITIAL_STATE, action) => {
  const NUMBER_TEN = 10;
  switch (action.type) {
  case DISABLE_BUTTONS:
    return { ...state, statusButton: true };
  case ABLE_BUTTONS:
    return { ...state, statusButton: false, resetTimer: true, stopTime: false };
  case RESET_TIMER:
    return { ...state, resetTimer: false };
  case STOP_TIME:
    return { ...state, stopTime: true, currentDificulty: action.payload };
  case SAVE_SCORE:
    return {
      ...state,
      clickedTimes: [...state.clickedTimes,
        NUMBER_TEN + action.payload * state.currentDificulty],
    };
  default:
    return state;
  }
};

export default game;
