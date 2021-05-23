import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import calcTimeNoType from './utils/calcTime'
import runEnhancers from './utils/textEnhancers/runEnhancers'

const calcTime = (exp: string): string | { error: string } =>
  calcTimeNoType(exp)

interface MainInputState {
  value: string
  preResult: null | string
  cursorPosition: number
}

const initialState: MainInputState = {
  value: '',
  preResult: null,
  cursorPosition: 0,
}

// todo: if user click : or . -> 0:, 0.

export type NumberKeys =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'

export enum OperatorKeys {
  Plus = '+',
  Minus = '-',
  Div = '÷',
  Mult = '×',
  Decimal = '.',
  Colon = ':',
}

export type GeneralKey = NumberKeys | OperatorKeys

const enhanceInputValue = (inputValue: string): string =>
  runEnhancers(inputValue, [])

export const mainInputSlice = createSlice({
  name: 'mainInput',
  initialState,
  reducers: {
    generalKeyPressed: (state, action: PayloadAction<GeneralKey>) => {
      state.cursorPosition += 1

      const pressedKeyValue = action.payload

      const newInputValue =
        state.value.substring(0, state.cursorPosition) +
        pressedKeyValue +
        state.value.substring(state.cursorPosition)

      const enhancedInputValue = enhanceInputValue(newInputValue)

      state.value = enhancedInputValue

      const preResult = calcTime(enhancedInputValue)
      state.preResult = typeof preResult === 'string' ? preResult : ''
    },

    // todo: add enhancers CHAR-38
    // ageneralKeyPressed: (state, action: PayloadAction<GeneralKey>) => {
    //   const keyValue = action.payload
    //   let newInputValue
    //   let preResult = null

    //   if (
    //     // if keyValue is operator(except minus) and current expression is empty string or minus return current exp
    //     (keyValue !== OperatorKeys.Minus &&
    //       keyValue in OperatorKeys &&
    //       (state.value === '' || state.value === OperatorKeys.Minus)) ||
    //     // if latest two characters are operators and keyValue is operator return current value (e.g. 1234*-)
    //     (state.value.length >= 3 &&
    //       state.value.slice(-2).match(new RegExp(`[${ALL_OPERATORS}]{2}`)) &&
    //       keyValue in OperatorKeys)
    //   ) {
    //     newInputValue = state.value
    //   } else if (
    //     // if both new key and current symbol are operators (except minus), use new
    //     keyValue in OperatorKeys &&
    //     ALL_OPERATORS.includes(state.value.slice(-1)) &&
    //     // if latest operator is not a minus
    //     !(state.value.slice(-1) !== MINUS && keyValue === MINUS)
    //   ) {
    //     newInputValue = state.value.slice(0, -1) + keyValue
    //   } else {
    //     newInputValue = state.value + keyValue
    //   }

    //   // not just if(!preResult) since it can be empty string
    //   if (preResult === null) {
    //     const expResult = calcTime(newInputValue)
    //     if (typeof expResult === 'object' && expResult.error) {
    //       preResult = ''
    //     } else if (typeof expResult === 'string') {
    //       preResult = expResult
    //     }
    //   }

    //   state.value = newInputValue
    //   state.preResult = preResult
    // },

    equalsKeyPressed: (state) => {
      const expResult = calcTime(state.value)

      if (typeof expResult === 'object') {
        state.preResult = expResult.error
      } else {
        state.value = expResult
        state.preResult = ''
      }
    },

    deleteKeyPressed: (state) => {
      state.value = state.value.slice(0, -1)
      state.preResult = enhanceInputValue(state.value)
      if (state.cursorPosition > 0) state.cursorPosition -= 1
    },

    clearAllKeyPressed: (state) => {
      state.value = ''
      state.preResult = ''
      state.cursorPosition = 0
    },
  },
})

export const {
  generalKeyPressed,
  equalsKeyPressed,
  deleteKeyPressed,
  clearAllKeyPressed,
} = mainInputSlice.actions

export default mainInputSlice.reducer
