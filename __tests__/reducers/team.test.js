import { SET_TEAM } from '../../src/constants/actionTypes';
import createTeamReducer from '../../src/reducers/team';

test('Get initial state', () => {
  const reducer = createTeamReducer();
  const state = reducer(undefined, {
    type: '__DUMMY__',
  });

  expect(state).toMatchObject({
    id: undefined,
    name: undefined,
    players: [],
  });
});

test('Set team', () => {
  const reducer = createTeamReducer();
  const state = reducer(undefined, {
    type: SET_TEAM,
    id: 'AUS',
    name: 'Australia',
    captain: 'PAINE_TD',
    wicketkeeper: 'PAINE_TD',
    players: [{
      id: 'FINCH_AJ',
      fullName: 'AJ Finch',
      shortName: 'Finch',
    }, {
      id: 'KHAWAJA_UT',
      fullName: 'UT Khawaja',
      shortName: 'Khawaja',
    }, {
      id: 'MARSH_SE',
      fullName: 'SE Marsh',
      shortName: 'Marsh',
    }, {
      id: 'HEAD_TM',
      fullName: 'TM Head',
      shortName: 'Head',
    }, {
      id: 'MARSH_M',
      fullName: 'MR Marsh',
      shortName: 'Marsh',
    }, {
      id: 'LABUSCHAGNE_M',
      fullName: 'M Labuschagne',
      shortName: 'Labuschagne',
    }, {
      id: 'PAINE_TD',
      fullName: 'TD Paine',
      shortName: 'Paine',
    }, {
      id: 'STARC_MA',
      fullName: 'MA Starc',
      shortName: 'Starc',
    }, {
      id: 'SIDDLE_PM',
      fullName: 'PM Siddle',
      shortName: 'Siddle',
    }, {
      id: 'LYON_NM',
      fullName: 'NM Lyon',
      shortName: 'Lyon',
    }, {
      id: 'HOLLAND_JM',
      fullName: 'JM Holland',
      shortName: 'Holland',
    }],
  });

  expect(state).toMatchObject({
    id: 'AUS',
    name: 'Australia',
    captain: 'PAINE_TD',
    wicketkeeper: 'PAINE_TD',
    players: [{
      id: 'FINCH_AJ',
      fullName: 'AJ Finch',
      shortName: 'Finch',
    }, {
      id: 'KHAWAJA_UT',
      fullName: 'UT Khawaja',
      shortName: 'Khawaja',
    }, {
      id: 'MARSH_SE',
      fullName: 'SE Marsh',
      shortName: 'Marsh',
    }, {
      id: 'HEAD_TM',
      fullName: 'TM Head',
      shortName: 'Head',
    }, {
      id: 'MARSH_M',
      fullName: 'MR Marsh',
      shortName: 'Marsh',
    }, {
      id: 'LABUSCHAGNE_M',
      fullName: 'M Labuschagne',
      shortName: 'Labuschagne',
    }, {
      id: 'PAINE_TD',
      fullName: 'TD Paine',
      shortName: 'Paine',
    }, {
      id: 'STARC_MA',
      fullName: 'MA Starc',
      shortName: 'Starc',
    }, {
      id: 'SIDDLE_PM',
      fullName: 'PM Siddle',
      shortName: 'Siddle',
    }, {
      id: 'LYON_NM',
      fullName: 'NM Lyon',
      shortName: 'Lyon',
    }, {
      id: 'HOLLAND_JM',
      fullName: 'JM Holland',
      shortName: 'Holland',
    }],
  });
});
