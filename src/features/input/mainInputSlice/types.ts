import type { ValueWithErrors } from './utils/textTesters/runTextTesters'

export type ValueToRender = ValueWithErrors | string | null

export interface MainInputState {
  value: string
  // equal the value or the modified value with styles, such as highlighted errors
  valueToRender: ValueToRender
  preResult: null | string
  error: string | null
  caretPosition: number
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
  (prevInputValue: string, caretPosition: number, pressedKey?: GeneralKey): {
    newValue: string
    newCaretPosition: number
    isTestModeStrict: boolean
  }
}
