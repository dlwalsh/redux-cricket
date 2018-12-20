import { combineReducers } from 'redux';
import createTeamReducer from './team';

const matchReducer = combineReducers({
  team1: createTeamReducer({ key: 1 }),
  team2: createTeamReducer({ key: 2 }),
});

export default matchReducer;
