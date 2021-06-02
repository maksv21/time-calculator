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
  const { valueToRender: inputValue, preResult } = useSelector(
    (s) => s.mainInput
  )

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
        fontSize={5.5}
        minFontSize={3.5}
        cursorPosition={cursorPosition}
        onCursorPositionChange={handleCursorPositionChange}
      />
      <PreResult>{preResult}</PreResult>
    </InputContainer>
  )
}
