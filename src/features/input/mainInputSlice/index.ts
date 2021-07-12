import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import calculateTime from './utils/calculateTime'
import runTextTesters from './utils/textTesters/runTextTesters'
import type { GeneralKey, HandleKeyPressFunc, MainInputState } from './types'
import { DEL_KEY } from './types'

const initialState: MainInputState = {
  value: '',
  valueToRender: '',
  preResult: null,
  error: null,
  cursorPosition: 0,
}

const handleGeneralKeyPress: HandleKeyPressFunc = (
  prevInputValue,
  cursorPosition,
  pressedKey
) => {
  const gluedValue =
    prevInputValue.substring(0, cursorPosition) +
    pressedKey +
    prevInputValue.substring(cursorPosition)

  const newInputValue = gluedValue // todo: CHAR-38 runTextEnhancers(prevInputValue, gluedValue)

  return {
    newInputValue,
    newCursorPosition: cursorPosition + 1,
    isTestModeStrict: true,
  }
}

const handleDelKeyPress: HandleKeyPressFunc = (
  prevInputValue,
  cursorPosition
) => {
  const isTestModeStrict = false

  if (cursorPosition !== 0) {
    return {
      newInputValue:
        prevInputValue.slice(0, cursorPosition - 1) +
        prevInputValue.slice(cursorPosition),
      newCursorPosition: cursorPosition - 1,
      isTestModeStrict,
    }
  }

  return {
    newInputValue: prevInputValue.slice(1),
    newCursorPosition: cursorPosition,
    isTestModeStrict,
  }
}

export const mainInputSlice = createSlice({
  name: 'mainInput',
  initialState,
  reducers: {
    generalOrDelKeyPressed: (
      state,
      action: PayloadAction<GeneralKey | typeof DEL_KEY>
    ) => {
      const pressedKey = action.payload

      const { newInputValue, newCursorPosition, isTestModeStrict } =
        pressedKey === DEL_KEY
          ? handleDelKeyPress(state.value, state.cursorPosition)
          : handleGeneralKeyPress(state.value, state.cursorPosition, pressedKey)

      const testedInputValue = runTextTesters({
        prevValue: state.value,
        newValue: newInputValue,
        isTestModeStrict,
      })

      if (testedInputValue.isCorrect) {
        state.value = newInputValue

        const preResult = calculateTime(newInputValue)

        if (preResult.isCorrect) {
          state.preResult = preResult.value
          state.error = null
        } else {
          state.preResult = ''
          state.error = preResult.error
        }

        state.valueToRender = newInputValue

        state.cursorPosition = newCursorPosition
      } else if (testedInputValue.valueToRender) {
        state.value = newInputValue

        if (testedInputValue.error) state.error = testedInputValue.error
        state.valueToRender = testedInputValue.valueToRender

        state.preResult = null
        state.cursorPosition = newCursorPosition
      }
    },

    // todo: CHAR-61, add calculated flag
    equalsKeyPressed: (state) => {
      if (state.preResult && !state.error) {
        state.value = state.preResult
        state.valueToRender = state.value
        state.preResult = null

        state.cursorPosition = state.value.length
      } else {
        state.preResult = state.error
      }
    },

    clearAllKeyPressed: () => ({ ...initialState }),

    cursorPositionChanged: (state, action: PayloadAction<number>) => {
      state.cursorPosition = action.payload
    },
  },
})

export const {
  generalOrDelKeyPressed,
  equalsKeyPressed,
  clearAllKeyPressed,
  cursorPositionChanged,
} = mainInputSlice.actions

export default mainInputSlice.reducer
