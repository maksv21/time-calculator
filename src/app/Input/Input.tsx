/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import type { FC, HTMLProps, MouseEventHandler } from 'react'
import useStyles from './styles'

export const nonValueElementAttribute = 'non-value-element'

type InputProps = {
  value: string
  caretAlign?: 'left' | 'right'
} & HTMLProps<HTMLInputElement>

type ValueCharacter = HTMLSpanElement

const isValueCharacter = (element?: any): element is ValueCharacter =>
  !!element?.dataset.customInputCharacter

export const Input: FC<InputProps> = ({
  children,
  style,
  className,
  value,
  caretAlign = 'left',
  ...props
}) => {
  const styles = useStyles()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  const [innerValue, setInnerValue] = useState('')
  // todo if default focused
  const [isFocused, setIsFocused] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const caretRef = useRef<HTMLInputElement>(null)
  const textfieldRef = useRef<HTMLDivElement>(null)

  const [caretMargin, setCaretMargin] = useState(0)

  const setCaretPosition = useCallback(
    (element: HTMLInputElement, position: number | [number, number]) => {
      const [start, end] =
        typeof position === 'number' ? [position, position] : position

      element.selectionStart = start
      element.selectionEnd = end
    },
    []
  )

  // useCaretPosition({
  //   onCaretPositionChange: (...propss: any) => console.log('caret', ...propss),
  //   caretElem: caretRef.current,
  //   inputElem: textfieldRef.current,
  // })

  useEffect(() => {
    const textfield = textfieldRef.current
    const input = inputRef.current
    if (!textfield || !input) return

    // const newValue = [...textfield.childNodes].reduce<string>(
    //   (result, child) => {
    //     const isTextNode = child instanceof Text
    //     const isValueElement =
    //       child instanceof HTMLElement &&
    //       Boolean(child.dataset[nonValueElementAttribute])

    //     return isTextNode || isValueElement
    //       ? result + (child.textContent ?? '')
    //       : result
    //   },
    //   ''
    // )

    setInnerValue(value)
    input.value = value
  }, [value])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  useEffect(() => {
    const input = inputRef.current
    if (!input) return undefined

    input.addEventListener('blur', handleInputBlur)

    return () => input.removeEventListener('blur', handleInputBlur)
  }, [handleInputBlur])

  const handleTextfieldFocus = useCallback(() => {
    const input = inputRef.current
    if (!input) return

    input.focus()
    setIsFocused(true)
  }, [])

  useEffect(() => {
    const textfield = textfieldRef.current
    if (!textfield) return undefined

    textfield.addEventListener('focus', handleTextfieldFocus)

    return () => textfield.removeEventListener('focus', handleTextfieldFocus)
  })

  const handleTextfieldClick: MouseEventHandler<HTMLDivElement> = useCallback(
    ({ target, ...event }) => {
      const textfield = textfieldRef.current
      const input = inputRef.current

      if (!textfield || !input || !isValueCharacter(target)) return

      const valueCharacters = [
        ...textfield.querySelectorAll('[data-custom-input-character]'),
      ]

      const characterIndex = valueCharacters.indexOf(target)

      if (characterIndex < 0) return
      debugger
      // console.log('client', event.clientX, event.clientY, target.offsetWidth)
      const textfieldBoundary = textfield.getBoundingClientRect()
      const elemBoundary = target.getBoundingClientRect()
      console.log(
        'client',
        elemBoundary.left + target.offsetWidth,
        event.clientX,
        target.offsetWidth
      )

      const eventClientXOnTarget = event.clientX - elemBoundary.x

      const shouldShiftToRight = eventClientXOnTarget > elemBoundary.width / 2

      const newCaretPosition = shouldShiftToRight
        ? characterIndex + 1
        : characterIndex

      setCaretPosition(input, newCaretPosition)

      const newCaretMargin = elemBoundary.x - textfieldBoundary.x
      setCaretMargin(
        shouldShiftToRight
          ? newCaretMargin + elemBoundary.width
          : newCaretMargin
      )
    },
    [setCaretPosition]
  )

  return (
    <>
      <div />
      <div className="for_calculations">
        <input type="text" tabIndex={-1} ref={inputRef} {...props} />
        <div
          ref={caretRef}
          style={{
            position: 'absolute',
            left: `${caretMargin - 1}px`,
            color: 'black',
            width: '1px',
          }}
        >
          |
        </div>
      </div>
      <div
        style={style}
        aria-label={innerValue}
        className={clsx(
          styles.input,
          isFocused && styles.inputFocused,
          className
        )}
        ref={textfieldRef}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        onMouseDown={handleTextfieldClick}
      >
        {children}
      </div>
    </>
  )
}
