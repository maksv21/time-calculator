import { useCallback, useEffect, useRef, useState } from 'react'
import type { InputElement, InputRootElement, InputValue } from '../../types'

import getTextWidth from './getTextWidth'

interface Props {
  value: InputValue
  inputElem: InputElement
  inputRootElem: InputRootElement
  fontSize: number
  minFontSize?: number
}

const useDynamicFontSize = ({
  value,
  inputElem,
  inputRootElem,
  fontSize,
  minFontSize,
}: Props): number => {
  const [currentFontSize, setCurrentFontSize] = useState(fontSize)

  // to not rerun useEffect on setCurrentFontSize call
  const fontSizeRef = useRef(currentFontSize)
  fontSizeRef.current = currentFontSize

  const handleFontSizeUpdate = useCallback(() => {
    if (!inputRootElem || !inputElem || !minFontSize || !value) return
    const inputRootWidth = inputRootElem.clientWidth // without scroll
    const inputTextWidth = getTextWidth(inputElem) // with scroll

    if (inputTextWidth === null) return

    const textSizeDiff = (100 / inputTextWidth) * inputRootWidth // difference in width between the text and the input

    const newFontSize = (fontSizeRef.current / 100) * textSizeDiff * 0.9 // -10% for better view

    if (newFontSize > fontSize) {
      setCurrentFontSize(fontSize)
    } else if (newFontSize < minFontSize) {
      setCurrentFontSize(minFontSize)
    } else {
      setCurrentFontSize(newFontSize)
    }
  }, [value, fontSize, minFontSize, inputRootElem, inputElem])

  useEffect(() => {
    handleFontSizeUpdate()

    window.addEventListener('resize', handleFontSizeUpdate)

    return () => window.removeEventListener('resize', handleFontSizeUpdate)
  }, [handleFontSizeUpdate])

  return currentFontSize
}

export default useDynamicFontSize
