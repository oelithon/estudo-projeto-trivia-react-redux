export const REQUEST_LOGIN = 'REQUEST_LOGIN';

export const ANS = 'ANS';

export const userLogin = (payload) => ({
  type: REQUEST_LOGIN,
  payload,
});
