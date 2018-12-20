import { NEW_BATSMAN, NEW_BOWLER, OVER, SCORE } from '../../src/constants/actionTypes';
import createLiveReducer from '../../src/reducers/live';

const reducer = createLiveReducer();
const initialState = {
  batsmanOnStrike: 0,
  batsmanOffStrike: 1,
  currentBowler: 0,
  innings: undefined,
  previousBowler: 1,
};

test('Get initial state with dummy action', () => {
  const state = reducer(initialState, {
    type: '__DUMMY__',
  });

  expect(state).toMatchObject(initialState);
});

test('Over: swap batsmen and bowlers', () => {
  const state = reducer(initialState, {
    type: OVER,
  });

  expect(state).toMatchObject({
    batsmanOnStrike: 1,
    batsmanOffStrike: 0,
    currentBowler: 1,
    previousBowler: 0,
  });
});

test('New batsman - on strike (1)', () => {
  const state = reducer(initialState, {
    type: NEW_BATSMAN,
    batsman: 2,
  });

  expect(state).toMatchObject({
    batsmanOnStrike: 2,
  });
});

test('New batsman - on strike (2)', () => {
  const state = reducer({
    ...initialState,
    batsmanOnStrike: undefined,
  }, {
    type: NEW_BATSMAN,
    batsman: 2,
  });

  expect(state).toMatchObject({
    batsmanOnStrike: 2,
  });
});

test('New batsman - off strike', () => {
  const state = reducer({
    ...initialState,
    batsmanOffStrike: undefined,
  }, {
    type: NEW_BATSMAN,
    batsman: 2,
  });

  expect(state).toMatchObject({
    batsmanOffStrike: 2,
  });
});

test('New bowler', () => {
  const state = reducer(initialState, {
    type: NEW_BOWLER,
    bowler: 2,
  });

  expect(state).toMatchObject({
    currentBowler: 2,
  });
});

test('Dot ball: no change of strike', () => {
  const state = reducer(initialState, {
    type: SCORE,
    runs: 0,
  });

  expect(state).toMatchObject({
    batsmanOnStrike: 0,
    batsmanOffStrike: 1,
  });
});

test('One run: strike change', () => {
  const state = reducer(initialState, {
    type: SCORE,
    runs: 1,
  });

  expect(state).toMatchObject({
    batsmanOnStrike: 1,
    batsmanOffStrike: 0,
  });
});

test('Two runs: no strike change', () => {
  const state = reducer(initialState, {
    type: SCORE,
    runs: 2,
  });

  expect(state).toMatchObject({
    batsmanOnStrike: 0,
    batsmanOffStrike: 1,
  });
});

test('Three runs: strike change', () => {
  const state = reducer(initialState, {
    type: SCORE,
    runs: 3,
  });

  expect(state).toMatchObject({
    batsmanOnStrike: 1,
    batsmanOffStrike: 0,
  });
});

test('One run, one short: no strike change', () => {
  const state = reducer(initialState, {
    type: SCORE,
    runs: 1,
    shortRun: true,
  });

  expect(state).toMatchObject({
    batsmanOnStrike: 0,
    batsmanOffStrike: 1,
  });
});

test('Two runs, one short: strike change', () => {
  const state = reducer(initialState, {
    type: SCORE,
    runs: 2,
    shortRun: true,
  });

  expect(state).toMatchObject({
    batsmanOnStrike: 1,
    batsmanOffStrike: 0,
  });
});
