import { useCallback, useEffect, useState } from 'react'
import type { CursorPositionChangeHandler } from '.'
import type { InputElement } from '../../types'

interface Props {
  inputElem: InputElement
  cursorPosition?: number

  onCursorPositionChange?: CursorPositionChangeHandler
}

const useUpdatePositionOnClick = ({
  inputElem,
  cursorPosition: _cursorPositionFromProps,
  onCursorPositionChange: _onCursorPositionChangeFromProps,
}: Props): number => {
  const [_cursorPositionInState, _setCursorPositionInState] = useState(
    inputElem?.textContent?.length || 0
  )

  // use inner state if outer was not provided
  const currentCursorPosition =
    _cursorPositionFromProps || _cursorPositionInState
  const setNewCursorPosition =
    _onCursorPositionChangeFromProps || _setCursorPositionInState

  const handleInputClick = useCallback(() => {
    const selection = window.getSelection()
    const newPosition = selection?.focusOffset

    if (newPosition !== undefined) setNewCursorPosition(newPosition)
  }, [setNewCursorPosition])

  useEffect(() => {
    inputElem?.addEventListener('click', handleInputClick)
    return () => {
      inputElem?.removeEventListener('click', handleInputClick)
    }
  }, [inputElem, handleInputClick])

  return currentCursorPosition
}

export default useUpdatePositionOnClick
