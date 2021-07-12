import { useCallback } from 'react'

import CustomInput from 'features/input/ExpressionInput/CustomInput'
import { cursorPositionChanged } from 'features/input/mainInputSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { TypesOfRenderValue } from 'features/input/mainInputSlice/utils/textTesters/runTextTesters'
import useStyles from './styles'

import type { FC } from 'react'

const ExpressionInput: FC = () => {
  const styles = useStyles()

  const { valueToRender, preResult, cursorPosition } = useAppSelector(
    (state) => state.mainInput
  )

  const inputValue =
    valueToRender && typeof valueToRender === 'object'
      ? valueToRender.map((valueObj) => {
          if (valueObj.type === TypesOfRenderValue.value) {
            return <span key={valueObj.value}>{valueObj.value}</span>
          }
          return (
            <span
              key={valueObj.value}
              style={{
                color:
                  valueObj.type === TypesOfRenderValue.error ? 'red' : 'orange',
              }}
            >
              {valueObj.value}
            </span>
          )
        })
      : valueToRender || ''

  const dispatch = useAppDispatch()
  const handleCursorPositionChange = useCallback(
    (newCursorPosition) => {
      dispatch(cursorPositionChanged(newCursorPosition))
    },
    [dispatch]
  )

  return (
    <div className={styles.root}>
      <CustomInput
        value={inputValue}
        arrayOfElements={
          valueToRender && typeof valueToRender === 'object'
            ? valueToRender
            : null
        }
        onInput={(newValue) => console.log(newValue)}
        fontSize={5.5}
        minFontSize={3.5}
        caretPosition={cursorPosition}
        onCaretPositionChange={handleCursorPositionChange}
      />
      <div className={styles.preResult}>{preResult}</div>
    </div>
  )
}

export default ExpressionInput
