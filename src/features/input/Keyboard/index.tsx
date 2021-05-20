import { FC, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'

import { ButtonBase } from '@material-ui/core'
import {
  clearAllKeyPressed,
  deleteKeyPressed,
  equalsKeyPressed,
  generalKeyPressed,
  OperatorKeys,
} from '../mainInputSlice'

import type { GeneralKey } from '../mainInputSlice'
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

  const CalcButton: FC<{
    onClick: () => void
    children: string
  }> = ({ onClick, children }) => (
    <ButtonBase className={styles.button} onClick={onClick}>
      {children}
    </ButtonBase>
  )

  return (
    <Grid className={styles.root} container xs={12}>
      <Grid container item xs={9}>
        {BUTTONS_LEFT.map((buttonsRow) => (
          <Grid item container xs={12} key={buttonsRow.toString()}>
            {buttonsRow.map((btnValue) => (
              <CalcButton
                key={btnValue.toString()}
                onClick={() => handleKeyClick(btnValue)}
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
        <CalcButton onClick={handleDelClick}>DEL</CalcButton>

        {OPERATORS_RIGHT.map((btnValue) => (
          <CalcButton
            key={btnValue.toString()}
            onClick={() => handleKeyClick(btnValue)}
          >
            {btnValue}
          </CalcButton>
        ))}

        <CalcButton onClick={handleEqualsClick}>=</CalcButton>
      </Grid>
    </Grid>
  )
}

export default Keyboard
