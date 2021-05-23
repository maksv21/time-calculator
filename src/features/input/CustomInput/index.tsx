import { FC, useRef } from 'react'

import useStyles from './styles'
import type { InputElement } from './types'

import useDynamicFontSize from './utils/useDynamicFontSize'
import useMouseWheelScroll from './utils/useMouseWheelScroll'

interface Props {
  value?: string
  cursorPosition?: number
  fontSize?: number // rem
  minFontSize?: number // rem
}

const CustomInput: FC<Props> = ({ value, fontSize = 1.6, minFontSize }) => {
  const inputRef = useRef<InputElement>(null)

  const currentFontSize = useDynamicFontSize({
    value,
    inputElem: inputRef.current,
    fontSize,
    minFontSize,
  })

  useMouseWheelScroll(inputRef.current)

  const classes = useStyles({ fontSize: currentFontSize })

  return (
    <div className={classes.root}>
      <div className={classes.input} ref={inputRef}>
        <span className={classes.padding} />
        {value}
        <span className={classes.padding} />
      </div>
    </div>
  )
}

export default CustomInput
