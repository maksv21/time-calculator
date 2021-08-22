import { useCallback, useEffect } from 'react'
import { inputPadding } from '../styles'
import type { CaretElement, InputElement } from '../types'

const useScrollToCaret = (
  inputElem: InputElement,
  caretElement: CaretElement,
  valueOneString: string | null
): void => {
  const scrollToCaret = useCallback(() => {
    if (!inputElem || !caretElement) return

    const visibleRange = {
      left: inputElem.scrollLeft + inputPadding,
      right: inputElem.scrollLeft + inputElem.clientWidth - inputPadding,
    }

    const caretLeftMargin =
      caretElement.getBoundingClientRect().left +
      inputPadding +
      inputElem.scrollLeft

    const isCaretVisible =
      caretLeftMargin > visibleRange.left &&
      caretLeftMargin < visibleRange.right

    if (!isCaretVisible)
      inputElem.scrollTo({
        left: caretLeftMargin - inputElem.clientWidth,
        behavior: 'smooth',
      })
  }, [caretElement, inputElem])

  useEffect(() => {
    scrollToCaret()
  }, [scrollToCaret, valueOneString])
}

export default useScrollToCaret
