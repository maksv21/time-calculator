import { useEffect, useRef, useState } from 'react'
import type { CursorElement, InputValue } from '../../types'
import useStyles from './styles'

interface Props {
  cursorElem: CursorElement
  inputValue?: InputValue
  isCursorVisible: boolean
}

const useAnimation = ({
  cursorElem,
  inputValue,
  isCursorVisible,
}: Props): void => {
  const [isCursorAnimationVisible, setCursorAnimationVisibility] =
    useState(true)

  const classes = useStyles()

  const timerIdRef = useRef<ReturnType<typeof setTimeout>>()

  // apply animation to the cursor
  useEffect(() => {
    if (!cursorElem) return

    if (isCursorAnimationVisible) {
      cursorElem.classList.add(classes.blinkingAnimation)
    } else {
      cursorElem.classList.remove(classes.blinkingAnimation)
    }

    return () => {
      cursorElem.classList.remove(classes.blinkingAnimation)
    }
  }, [isCursorAnimationVisible, classes.blinkingAnimation, cursorElem])

  // stop animation on value change
  useEffect(() => {
    if (!cursorElem || !isCursorVisible) return

    setCursorAnimationVisibility(false)

    timerIdRef.current = setTimeout(
      () => setCursorAnimationVisibility(true),
      500
    )

    return () => {
      if (timerIdRef.current) clearTimeout(timerIdRef.current)
    }
  }, [inputValue, cursorElem, isCursorVisible])
}

export default useAnimation
