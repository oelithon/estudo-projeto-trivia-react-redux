export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const QUESTIONS_TO_STATE = 'QUESTIONS_TO_STATE';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const DISABLE_BUTTONS = 'DISABLE_BUTTONS';
export const ABLE_BUTTONS = 'ABLE_BUTTONS';
export const RESET_TIMER = 'RESET_TIMER';
export const STOP_TIME = 'STOP_TIME';
export const SAVE_SCORE = 'SAVE_SCORE';

export const userLogin = (payload) => ({
  type: REQUEST_LOGIN,
  payload,
});

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const questionsAndTokenToState = (payload) => ({
  type: QUESTIONS_TO_STATE,
  payload,
});

export function fetchTokenAndQuestions() {
  return async (dispatch) => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await response.json();
    const token = await json.token;
    window.localStorage.setItem('token', token);
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questionsToJson = await fetchQuestions.json();
    const questions = await questionsToJson.results;
    dispatch(questionsAndTokenToState(questions));
    dispatch(requestQuestions());
  };
}

export const disableButton = () => ({
  type: DISABLE_BUTTONS,
});

export const ableButtons = () => ({
  type: ABLE_BUTTONS,
});

export const timerToDefault = () => ({
  type: RESET_TIMER,
});

export const stopTime = () => ({
  type: STOP_TIME,
});

export const saveScore = (payload) => ({
  type: SAVE_SCORE,
  payload,
});
