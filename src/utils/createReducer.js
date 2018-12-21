import {
  complement, either, isEmpty, isNil,
} from 'ramda';

const isNotNilOrEmpty = complement(either(isNil, isEmpty));

function createReducer(initialState = {}, handlers = {}) {
  return (state = initialState, action) => {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      const newState = handlers[action.type](action)(state);

      if (newState !== state && isNotNilOrEmpty(newState)) {
        return {
          ...state,
          ...newState,
        };
      }
    }

    return state;
  };
}

export default createReducer;
