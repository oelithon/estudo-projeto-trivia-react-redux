export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const QUESTIONS_TO_STATE = 'QUESTIONS_TO_STATE';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const DISABLE_BUTTONS = 'DISABLE_BUTTONS';

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

export const disableButton = (payload) => ({
  type: DISABLE_BUTTONS,
  payload,
});
