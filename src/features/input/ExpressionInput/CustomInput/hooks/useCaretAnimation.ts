import { useEffect, useRef, useState } from 'react'
import type { CaretElement } from '../types'

interface Props {
  caretElem: CaretElement
  valueOneString: string | null
  caretPosition: number
  isCursorVisible: boolean
  blinkingAnimationClass: string
}

const useCaretAnimation = ({
  caretElem,
  valueOneString,
  isCursorVisible,
  blinkingAnimationClass,
  caretPosition,
}: Props): void => {
  const [isCursorAnimationVisible, setCursorAnimationVisibility] =
    useState(true)

  const timerIdRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (!caretElem) return

    if (isCursorAnimationVisible) {
      caretElem.classList.add(blinkingAnimationClass)
    } else {
      caretElem.classList.remove(blinkingAnimationClass)
    }

    return () => {
      caretElem.classList.remove(blinkingAnimationClass)
    }
  }, [isCursorAnimationVisible, blinkingAnimationClass, caretElem])

  useEffect(() => {
    if (!caretElem || !isCursorVisible) return

    setCursorAnimationVisibility(false)

    timerIdRef.current = setTimeout(
      () => setCursorAnimationVisibility(true),
      500
    )

    return () => {
      if (timerIdRef.current) clearTimeout(timerIdRef.current)
    }
  }, [valueOneString, caretPosition, caretElem, isCursorVisible])
}

export default useCaretAnimation
