async function requestToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const objectJson = await response.json();
  window.localStorage.setItem('token', objectJson.token);
  return objectJson.token;
}

export default requestToken;
