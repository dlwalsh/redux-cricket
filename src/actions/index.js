import { DELIVERY } from '../constants/actionTypes';

export function delivery(options = {}) {
  return {
    type: DELIVERY,
    runs: 0,
    deliveryType: 'legal',
    runType: 'bat',
    shortRun: false,
    boundary: false,
    nonStrikerOut: false,
    howout: 'notout',
    fielders: [],
    ...options,
  };
}
