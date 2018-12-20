import { always } from 'ramda';
import createReducer from '../utils/createReducer';
import { NEW_BATSMAN, NEW_BOWLER, OVER, SCORE, WICKET } from '../constants/actionTypes';

function createLiveReducer(loadState) {
  const initialState = {
    batsmanOnStrike: undefined,
    batsmanOffStrike: undefined,
    currentBowler: undefined,
    innings: undefined,
    previousBowler: undefined,
    ...loadState,
  };

  return createReducer(initialState, {
    [NEW_BATSMAN]: ({ batsman }) => state => ({
      [state.batsmanOffStrike === undefined ? 'batsmanOffStrike' : 'batsmanOnStrike']: batsman,
    }),
    [NEW_BOWLER]: ({ bowler }) => always({
      currentBowler: bowler,
    }),
    [OVER]: always(state => ({
      batsmanOnStrike: state.batsmanOffStrike,
      batsmanOffStrike: state.batsmanOnStrike,
      currentBowler: state.previousBowler,
      previousBowler: state.currentBowler,
    })),
    [SCORE]: ({ runs, shortRun }) => state => (
      ((!shortRun && runs % 2 === 1) || (shortRun && runs % 2 === 0)) ? {
        batsmanOnStrike: state.batsmanOffStrike,
        batsmanOffStrike: state.batsmanOnStrike,
      } : {}
    ),
    [WICKET]: ({ nonStrikerOut }) => always({
      [nonStrikerOut ? 'batsmanOffStrike' : 'batsmanOnStrike']: undefined,
    }),
  });
}

export default createLiveReducer;
