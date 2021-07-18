import { useCallback, useEffect, useRef, useState } from 'react'

import useStyles from './styles'
import type { FC, ChangeEvent } from 'react'
import type {
  InputElement,
  CaretPositionChangeHandler,
  InputRootElement,
  CaretElement,
  InputValue,
} from './types'

import useMouseWheelScroll from './hooks/useMouseWheelScroll'
import useCaretPosition from './hooks/useCaretPosition'
import { OperatorKeys } from '../../mainInputSlice/types'
import useCaretAnimation from './hooks/useCaretAnimation'
import useDynamicFontSize from './hooks/useDynamicFontSize'
import useCaretMargin from './hooks/useCaretMargin'

interface Props {
  value: InputValue
  valueOneString: string | null
  onInput: (newInputValue: string) => void
  caretPosition: number
  onCaretPositionChange: CaretPositionChangeHandler
  fontSize?: number // rem
  minFontSize?: number // rem
}

const CustomInput: FC<Props> = ({
  value,
  valueOneString,
  onInput,
  fontSize = 1.6,
  minFontSize,
  caretPosition,
  onCaretPositionChange,
}) => {
  const [isInputFocused, setIsInputFocused] = useState(true)

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
    if (isInputFocused) inputRef.current?.focus({ preventScroll: true })
  }, [isInputFocused])

  useEffect(() => inputRef.current?.focus(), [])

  const handleInput = useCallback(
    (event: ChangeEvent<HTMLDivElement>) => {
      const newInputValue =
        event.target.textContent
          ?.replace('/', OperatorKeys.Div)
          .replace('*', OperatorKeys.Mult) || ''

      onInput(newInputValue)
    },

    [onInput]
  )

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
