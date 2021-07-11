import styled from 'styled-components'
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import CustomInput from 'features/input/CustomInput'
import { cursorPositionChanged } from 'features/input/mainInputSlice'

const InputContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-flow: column;
  text-align: right;
`

const PreResult = styled.div`
  height: 30px; // height if there's no value
  font-size: 25px;
  overflow: auto;
  white-space: nowrap;
`

export default () => {
  const { valueToRender, preResult } = useSelector((s) => s.mainInput)

  let inputValue

  if (valueToRender && typeof valueToRender === 'object') {
    inputValue = valueToRender.map((valueObj) => {
      if (valueObj.type === 0) {
        return valueObj.value
      }
      if (valueObj === 1) {
        return <span style={{ color: 'red' }}>{valueObj.value}</span>
      }

      return <span style={{ color: 'orange' }}>{valueObj.value}</span>
    })
  } else {
    inputValue = valueToRender || ''
  }

  const cursorPosition = useSelector((state) => state.mainInput.cursorPosition)

  const dispatch = useDispatch()
  const handleCursorPositionChange = useCallback(
    (newCursorPosition) => {
      dispatch(cursorPositionChanged(newCursorPosition))
    },
    [dispatch]
  )

  return (
    <InputContainer>
      <CustomInput
        value={inputValue}
        onInput={(newValue) => console.log(newValue)}
        fontSize={5.5}
        minFontSize={3.5}
        cursorPosition={cursorPosition}
        onCursorPositionChange={handleCursorPositionChange}
      />
      <PreResult>{preResult}</PreResult>
    </InputContainer>
  )
}
