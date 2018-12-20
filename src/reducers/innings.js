import { complement, concat, has, lensPath, set } from 'ramda';
import { SCORE, NEW_BATSMAN, NEW_BOWLER, OVER } from '../constants/actionTypes';
import createReducer from '../utils/createReducer';
import battingReducer from './batting';
import bowlingReducer from './bowling';

const hasNot = complement(has);

function createInningsReducer() {
  const initialState = {
    balls: 0,
    batsmen: {},
    battingOrder: [],
    bowlers: {},
    bowlingOrder: [],
    byes: 0,
    declared: false,
    legbyes: 0,
    maxOvers: 0,
    noballs: 0,
    overs: 0,
    penalties: 0,
    target: 0,
    wides: 0,
  };

  return createReducer(initialState, {
    [NEW_BATSMAN]: (state, action) => (
      has(action.id, state.batsmen) ? {
        batsmen: set(
          lensPath([action.id, 'howout']),
          'notout',
          state.batsmen,
        ),
      } : {
        batsmen: {
          ...state.batsmen,
          [action.id]: battingReducer(state.batsmen[action.id], action),
        },
      }
    ),
    [NEW_BOWLER]: (state, action) => (
      hasNot(action.id, state.bowlers) ? {
        bowlers: {
          ...state.bowlers,
          [action.id]: bowlingReducer(state.bowlers[action.id], action),
        },
        bowlingOrder: concat(state.bowlingOrder, action.id),
      } : undefined
    ),
    [OVER]: state => ({
      balls: 0,
      overs: state.overs + 1,
    }),
    [SCORE]: (state, action) => ({
      balls: action.deliveryType === 'legal' ? state.balls + 1 : state.balls,
      byes: state.byes + action.byes,
      legbyes: state.legbyes + action.legbyes,
      noballs: state.noballs + action.noballs,
      wides: state.wides + action.wides,
    }),
  });
}

export default createInningsReducer;
