import { combineReducers } from 'redux';
import user from './loginReducer';
import game from './gameReducer';
import score from './scoreReducer';

const rootReducer = combineReducers({
  user,
  game,
  score,
});

export default rootReducer;
