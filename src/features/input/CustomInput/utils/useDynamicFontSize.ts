import { useEffect, useState } from 'react'
import getTextWidth from './getTextWidth'

import type { InputElement } from '../types'

interface Props {
  value?: string
  inputElem: InputElement
  fontSize: number
  minFontSize?: number
}

const useDynamicFontSize = ({
  value,
  inputElem,
  fontSize,
  minFontSize,
}: Props): number => {
  const [currentFontSize, setCurrentFontSize] = useState(fontSize)

  useEffect(() => {
    if (!inputElem || !minFontSize) return
    const inputWidth = inputElem.clientWidth // without scroll
    const inputTextWidth = getTextWidth(inputElem) // with scroll

    if (inputTextWidth === null) return

    const textSizeDiff = (100 / inputTextWidth) * inputWidth // difference in width between the text and the input

    const newFontSize = (currentFontSize / 100) * textSizeDiff * 0.9 // -10% for better view

    if (newFontSize > fontSize) {
      setCurrentFontSize(fontSize)
    } else if (newFontSize < minFontSize) {
      setCurrentFontSize(minFontSize)
    } else {
      setCurrentFontSize(newFontSize)
    }

    // changing currentFontSize shouldn't rerun useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, fontSize, minFontSize])

  return currentFontSize
}

export default useDynamicFontSize
