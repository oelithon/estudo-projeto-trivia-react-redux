export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const QUESTIONS_TO_STATE = 'QUESTIONS_TO_STATE';
const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';

export const userLogin = (payload) => ({
  type: REQUEST_LOGIN,
  payload,
});

const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const questionsToState = (payload) => ({
  type: QUESTIONS_TO_STATE,
  payload,
});

export function fetchQuestions() {
  return (dispatch) => {
    dispatch(requestQuestions());
    const token = localStorage.getItem('token');
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((questions) => dispatch(questionsToState(questions)));
  };
}
