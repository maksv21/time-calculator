import React, { FC, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import {
  clearAllKeyPressed,
  deleteKeyPressed,
  equalsKeyPressed,
  generalKeyPressed,
  OperatorKeys,
} from './mainInputSlice'
import type { GeneralKey } from './mainInputSlice'

const Keyboard: FC = () => {
  const dispatch = useDispatch()

  const BUTTONS_LEFT: GeneralKey[][] = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    [OperatorKeys.Decimal, '0', OperatorKeys.Colon],
  ]

  const OPERATORS_RIGHT = [
    OperatorKeys.Div,
    OperatorKeys.Mult,
    OperatorKeys.Minus,
    OperatorKeys.Plus,
  ]

  const handleKeyClick = useCallback(
    (clickedKeyValue: GeneralKey) =>
      dispatch(generalKeyPressed(clickedKeyValue)),
    [dispatch]
  )

  const handleEqualsClick = useCallback(
    () => dispatch(equalsKeyPressed()),
    [dispatch]
  )

  const handleDelClick = useCallback(
    () => dispatch(deleteKeyPressed()),
    [dispatch]
  )

  const handleClearAllClick = useCallback(
    () => dispatch(clearAllKeyPressed()),
    [dispatch]
  )

  return (
    <div>
      <div>
        {BUTTONS_LEFT.map((buttonsRow) => (
          <div key={buttonsRow.toString()}>
            {buttonsRow.map((btnValue) => (
              <button type="button" onClick={() => handleKeyClick(btnValue)}>
                {btnValue}
              </button>
            ))}
          </div>
        ))}
        <button type="button" onClick={handleEqualsClick}>
          =
        </button>
      </div>

      <button type="button" onClick={handleDelClick}>
        C
      </button>
      <button type="button" onClick={handleClearAllClick}>
        DEL
      </button>

      {OPERATORS_RIGHT.map((btnValue) => (
        <button type="button" onClick={() => handleKeyClick(btnValue)}>
          {btnValue}
        </button>
      ))}
      <div />
    </div>
  )
}

export default Keyboard
