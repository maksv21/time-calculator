import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  '@keyframes blinking': {
    '50%': {
      opacity: 0,
    },
  },
  blinkingAnimation: {
    animation: '$blinking 1.3s step-start 0s infinite',
  },
}))

export default useStyles
