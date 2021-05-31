import { useRef } from 'react'

import type { FC } from 'react'
import useStyles from './styles'
import type { CursorElement, InputElement, InputValue } from './types'
import useCursor from './utils/useCursor'

import useDynamicFontSize from './utils/useDynamicFontSize'
import useMouseWheelScroll from './utils/useMouseWheelScroll'

interface Props {
  value?: InputValue
  cursorPosition?: number
  fontSize?: number // rem
  minFontSize?: number // rem
}

const CustomInput: FC<Props> = ({ value, fontSize = 1.6, minFontSize }) => {
  const inputRef = useRef<InputElement>(null)
  const cursorRef = useRef<CursorElement>(null)

  const currentFontSize = useDynamicFontSize({
    value,
    inputElem: inputRef.current,
    fontSize,
    minFontSize,
  })

  useMouseWheelScroll(inputRef.current)
  useCursor({ cursorElem: cursorRef.current, inputValue: value })

  const classes = useStyles({ fontSize: currentFontSize })

  return (
    <div className={classes.root}>
      <div className={classes.input} ref={inputRef}>
        <div className={classes.cursor} ref={cursorRef} />
        <span className={classes.padding} />
        {value}
        <span className={classes.padding} />
      </div>
    </div>
  )
}

export default CustomInput
