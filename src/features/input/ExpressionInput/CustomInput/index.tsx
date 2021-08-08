import { useCallback, useEffect, useRef } from 'react'

import useStyles from './styles'
import type { FC } from 'react'
import type {
  InputElement,
  CaretPositionChangeHandler,
  InputRootElement,
  CaretElement,
  InputValue,
} from './types'

import useMouseWheelScroll from './hooks/useMouseWheelScroll'
import useCaretPosition from './hooks/useCaretPosition'
import useCaretAnimation from './hooks/useCaretAnimation'
import useDynamicFontSize from './hooks/useDynamicFontSize'
import useCaretMargin from './hooks/useCaretMargin'

interface Props {
  value: InputValue
  valueOneString: string | null
  // onInput: (newInputValue: string) => void
  caretPosition: number
  onCaretPositionChange: CaretPositionChangeHandler
  fontSize?: number // rem
  minFontSize?: number // rem
}

const CustomInput: FC<Props> = ({
  value,
  valueOneString,
  fontSize = 1.6,
  minFontSize,
  caretPosition,
  onCaretPositionChange,
}) => {
  const rootRef = useRef<InputRootElement>(null)
  const inputRef = useRef<InputElement>(null)

  const caretRef = useRef<CaretElement>(null)
  const inputForCalculationRef = useRef<InputElement>(null)

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

  useEffect(() => inputRef.current?.focus(), [])

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
