import {
  always, isNil, mergeLeft, propEq, reject, when,
} from 'ramda';
import createReducer from '../utils/createReducer';
import { SET_TEAM } from '../constants/actionTypes';

const rejectNil = reject(isNil);

function createTeamReducer({ key } = {}) {
  const initialState = {
    id: undefined,
    name: undefined,
    players: [],
    captain: undefined,
    wicketkeeper: undefined,
  };

  const keyMatches = propEq('key', key);

  return createReducer(initialState, {
    [SET_TEAM]: action => when(
      always(keyMatches(action)),
      mergeLeft(rejectNil({
        id: action.id,
        name: action.name,
        players: action.players,
        captain: action.captain,
        wicketkeeper: action.wicketkeeper,
      })),
    ),
  });
}

export default createTeamReducer;
