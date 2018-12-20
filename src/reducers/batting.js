import { always } from 'ramda';
import { DELIVERY, NEW_BATSMAN } from '../constants/actionTypes';
import createReducer from '../utils/createReducer';

const initialState = {
  id: undefined,
  balls: 0,
  bowler: undefined,
  fielders: [],
  fours: 0,
  howout: 'notout',
  runs: 0,
  sixes: 0,
};

const battingReducer = createReducer(initialState, {
  [NEW_BATSMAN]: action => always({
    id: action.id,
  }),
  [DELIVERY]: action => state => ({
    balls: action.ballFaced ? state.balls + 1 : state.balls,
    bowler: action.howout !== 'notout' ? action.bowler : undefined,
    fours: action.boundary && action.runs === 4 ? state.fours + 1 : state.fours,
    fielders: action.fielders,
    howout: action.howout,
    runs: action.runType === 'bat' ? state.runs + action.runs : state.runs,
    sixes: action.boundary && action.runs === 6 ? state.sixes + 1 : state.sixes,
  }),
});

export default battingReducer;
