import { SET_TEAM } from '../../src/constants/actionTypes';
import reducer from '../../src/reducers/match';

test('Get initial state', () => {
  const state = reducer(undefined, {
    type: '__DUMMY__',
  });

  expect(state).toMatchObject({
    team1: {
      id: undefined,
      name: undefined,
      players: [],
    },
    team2: {
      id: undefined,
      name: undefined,
      players: [],
    },
  });
});

test('Set team 1', () => {
  const state = reducer(undefined, {
    type: SET_TEAM,
    key: 1,
    id: 'AUS',
    name: 'Australia',
  });

  expect(state).toMatchObject({
    team1: {
      id: 'AUS',
      name: 'Australia',
      players: [],
    },
    team2: {
      id: undefined,
      name: undefined,
      players: [],
    },
  });
});

test('Set team 2', () => {
  const state = reducer(undefined, {
    type: SET_TEAM,
    key: 2,
    id: 'NZ',
    name: 'New Zealand',
  });

  expect(state).toMatchObject({
    team1: {
      id: undefined,
      name: undefined,
      players: [],
    },
    team2: {
      id: 'NZ',
      name: 'New Zealand',
      players: [],
    },
  });
});

test('Set team 1 and team 2', () => {
  let state;
  state = reducer(undefined, {
    type: SET_TEAM,
    key: 1,
    id: 'AUS',
    name: 'Australia',
  });
  state = reducer(state, {
    type: SET_TEAM,
    key: 2,
    id: 'NZ',
    name: 'New Zealand',
  });

  expect(state).toMatchObject({
    team1: {
      id: 'AUS',
      name: 'Australia',
      players: [],
    },
    team2: {
      id: 'NZ',
      name: 'New Zealand',
      players: [],
    },
  });
});
