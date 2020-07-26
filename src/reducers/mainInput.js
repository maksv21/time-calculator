import { KEY_PRESSED } from '../constants';
import calcTime from '../utilts/calcTime';
import { ALL_OPERATORS, KEY_CLEAR, KEY_DEL, MINUS } from './constants';

const defaultState = {
  value: '',
  preResult: null,
};

// todo: if user click : or . -> 0:, 0.

export default (state = defaultState, action) => {
  const {type, keyValue} = action;

  if (type === KEY_PRESSED) {
    let newInputValue;
    let preResult;

    switch (keyValue) {
      case '=': {
        const expResult = calcTime(state.value);
        if(expResult.error) {
          newInputValue = state.value;
          preResult = expResult.error;
        } else {
          newInputValue = expResult;
          preResult = '';
        }

        break;
      }

      case KEY_DEL: {
        newInputValue = state.value.slice(0, -1);
        break;
      }

      case KEY_CLEAR: {
        newInputValue = '';
        break;
      }

      default: {
        // todo: move the conditions to functions

        if (
          // if keyValue is operator(except minus) and current expression is empty string or minus return current exp
          (keyValue !== MINUS && ALL_OPERATORS.includes(keyValue) && (state.value === '' || state.value === MINUS))
          // if latest two characters are operators and keyValue is operator return current value (e.g. 1234*-)
          || (state.value.length >= 3 && state.value.slice(-2).match(new RegExp(`[${ALL_OPERATORS}]{2}`)) && ALL_OPERATORS.includes(keyValue))
        ) {
          newInputValue = state.value;
        } else if (
          // if both new key and current symbol are operators (except minus), use new
          ALL_OPERATORS.includes(keyValue) && ALL_OPERATORS.includes(state.value.slice(-1))
          // if latest operator is not a minus
          && !(state.value.slice(-1) !== MINUS && keyValue === MINUS)
        ) {
          newInputValue = state.value.slice(0, -1) + keyValue;

        } else {
          newInputValue = state.value + keyValue;
        }
      }
    }

    // not just if(!preResult) since it can be empty string
    if(preResult === undefined) {
      const expResult = calcTime(newInputValue);
      preResult = expResult.error ? '' : expResult;
    }

    return {
      ...state,
      value: newInputValue,
      preResult,
    };
  }

  return state;
};
