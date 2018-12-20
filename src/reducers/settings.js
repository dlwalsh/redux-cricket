import { always } from 'ramda';

function createSettingsReducer(loadState) {
  return always({
    accumulateNoballs: false,
    accumulateWides: false,
    ballsPerOver: 6,
    inningsPerSide: 2,
    maxOvers: undefined,
    playerPerSide: 11,
    wicketsPerInnings: 10,
    ...loadState,
  });
}

export default createSettingsReducer;
