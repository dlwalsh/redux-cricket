import { delivery } from '../../src/actions';
import reducer from '../../src/reducers/batting';

const initialState = {
  id: 'abc',
  balls: 0,
  bowler: undefined,
  fielders: [],
  fours: 0,
  howout: 'notout',
  runs: 0,
  sixes: 0,
};

test('Get initial state with dummy action', () => {
  const state = reducer(initialState, {
    type: '__DUMMY__',
  });

  expect(state).toMatchObject(initialState);
});

test('Dot ball', () => {
  const state = reducer(initialState, delivery({
    runs: 0,
  }));

  expect(state).toMatchObject(initialState);
});

test('Increment runs from 0 to 1', () => {
  const state = reducer(initialState, delivery({
    runs: 1,
  }));

  expect(state).toMatchObject({
    runs: 1,
  });
});

test('Increment runs from 1 to 2', () => {
  const state = reducer({
    ...initialState,
    runs: 1,
  }, delivery({
    runs: 1,
  }));

  expect(state).toMatchObject({
    runs: 2,
  });
});

test('Increment runs from 0 to 2', () => {
  const state = reducer({
    ...initialState,
    runs: 0,
  }, delivery({
    runs: 2,
  }));

  expect(state).toMatchObject({
    runs: 2,
  });
});

test('Increment runs from 1 to 4', () => {
  const state = reducer({
    ...initialState,
    runs: 1,
  }, delivery({
    runs: 3,
  }));

  expect(state).toMatchObject({
    runs: 4,
  });
});

test('Ignore byes', () => {
  const state = reducer(initialState, delivery({
    runType: 'bye',
    runs: 1,
  }));

  expect(state).toMatchObject({
    runs: 0,
  });
});

test('Ignore legbyes', () => {
  const state = reducer(initialState, delivery({
    runType: 'legbye',
    runs: 1,
  }));

  expect(state).toMatchObject({
    runs: 0,
  });
});

test('Increment balls from 0 to 1', () => {
  const state = reducer(initialState, delivery({
    ballFaced: true,
  }));

  expect(state).toMatchObject({
    balls: 1,
  });
});

test('Increment balls from 1 to 2', () => {
  const state = reducer({
    ...initialState,
    balls: 1,
  }, delivery({
    ballFaced: true,
  }));

  expect(state).toMatchObject({
    balls: 2,
  });
});

test('Do not increment balls', () => {
  const state = reducer({
    ...initialState,
    balls: 1,
  }, delivery({
    ballFaced: false,
  }));

  expect(state).toMatchObject({
    balls: 1,
  });
});

test('Increment fours from 0 to 1', () => {
  const state = reducer(initialState, delivery({
    boundary: true,
    runs: 4,
  }));

  expect(state).toMatchObject({
    fours: 1,
  });
});

test('Increment fours from 1 to 2', () => {
  const state = reducer({
    ...initialState,
    fours: 1,
  }, delivery({
    boundary: true,
    runs: 4,
  }));

  expect(state).toMatchObject({
    fours: 2,
  });
});

test('Do not increment fours', () => {
  const state = reducer({
    ...initialState,
    fours: 1,
  }, delivery({
    boundary: false,
    runs: 4,
  }));

  expect(state).toMatchObject({
    fours: 1,
  });
});

test('Increment sixes from 0 to 1', () => {
  const state = reducer(initialState, delivery({
    boundary: true,
    runs: 6,
  }));

  expect(state).toMatchObject({
    sixes: 1,
  });
});

test('Increment sixes from 1 to 2', () => {
  const state = reducer({
    ...initialState,
    sixes: 1,
  }, delivery({
    boundary: true,
    runs: 6,
  }));

  expect(state).toMatchObject({
    sixes: 2,
  });
});

test('Do not increment sixes', () => {
  const state = reducer({
    ...initialState,
    sixes: 1,
  }, delivery({
    boundary: false,
    runs: 6,
  }));

  expect(state).toMatchObject({
    sixes: 1,
  });
});

test('Dismissal', () => {
  const state = reducer({
    ...initialState,
    sixes: 1,
  }, delivery({
    bowler: 'xyz',
    fielders: ['f1'],
    howout: 'caught',
  }));

  expect(state).toMatchObject({
    bowler: 'xyz',
    fielders: ['f1'],
    howout: 'caught',
  });
});
