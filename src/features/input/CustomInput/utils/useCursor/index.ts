import { useState } from 'react'
import { CursorElement, InputValue } from '../../types'
import useAnimation from './useAnimation'

interface Props {
  cursorElem: CursorElement
  inputValue?: InputValue
}

const useCursor = ({ cursorElem, inputValue }: Props): void => {
  const [isCursorVisible, setCursorVisibility] = useState(true)

  useAnimation({ cursorElem, inputValue, isCursorVisible })
}

export default useCursor
