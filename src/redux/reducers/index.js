import { combineReducers } from 'redux';
import user from './loginReducer';
import game from './gameReducer';

const rootReducer = combineReducers({
  user,
  game,
});

export default rootReducer;
