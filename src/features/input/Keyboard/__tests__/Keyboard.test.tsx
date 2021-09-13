import { act, cleanup, fireEvent, screen } from '@testing-library/react'

import { renderWithStore } from 'utils/tests'
import { DEL_KEY, OperatorKeys } from 'features/input/mainInputSlice/types'
import { useDispatch } from 'react-redux'
import {
  clearAllKeyPressed,
  equalsKeyPressed,
  generalOrDelKeyPressed,
} from 'features/input/mainInputSlice'
import Keyboard from '..'

jest.mock('react-redux', () => {
  const dispatch = jest.fn()

  return {
    ...jest.requireActual('react-redux'),
    useDispatch: () => dispatch,
  }
})

navigator.vibrate = jest.fn()

describe('Keyboard tests', () => {
  beforeEach(() => renderWithStore(<Keyboard />))
  afterEach(() => {
    cleanup()
    navigator.vibrate.mockClear()
    useDispatch().mockClear()
  })

  it.each([
    ...new Array(10).fill(1).map((_, index) => index.toString()),
    OperatorKeys.Colon,
    OperatorKeys.Decimal,
    OperatorKeys.Div,
    OperatorKeys.Minus,
    OperatorKeys.Mult,
    OperatorKeys.Plus,
  ])('should render button %s', (buttonValue) => {
    expect(screen.getByText(buttonValue)).toBeInTheDocument()
  })

  it.each([
    ['1', generalOrDelKeyPressed('1')],
    ['DEL', generalOrDelKeyPressed(DEL_KEY)],
    ['=', equalsKeyPressed()],
  ])('if user clicked any key should dispatch event', (buttonValue, action) => {
    const dispatch = useDispatch()

    act(() => {
      fireEvent.mouseUp(screen.getByText(buttonValue))
    })

    expect(dispatch).toBeCalledWith(action)
  })

  it('if user clicked any key should call vibrate', () => {
    act(() => {
      ;['1', 'DEL', '='].forEach((buttonValue) =>
        fireEvent.touchStart(screen.getByText(buttonValue), {
          touches: [{ clientX: 0, clientY: 0 }],
        })
      )
    })

    expect(navigator.vibrate).toBeCalledTimes(3)
  })

  it('if user hold the del button should dispatch the clear all event', (done) => {
    const dispatch = useDispatch()

    act(() => {
      fireEvent.mouseDown(screen.getByText('DEL'))
    })

    setTimeout(() => {
      expect(dispatch).toBeCalledWith(clearAllKeyPressed())
      done()
    }, 400)
  })
})
