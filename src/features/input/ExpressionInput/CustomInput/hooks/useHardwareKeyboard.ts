import { OperatorKeys } from 'features/input/mainInputSlice/types'
import { useCallback, useEffect } from 'react'
import type { CaretPositionChangeHandler, InputHandler } from '../types'

interface Props {
  isInputFocused: boolean
  valueOneString: string | null
  caretPosition: number
  onInput: InputHandler
  onCaretPositionChange: CaretPositionChangeHandler
  onEqualsKeyPressed: () => void
}

const useHardwareKeyboard = ({
  isInputFocused,
  valueOneString,
  caretPosition,
  onInput,
  onCaretPositionChange,
  onEqualsKeyPressed,
}: Props): void => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const value = valueOneString || ''

      if (e.key === '=') {
        onEqualsKeyPressed()
      } else if (e.key === 'Backspace') {
        if (caretPosition !== 0) {
          onInput(
            value.slice(0, caretPosition - 1) + value.slice(caretPosition),
            caretPosition - 1,
            false
          )
        }
      } else if (e.key === 'Delete') {
        if (caretPosition !== value.length) {
          onInput(
            value.slice(0, caretPosition) + value.slice(caretPosition + 1),
            caretPosition,
            false
          )
        }
      } else if (e.key.length === 1) {
        const pressedKey = e.key
          .replace('/', OperatorKeys.Div)
          .replace('*', OperatorKeys.Mult)

        onInput(
          value.substring(0, caretPosition) +
            pressedKey +
            value.substring(caretPosition),
          caretPosition + 1,
          true
        )
      } else if (e.key === 'ArrowLeft') {
        if (caretPosition > 0) onCaretPositionChange(caretPosition - 1)
      } else if (e.key === 'ArrowRight') {
        if (caretPosition < value.length)
          onCaretPositionChange(caretPosition + 1)
      }
    },
    [
      caretPosition,
      onCaretPositionChange,
      onEqualsKeyPressed,
      onInput,
      valueOneString,
    ]
  )

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      if (!e.clipboardData) return

      const value = valueOneString || ''
      const pastedValue = e.clipboardData.getData('text/plain')

      onInput(
        value.substring(0, caretPosition) +
          pastedValue +
          value.substring(caretPosition),
        pastedValue.length,
        false
      )
    },
    [caretPosition, onInput, valueOneString]
  )

  useEffect(() => {
    if (isInputFocused) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('paste', handlePaste)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isInputFocused, handleKeyDown, handlePaste])
}

export default useHardwareKeyboard
