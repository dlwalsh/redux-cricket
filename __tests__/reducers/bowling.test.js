import { delivery } from '../../src/actions';
import { OVER, WICKET } from '../../src/constants/actionTypes';
import reducer from '../../src/reducers/bowling';

const initialState = {
  id: 'abc',
  balls: 0,
  maidens: 0,
  noballs: 0,
  runs: 0,
  wickets: 0,
  wides: 0,
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

  expect(state).toMatchObject({
    balls: 1,
    runs: 0,
  });
});

test('Increment runs from 0 to 1', () => {
  const state = reducer({
    balls: 1,
    runs: 0,
  }, delivery({
    runs: 1,
  }));

  expect(state).toMatchObject({
    balls: 2,
    runs: 1,
  });
});

test('Increase runs from 1 to 3', () => {
  const state = reducer({
    balls: 2,
    runs: 1,
  }, delivery({
    runs: 2,
  }));

  expect(state).toMatchObject({
    balls: 3,
    runs: 3,
  });
});

test('Tally maiden (1)', () => {
  const state = reducer({
    maidens: 0,
  }, {
    type: OVER,
    maiden: true,
  });

  expect(state).toMatchObject({
    maidens: 1,
  });
});

test('Tally maiden (2)', () => {
  const state = reducer({
    maidens: 1,
  }, {
    type: OVER,
    maiden: true,
  });

  expect(state).toMatchObject({
    maidens: 2,
  });
});

test('Do not tally maiden', () => {
  const state = reducer({
    maidens: 1,
  }, {
    type: OVER,
    maiden: false,
  });

  expect(state).toMatchObject({
    maidens: 1,
  });
});

test('Tally bowled as a bowling wicket', () => {
  const state = reducer({
    wickets: 0,
  }, {
    type: WICKET,
    howout: 'bowled',
  });

  expect(state).toMatchObject({
    wickets: 1,
  });
});

test('Tally caught as a bowling wicket', () => {
  const state = reducer({
    wickets: 1,
  }, {
    type: WICKET,
    howout: 'caught',
  });

  expect(state).toMatchObject({
    wickets: 2,
  });
});

test('Tally hit wicket as a bowling wicket', () => {
  const state = reducer({
    wickets: 2,
  }, {
    type: WICKET,
    howout: 'hit-wicket',
  });

  expect(state).toMatchObject({
    wickets: 3,
  });
});

test('Tally lbw as a bowling wicket', () => {
  const state = reducer({
    wickets: 3,
  }, {
    type: WICKET,
    howout: 'lbw',
  });

  expect(state).toMatchObject({
    wickets: 4,
  });
});

test('Tally stumped as a bowling wicket', () => {
  const state = reducer({
    wickets: 4,
  }, {
    type: WICKET,
    howout: 'stumped',
  });

  expect(state).toMatchObject({
    wickets: 5,
  });
});

test('Do not tally handled as a bowling wicket', () => {
  const state = reducer({
    wickets: 5,
  }, {
    type: WICKET,
    howout: 'handled',
  });

  expect(state).toMatchObject({
    wickets: 5,
  });
});

test('Do not tally run out as a bowling wicket', () => {
  const state = reducer({
    wickets: 5,
  }, {
    type: WICKET,
    howout: 'run-out',
  });

  expect(state).toMatchObject({
    wickets: 5,
  });
});

test('Do not tally obstruction as a bowling wicket', () => {
  const state = reducer({
    wickets: 5,
  }, {
    type: WICKET,
    howout: 'obstruction',
  });

  expect(state).toMatchObject({
    wickets: 5,
  });
});

test('Do not tally timed-out as a bowling wicket', () => {
  const state = reducer({
    wickets: 5,
  }, {
    type: WICKET,
    howout: 'timed-out',
  });

  expect(state).toMatchObject({
    wickets: 5,
  });
});

test('Increase noballs from 0 to 1', () => {
  const state = reducer({
    noballs: 0,
  }, delivery({
    deliveryType: 'noball',
  }));

  expect(state).toMatchObject({
    noballs: 1,
  });
});

test('Increase noballs from 1 to 2', () => {
  const state = reducer({
    noballs: 1,
  }, delivery({
    deliveryType: 'noball',
  }));

  expect(state).toMatchObject({
    noballs: 2,
  });
});

test('Increase noballs from 0 to 1', () => {
  const state = reducer({
    wides: 0,
  }, delivery({
    deliveryType: 'wide',
  }));

  expect(state).toMatchObject({
    wides: 1,
  });
});

test('Increase noballs from 1 to 2', () => {
  const state = reducer({
    wides: 1,
  }, delivery({
    deliveryType: 'wide',
  }));

  expect(state).toMatchObject({
    wides: 2,
  });
});
