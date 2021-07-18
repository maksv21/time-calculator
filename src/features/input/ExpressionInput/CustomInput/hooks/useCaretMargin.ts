import { useCallback, useEffect, useState } from 'react'
import type { InputElement } from '../types'

const useCaretMargin = (
  inputElem: InputElement,
  inputValue: string | null,
  caretPosition: number
): number => {
  const [margin, setMargin] = useState(0)

  const handleCaretPositionUpdate: () => number | void = useCallback(() => {
    if (!inputElem?.firstChild || !inputValue) return
    // timeout to get new position after rendering
    const timerId = setTimeout(() => {
      if (!inputElem?.firstChild || !inputValue) return

      const range = new Range()
      range.setStart(inputElem.firstChild, caretPosition)
      range.setEnd(inputElem.firstChild, inputValue.length)

      const rangeWidth = range.getBoundingClientRect().width

      setMargin(rangeWidth)
    })

    return timerId
  }, [inputElem, inputValue, caretPosition])

  useEffect(() => {
    const timerId = handleCaretPositionUpdate()

    return () => {
      if (timerId) clearTimeout(timerId)
    }
  }, [handleCaretPositionUpdate])

  useEffect(() => {
    window.addEventListener('resize', handleCaretPositionUpdate)
    return () => window.removeEventListener('resize', handleCaretPositionUpdate)
  }, [handleCaretPositionUpdate])

  return margin
}

export default useCaretMargin
