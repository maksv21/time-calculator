import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import calculateTime from './utils/calculateTime'
import runTextTesters from './utils/textTesters/runTextTesters'
import type { GeneralKey, HandleKeyPressFunc, MainInputState } from './types'
import { DEL_KEY } from './types'

export const initialState: MainInputState = {
  value: '',
  valueToRender: '',
  preResult: null,
  error: null,
  caretPosition: 0,
}

const handleGeneralKeyPress: HandleKeyPressFunc = (
  prevInputValue,
  caretPosition,
  pressedKey
) => {
  const gluedValue =
    prevInputValue.substring(0, caretPosition) +
    pressedKey +
    prevInputValue.substring(caretPosition)

  const newValue = gluedValue // todo: CHAR-38 runTextEnhancers(prevInputValue, gluedValue)

  return {
    newValue,
    newCaretPosition: caretPosition + 1,
    isTestModeStrict: true,
  }
}

const handleDelKeyPress: HandleKeyPressFunc = (
  prevInputValue,
  caretPosition
) => {
  const isTestModeStrict = false

  if (caretPosition !== 0) {
    return {
      newValue:
        prevInputValue.slice(0, caretPosition - 1) +
        prevInputValue.slice(caretPosition),
      newCaretPosition: caretPosition - 1,
      isTestModeStrict,
    }
  }

  return {
    newValue: prevInputValue.slice(1),
    newCaretPosition: caretPosition,
    isTestModeStrict,
  }
}

const setNewValueToState = ({
  state,
  testedInputValue,
  newValue,
  newCaretPosition,
}: {
  state: MainInputState
  testedInputValue: ReturnType<typeof runTextTesters>
  newValue: string
  newCaretPosition: number
}) => {
  if (testedInputValue.isCorrect) {
    state.value = newValue

    const preResult = calculateTime(newValue)

    if (preResult.isCorrect) {
      state.preResult = preResult.value
      state.error = null
    } else {
      state.preResult = ''
      state.error = preResult.error
    }

    state.valueToRender = newValue

    state.caretPosition = newCaretPosition
  } else if (testedInputValue.valueToRender) {
    state.value = newValue

    if (testedInputValue.error) state.error = testedInputValue.error
    state.valueToRender = testedInputValue.valueToRender

    state.preResult = null
    state.caretPosition = newCaretPosition
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

      const { newValue, newCaretPosition, isTestModeStrict } =
        pressedKey === DEL_KEY
          ? handleDelKeyPress(state.value, state.caretPosition)
          : handleGeneralKeyPress(state.value, state.caretPosition, pressedKey)

      const testedInputValue = runTextTesters({
        prevValue: state.value,
        newValue,
        isTestModeStrict,
      })

      setNewValueToState({
        state,
        testedInputValue,
        newValue,
        newCaretPosition,
      })
    },

    // todo: CHAR-61, add calculated flag
    equalsKeyPressed: (state) => {
      if (state.preResult && !state.error) {
        state.value = state.preResult
        state.valueToRender = state.value
        state.preResult = null

        state.caretPosition = state.value.length
      } else {
        state.preResult = state.error
      }
    },

    clearAllKeyPressed: () => ({ ...initialState }),

    caretPositionChanged: (state, action: PayloadAction<number>) => {
      state.caretPosition = action.payload
    },

    hardwareKeyPressed: (
      state,
      action: PayloadAction<{
        newValue: string
        newCaretPosition: number
        isTestModeStrict: boolean
      }>
    ) => {
      const { newValue, newCaretPosition, isTestModeStrict } = action.payload
      const testedInputValue = runTextTesters({
        prevValue: state.value,
        newValue: action.payload.newValue,
        isTestModeStrict,
      })

      setNewValueToState({
        state,
        testedInputValue,
        newValue,
        newCaretPosition,
      })
    },
  },
})

export const {
  generalOrDelKeyPressed,
  equalsKeyPressed,
  clearAllKeyPressed,
  caretPositionChanged,
  hardwareKeyPressed,
} = mainInputSlice.actions

export default mainInputSlice.reducer
