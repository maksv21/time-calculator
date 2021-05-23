import { FC, useEffect, useRef, useState } from 'react'

import getTextWidth from './getTextWidth'
import useStyles from './styles'

interface Props {
  value?: string | null
  cursorPosition?: number
  fontSize?: number // rem
  minFontSize?: number // rem
}

const CustomInput: FC<Props> = ({ value, fontSize = 1.6, minFontSize }) => {
  const [currentFontSize, setCurrentFontSize] = useState(fontSize)
  const inputRef = useRef<HTMLParagraphElement>(null)
  const classes = useStyles({ fontSize: currentFontSize })

  useEffect(() => {
    if (!inputRef.current || !minFontSize) return
    const inputWidth = inputRef.current.clientWidth // without scroll
    const inputTextWidth = getTextWidth(inputRef.current) // with scroll

    if (inputTextWidth === null) return

    const textSizeDiff = (100 / inputTextWidth) * inputWidth // difference in width between the text and the input

    const newFontSize = (currentFontSize / 100) * textSizeDiff * 0.9 // -10% for better view

    if (newFontSize > fontSize) {
      setCurrentFontSize(fontSize)
    } else if (newFontSize < minFontSize) {
      setCurrentFontSize(minFontSize)
    } else {
      setCurrentFontSize(newFontSize)
    }

    // changing of currentFontSize shouldn't rerun useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, fontSize, minFontSize])

  // console.log(currentFontSize)

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
