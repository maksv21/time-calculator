import { makeStyles } from '@material-ui/core'

import type { Theme } from '@material-ui/core'

export interface Props {
  fontSize: number
}

const inputPadding = '25px'
const caretWidth = '2px'

const useStyles = makeStyles<Theme, Props>((theme) => ({
  root: {
    display: 'flex',
    overflow: 'auto',
    /* Hide scrollbar for Chromium browsers */
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    /* Hide scrollbar for Firefox */
    'scrollbar-width': 'none',
  },
  input: {
    position: 'relative',

    whiteSpace: 'nowrap',
    fontSize: (props) => `${props.fontSize}rem`,
    marginLeft: 'auto',
    padding: `0 ${inputPadding}`,
    transition: 'font-size 0.1s',
    outline: 'none',
  },

  inputForCalculation: {
    whiteSpace: 'nowrap',
    fontSize: (props) => `${props.fontSize}rem`,
    visibility: 'hidden',
    height: '0',
  },
  '@keyframes blinking': {
    '50%': {
      opacity: 0,
    },
  },
  blinkingAnimation: {
    animation: '$blinking 1.3s step-start 0s infinite',
  },
  caret: {
    background: theme.palette.primary.contrastText,
    width: caretWidth,
    height: (props) => `${props.fontSize + 0.5}rem`,
    position: 'absolute',
    marginRight: `${
      parseInt(inputPadding, 10) - parseInt(caretWidth, 10) / 2
    }px`, // -
    transition: 'all 0.1s',
    pointerEvents: 'none',
  },
}))

export default useStyles
