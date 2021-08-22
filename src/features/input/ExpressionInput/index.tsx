import { useCallback, useMemo } from 'react'

import CustomInput from 'features/input/ExpressionInput/CustomInput'
import {
  caretPositionChanged,
  equalsKeyPressed,
  hardwareKeyPressed,
} from 'features/input/mainInputSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import useStyles from './styles'

import type { FC } from 'react'
import { TypesOfRenderValue } from '../mainInputSlice/utils/textTesters/runTextTesters'
import type { InputHandler, InputValue } from './CustomInput/types'

// it's too hard to make keys for input values, so just remake them on each render
const makeUniqueKey = () => Date.now() + Math.random()

const ExpressionInput: FC = () => {
  const styles = useStyles()

  const { valueToRender, preResult, caretPosition } = useAppSelector(
    (state) => state.mainInput
  )

  const dispatch = useAppDispatch()
  const handleCaretPositionChange = useCallback(
    (newCaretPosition: number) =>
      dispatch(caretPositionChanged(newCaretPosition)),
    [dispatch]
  )

  const handleInput = useCallback<InputHandler>(
    (newValue, newCaretPosition, isTestModeStrict) =>
      dispatch(
        hardwareKeyPressed({ newValue, newCaretPosition, isTestModeStrict })
      ),
    [dispatch]
  )

  const handleEqualsKeyPress = useCallback(
    () => dispatch(equalsKeyPressed()),
    [dispatch]
  )

  const inputValue: InputValue = useMemo(() => {
    if (typeof valueToRender === 'string') return valueToRender

    let lengthOfPrevElements: null | number = 0

    return (
      valueToRender &&
      valueToRender.flatMap((valueObj) => {
        const elementValue = valueObj.value
        lengthOfPrevElements =
          lengthOfPrevElements !== null
            ? lengthOfPrevElements + valueObj.value.length
            : null

        return valueObj.type === TypesOfRenderValue.value ? (
          // make key unique on each rendering
          <span key={makeUniqueKey()}>{elementValue}</span>
        ) : (
          <span
            key={makeUniqueKey()}
            style={{
              color:
                valueObj.type === TypesOfRenderValue.error ? 'red' : 'orange',
            }}
          >
            {elementValue}
          </span>
        )
      })
    )
  }, [valueToRender])

  const inputValueOneString =
    typeof valueToRender === 'string'
      ? valueToRender
      : valueToRender &&
        valueToRender.reduce(
          (prevValue, valueObj) => prevValue + valueObj.value,
          ''
        )

  return (
    <div className={styles.root}>
      <CustomInput
        value={inputValue}
        valueOneString={inputValueOneString}
        onInput={handleInput}
        onEqualsKeyPressed={handleEqualsKeyPress}
        fontSize={5.5}
        minFontSize={3.5}
        caretPosition={caretPosition}
        onCaretPositionChange={handleCaretPositionChange}
      />
      <div className={styles.preResult}>{preResult}</div>
    </div>
  )
}

export default ExpressionInput
