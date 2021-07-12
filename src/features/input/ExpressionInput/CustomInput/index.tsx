import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import ReactDOMServer from 'react-dom/server'

import type { FC, ChangeEvent, ReactNode } from 'react'
import useStyles from './styles'
import type {
  InputElement,
  CaretPositionChangeHandler,
  InputRootElement,
} from './types'

import useDynamicFontSize from './hooks/useDynamicFontSize'
import useMouseWheelScroll from './hooks/useMouseWheelScroll'
import useCaretPosition from './hooks/useCaretPosition'
import type { ValueWithErrors } from '../../mainInputSlice/utils/textTesters/runTextTesters'
import { OperatorKeys } from '../../mainInputSlice/types'

interface Props {
  value: ReactNode
  arrayOfElements: ValueWithErrors | null
  onInput: (newInputValue: string) => void
  caretPosition: number
  onCaretPositionChange: CaretPositionChangeHandler
  fontSize?: number // rem
  minFontSize?: number // rem
}

const CustomInput: FC<Props> = ({
  value,
  arrayOfElements,
  onInput,
  fontSize = 1.6,
  minFontSize,
  caretPosition,
  onCaretPositionChange,
}) => {
  const [random, setRandom] = useState(1)
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

  const setCaretPosition = useCaretPosition({
    caretPosition,
    onCaretPositionChange,
    inputElem: inputRef.current,
    arrayOfElements,
  })

  useLayoutEffect(
    () => setCaretPosition(caretPosition),
    [caretPosition, setCaretPosition]
  )

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

  const handleInput = useCallback(
    (event: ChangeEvent<HTMLDivElement>) => {
      const newInputValue =
        event.target.textContent
          ?.replace('/', OperatorKeys.Div)
          .replace('*', OperatorKeys.Mult) || ''

      onInput(newInputValue)

      event.target.innerHTML = ReactDOMServer.renderToStaticMarkup(<>{value}</>)
      setCaretPosition(caretPosition)
    },

    [caretPosition, onInput, setCaretPosition, value]
  )

  return (
    <div className={classes.root} ref={rootRef}>
      <div
        className={classes.input}
        ref={inputRef}
        contentEditable
        onBlur={handleBlur}
        onInput={handleInput}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: ReactDOMServer.renderToStaticMarkup(<>{value}</>),
        }}
      />
    </div>
  )
}

export default CustomInput
