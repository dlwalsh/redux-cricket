import { combineReducers } from 'redux';
import createSettingsReducer from './settings';
import liveReducer from './live';
import matchReducer from './match';

function createReducer(settings) {
  const reducer = combineReducers({
    innings: [],
    match: matchReducer,
    settings: createSettingsReducer(settings),
  });

  return reducer;
}

export default createReducer;
