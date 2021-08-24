import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { ButtonBase } from '@material-ui/core'
import { useLongPress } from 'react-use'
import type { FC } from 'react'

import {
  clearAllKeyPressed,
  equalsKeyPressed,
  generalOrDelKeyPressed,
} from '../mainInputSlice'

import type { GeneralKey } from '../mainInputSlice/types'
import { DEL_KEY, OperatorKeys } from '../mainInputSlice/types'

import useStyles from './styles'

const Keyboard: FC = () => {
  const styles = useStyles()
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
      dispatch(generalOrDelKeyPressed(clickedKeyValue)),
    [dispatch]
  )

  const handleEqualsClick = useCallback(
    () => dispatch(equalsKeyPressed()),
    [dispatch]
  )

  const handleDelClick = useCallback(
    () => dispatch(generalOrDelKeyPressed(DEL_KEY)),
    [dispatch]
  )

  const vibrate = useCallback(() => {
    navigator.vibrate(5)
  }, [])

  const handleDelLongPress = useLongPress(
    useCallback(() => {
      vibrate()
      dispatch(clearAllKeyPressed())
    }, [dispatch, vibrate]),
    { isPreventDefault: false, delay: 350 }
  )

  const CalcButton: FC<{
    onMouseUp: () => void
    onTouchStart?: (e: React.TouchEvent<HTMLButtonElement>) => void
    children: string
  }> = ({ children, onTouchStart, ...props }) => (
    <ButtonBase
      {...props}
      className={styles.button}
      onTouchStart={(e) => {
        vibrate()
        if (onTouchStart) onTouchStart(e)
      }}
    >
      {children}
    </ButtonBase>
  )

  return (
    <Grid className={styles.root} container>
      <Grid container item xs={9}>
        {BUTTONS_LEFT.map((buttonsRow) => (
          <Grid item container xs={12} key={buttonsRow.toString()}>
            {buttonsRow.map((btnValue) => (
              <CalcButton
                key={btnValue.toString()}
                onMouseUp={() => handleKeyClick(btnValue)}
              >
                {btnValue}
              </CalcButton>
            ))}
          </Grid>
        ))}
      </Grid>

      <Grid
        className={styles.rightButtons}
        container
        item
        xs={3}
        direction="column"
      >
        <CalcButton
          {...handleDelLongPress}
          onMouseUp={() => {
            handleDelClick()
            handleDelLongPress.onMouseUp()
          }}
        >
          DEL
        </CalcButton>

        {OPERATORS_RIGHT.map((btnValue) => (
          <CalcButton
            key={btnValue.toString()}
            onMouseUp={() => handleKeyClick(btnValue)}
          >
            {btnValue}
          </CalcButton>
        ))}

        <CalcButton onMouseUp={handleEqualsClick}>=</CalcButton>
      </Grid>
    </Grid>
  )
}

export default Keyboard
