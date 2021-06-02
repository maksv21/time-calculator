import { useState } from 'react'
import type { CursorElement, InputElement, InputValue } from '../../types'
import useAnimation from './useAnimation'
import useUpdatePositionOnClick from './useUpdatePositionOnClick'

export interface CursorPositionChangeHandler {
  (newPosition: number): any
}

interface Props {
  cursorElem: CursorElement
  inputValue?: InputValue
  inputElem: InputElement
  cursorPosition?: number
  onCursorPositionChange?: CursorPositionChangeHandler
}

const useCursor = ({
  cursorElem,
  inputValue,
  inputElem,
  cursorPosition,
  onCursorPositionChange,
}: Props): void => {
  const [isCursorVisible, setCursorVisibility] = useState(true)

  useAnimation({ cursorElem, inputValue, isCursorVisible })
  useUpdatePositionOnClick({
    inputElem,
    cursorPosition,
    onCursorPositionChange,
  })
}

export default useCursor
