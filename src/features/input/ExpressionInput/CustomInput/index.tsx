import { useCallback, useEffect, useRef } from 'react'

import useStyles from './styles'
import type { FC } from 'react'
import type {
  InputElement,
  CaretPositionChangeHandler,
  InputRootElement,
  CaretElement,
  InputValue,
  InputHandler,
} from './types'

import useMouseWheelScroll from './hooks/useMouseWheelScroll'
import useCaretPosition from './hooks/useCaretPosition'
import useCaretAnimation from './hooks/useCaretAnimation'
import useDynamicFontSize from './hooks/useDynamicFontSize'
import useCaretMargin from './hooks/useCaretMargin'
import useHardwareKeyboard from './hooks/useHardwareKeyboard'
import useScrollToCaret from './hooks/useScrollToCaret'

interface Props {
  value: InputValue
  valueOneString: string | null
  fontSize?: number // rem
  minFontSize?: number // rem
  caretPosition: number
  onInput: InputHandler
  onEqualsKeyPressed: () => void
  onCaretPositionChange: CaretPositionChangeHandler
}

const CustomInput: FC<Props> = ({
  value,
  valueOneString,
  fontSize = 1.6,
  minFontSize,
  caretPosition,
  onInput,
  onEqualsKeyPressed,
  onCaretPositionChange,
}) => {
  const isInputFocused = true

  const rootRef = useRef<InputRootElement>(null)
  const inputRef = useRef<InputElement>(null)

  const caretRef = useRef<CaretElement>(null)
  const inputForCalculationRef = useRef<InputElement>(null)

  useHardwareKeyboard({
    isInputFocused,
    valueOneString,
    caretPosition,
    onInput,
    onCaretPositionChange,
    onEqualsKeyPressed,
  })

  const currentFontSize = useDynamicFontSize({
    value,
    inputElem: inputRef.current,
    inputRootElem: rootRef.current,
    fontSize,
    minFontSize,
  })

  const classes = useStyles({ fontSize: currentFontSize })

  useMouseWheelScroll(rootRef.current)

  useCaretPosition({
    caretElem: caretRef.current,
    onCaretPositionChange,
    inputElem: inputRef.current,
  })

  const handleBlur = useCallback(() => {
    inputRef.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    if (isInputFocused) inputRef.current?.focus()
  }, [isInputFocused])

  useCaretAnimation({
    caretElem: caretRef.current,
    caretPosition,
    valueOneString,
    isCursorVisible: true,
    blinkingAnimationClass: classes.blinkingAnimation,
  })

  const caretMargin = useCaretMargin(
    inputForCalculationRef.current,
    valueOneString,
    caretPosition
  )

  useScrollToCaret(rootRef.current, caretRef.current, valueOneString)

  return (
    <>
      <div className={classes.inputForCalculation} ref={inputForCalculationRef}>
        {valueOneString}
      </div>
      <div className={classes.root} ref={rootRef}>
        <div className={classes.input} ref={inputRef} onBlur={handleBlur}>
          {value}
          <span
            className={classes.caret}
            ref={caretRef}
            style={{ right: caretMargin }}
          />
        </div>
      </div>
    </>
  )
}

export default CustomInput
