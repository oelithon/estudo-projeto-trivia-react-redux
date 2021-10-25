export async function requestToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const objectJson = await response.json();
  window.localStorage.setItem('token', objectJson.token);
  return objectJson.token;
}

export async function requestGameApi(token) {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const json = await response.json();
  return json.results;
}

function colorToNone(eachAnswer) {
  eachAnswer.style.removeProperty('border');
}

export function changeDisplayAndStyle() {
  const correctAnswer = document.querySelector('.correctAnswer');
  const wrongAnswer = document.querySelectorAll('.wrongAnswer');
  correctAnswer.style.removeProperty('border');
  wrongAnswer
    .forEach((eachWrongAnswer) => colorToNone(eachWrongAnswer));
  const nextBtn = document.querySelector('.btn-next');
  nextBtn.style.display = 'none';
}
