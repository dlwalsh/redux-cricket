import { add, contains, evolve, flip, inc, identity, pipe, propEq } from 'ramda';
import { DELIVERY, OVER, WICKET } from '../constants/actionTypes';
import createReducer from '../utils/createReducer';

const initialState = {
  id: undefined,
  balls: 0,
  maidens: 0,
  noballs: 0,
  runs: 0,
  wickets: 0,
  wides: 0,
};

const isOneOf = flip(contains);
const isBowlerWicket = isOneOf(['bowled', 'caught', 'hit-wicket', 'lbw', 'stumped']);
const addWhen = (cond, num) => (cond ? add(num) : identity);
const incWhen = cond => (cond ? inc : identity);

const bowlingReducer = createReducer(initialState, {
  [DELIVERY]: action => evolve({
    balls: incWhen(propEq('deliveryType', 'legal', action)),
    noballs: incWhen(propEq('deliveryType', 'noball', action)),
    runs: pipe(
      incWhen(isOneOf(action.deliveryType, ['noball', 'wide'])),
      addWhen(propEq('runType', 'bat'), action.runs),
    ),
    wides: incWhen(propEq('deliveryType', 'wide', action)),
  }),
  [OVER]: action => evolve({
    maidens: incWhen(action.maiden),
  }),
  [WICKET]: action => evolve({
    wickets: incWhen(isBowlerWicket(action.howout)),
  }),
});

export default bowlingReducer;
