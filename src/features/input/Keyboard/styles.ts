import { makeStyles } from '@material-ui/core/styles'

// todo: CHAR-37/add round ripple
// const rippleSize = ' 30vw'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    background: '#f5f5f5',
  },

  button: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: '2.5rem',

    // todo: CHAR-37/add round ripple
    // '& .MuiTouchRipple-root': {
    //   marginLeft: `calc(50% - ${rippleSize} / 2)`,
    //   height: rippleSize,
    //   width: rippleSize,
    //   borderRadius: '50%',
    // },
  },

  rightButtons: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}))

export default useStyles
