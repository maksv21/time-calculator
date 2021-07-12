import { useCallback } from 'react'
import type { InputElement } from '../types'
import type { ValueWithErrors } from 'features/input/mainInputSlice/utils/textTesters/runTextTesters'

interface Props {
  caretPosition: number
  onCaretPositionChange: (newPosition: number) => void
  inputElem: InputElement
  arrayOfElements: ValueWithErrors | null
}

interface SetCaretPosition {
  (caretPosition: number): void
}

const useCaretPosition = ({
  caretPosition,
  onCaretPositionChange,
  inputElem,
  arrayOfElements,
}: Props): SetCaretPosition => {
  const setCaretPosition = useCallback(() => {
    if (!inputElem) return

    const { targetNode, targetOffset } = (() => {
      if (!arrayOfElements) {
        return {
          targetNode: inputElem.firstChild,
          targetOffset: caretPosition,
        }
      }

      let lengthOfPrevElements = 0
      let offset = 0

      const targetIndex = arrayOfElements.findIndex((elem) => {
        if (lengthOfPrevElements + elem.value.length >= caretPosition) {
          offset = caretPosition - lengthOfPrevElements
          return true
        }

        lengthOfPrevElements += elem.value.length
        return false
      })

      return {
        targetNode:
          inputElem.children[targetIndex !== -1 ? targetIndex : 0].firstChild,
        targetOffset: offset,
      }
    })()

    if (!targetNode) return

    const range = document.createRange()
    const selection = window.getSelection()

    range.setStart(targetNode, targetOffset)
    range.collapse(true)

    selection?.removeAllRanges()
    selection?.addRange(range)
  }, [arrayOfElements, caretPosition, inputElem])

  return setCaretPosition
}

export default useCaretPosition
