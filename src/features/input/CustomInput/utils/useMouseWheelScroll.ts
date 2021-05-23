import { useCallback, useEffect } from 'react'

import type { InputElement } from '../types'

const useMouseWheelScroll = (inputElem: InputElement): void => {
  const handleMouseWheel = useCallback(
    (event) => {
      if (!inputElem) return

      inputElem.scrollLeft -= event.deltaY
    },
    [inputElem]
  )

  useEffect(() => {
    if (!inputElem) return

    inputElem.addEventListener('mousewheel', handleMouseWheel)

    return () => inputElem?.removeEventListener('mousewheel', handleMouseWheel)
  }, [inputElem, handleMouseWheel])
}

export default useMouseWheelScroll
