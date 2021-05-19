import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import getTextWidth from '../../utilts/getTextWidth'

const InputContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-flow: column;
  text-align: right;
  padding: 0 10px;
`

// todo: change padding too
const InputValue = styled.div`
  font-size: ${(props) => {
    const minSize = 40
    const maxSize = 55
    const { sizeDiff, currSize } = props

    const newFontSize = (currSize / 100) * sizeDiff * 0.9 // -10 % for better view

    if (newFontSize > maxSize) {
      return maxSize;
    } else if (newFontSize < minSize) {
      return minSize;
    }

    return newFontSize
  }}px;
  overflow: auto;
  transition: all 0.1s;
  white-space: nowrap;
`

const PreResult = styled.div`
  height: 30px; // height if there's no value
  font-size: 25px;
  overflow: auto;
  white-space: nowrap;
`

export default () => {
  const { value: inputValue, preResult } = useSelector((s) => s.mainInput)
  const inputValueEl = useRef(null)

  const [fontInfo, setFontInfo] = useState({
    diff: 100, // difference in width between the text and the input
    currSize: 1, // any number to set the type
  })

  useEffect(() => {
    const inputWidth = inputValueEl.current.clientWidth
    const inputTextWidth = getTextWidth(inputValueEl.current)

    setFontInfo({
      diff: (100 / inputTextWidth) * inputWidth,
      currSize: parseInt(getComputedStyle(inputValueEl.current).fontSize, 10),
    })
  }, [inputValue])

  return (
    <InputContainer>
      <InputValue
        ref={inputValueEl}
        sizeDiff={fontInfo.diff}
        currSize={fontInfo.currSize}
      >
        {inputValue}
      </InputValue>
      <PreResult>{preResult}</PreResult>
    </InputContainer>
  )
}
