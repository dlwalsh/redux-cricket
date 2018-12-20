import { propEq } from 'ramda';
import createReducer from '../utils/createReducer';
import { SET_TEAM } from '../constants/actionTypes';

function createTeamReducer({ key } = {}) {
  const initialState = {
    id: undefined,
    name: undefined,
    players: [],
  };

  const keyMatches = propEq('key', key);

  return createReducer(initialState, {
    [SET_TEAM]: action => state => (
      keyMatches(action) ? {
        id: action.id || state.id,
        name: action.name || state.name,
      } : undefined
    ),
  });
}

export default createTeamReducer;
