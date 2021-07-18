// separate file to omit circular file dependency
export type InputRootElement = HTMLDivElement | null
export type InputElement = HTMLDivElement | null
export type CaretElement = HTMLDivElement | null

export interface CaretPositionChangeHandler {
  (newPosition: number): void
}

export type InputValue = string | null | JSX.Element[]
