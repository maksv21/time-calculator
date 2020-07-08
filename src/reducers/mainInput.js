import { KEY_PRESSED } from '../constants';
import calcTime from '../utilts/calcTime';

const defaultState = {
  value: '',
  preResult: null,
};

export default (state = defaultState, action) => {
  const {type, keyValue} = action;

  if (type === KEY_PRESSED) {
    let newInputValue;
    let preResult;

    switch (keyValue) {
      case '=': {
        newInputValue = calcTime(state.value);
        preResult = '';
        break;
      }

      case 'DEL': {
        newInputValue = state.value.slice(0, -1);
        break;
      }

      case 'C': {
        newInputValue = '';
        break;
      }

      default: {
        newInputValue = state.value + keyValue;
      }
    }

    return {
      ...state,
      value: newInputValue,
      preResult: preResult === '' ? preResult : calcTime(newInputValue),
    };
  }

  return state;
};
