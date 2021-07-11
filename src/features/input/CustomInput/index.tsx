import { useCallback, useEffect, useRef, useState } from 'react'

import type { FC } from 'react'
import useStyles from './styles'
import type {
  InputElement,
  InputValue,
  CursorPositionChangeHandler,
  InputRootElement,
} from './types'

import useDynamicFontSize from './hooks/useDynamicFontSize'
import useMouseWheelScroll from './hooks/useMouseWheelScroll'

interface Props {
  value: InputValue
  onInput: (newInputValue: string) => void
  cursorPosition: number
  onCursorPositionChange?: CursorPositionChangeHandler
  fontSize?: number // rem
  minFontSize?: number // rem
}

const setCursorPosition = (node: InputElement, cursorPosition: number) => {
  if (!node) return
  node.focus({ preventScroll: true })
  const textNode = node.firstChild
  console.log(node, textNode, node.firstChild)
  if (!textNode) return

  const caret = 10 // insert caret after the 10th character say
  const range = document.createRange()
  range.setStart(textNode, caret)
  range.setEnd(textNode, caret)
  const sel = window.getSelection()
  sel?.removeAllRanges()
  sel?.addRange(range)
}

const CustomInput: FC<Props> = ({
  value,
  onInput,
  fontSize = 1.6,
  minFontSize,
  cursorPosition,
  onCursorPositionChange,
}) => {
  const [isInputFocused, setIsInputFocused] = useState(true)

  const rootRef = useRef<InputRootElement>(null)
  const inputRef = useRef<InputElement>(null)

  const currentFontSize = useDynamicFontSize({
    value,
    inputElem: inputRef.current,
    inputRootElem: rootRef.current,
    fontSize,
    minFontSize,
  })

  useMouseWheelScroll(rootRef.current)

  const classes = useStyles({ fontSize: currentFontSize })

  const handleBlur = useCallback(() => {
    // function setCaret() {
    //   const range = document.createRange()
    //   const sel = window.getSelection()
    //   const textNode = inputRef.current?.firstChild
    //   if (!textNode) return

    //   console.log(cursorPosition)

    //   range.setStart(textNode, cursorPosition || 0)
    //   range.collapse(true)

    //   sel?.removeAllRanges()
    //   sel?.addRange(range)
    // }

    // setCaret()

    // if (isInputFocused) setCursorPosition(inputRef.current, cursorPosition)

    if (isInputFocused) inputRef.current?.focus({ preventScroll: true })
  }, [isInputFocused])

  useEffect(() => inputRef.current?.focus(), [])

  /* const handleInput = useCallback(
    (event: ChangeEvent<HTMLDivElement>) => {
      event.target.innerText = value || ''

      const newValue = (event.nativeEvent as InputEvent).data || ''
      onInput(newValue)
    },

    [onInput]
  ) */

  /* useEffect(() => {
    if (!inputRef.current) return

    inputRef.current.innerHTML = value
  }, [value]) */

  return (
    <div className={classes.root} ref={rootRef}>
      <div
        className={classes.input}
        ref={inputRef}
        contentEditable
        onBlur={handleBlur}
        // onInput={handleInput}
      >
        {value}
      </div>
    </div>
  )
}

export default CustomInput
