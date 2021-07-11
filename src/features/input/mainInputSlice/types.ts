import type { ValueWithErrors } from './utils/textTesters/runTextTesters'

export type ValueToRender = ValueWithErrors | string

export interface MainInputState {
  value: string
  // equal the value or the modified value with styles, such as highlighted errors
  valueToRender: ValueToRender
  preResult: null | string
  error: string | null
  cursorPosition: number
}

export type NumberKeys =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'

export enum OperatorKeys {
  Plus = '+',
  Minus = '-',
  Div = '÷',
  Mult = '×',
  Decimal = '.',
  Colon = ':',
}

export const DEL_KEY = 'DEL_KEY'

export type GeneralKey = NumberKeys | OperatorKeys

export interface HandleKeyPressFunc {
  (prevInputValue: string, cursorPosition: number, pressedKey?: GeneralKey): {
    newInputValue: string
    newCursorPosition: number
    isTestModeStrict: boolean
  }
}
