import { makeStyles } from '@material-ui/core'

import type { Theme } from '@material-ui/core'

export interface Props {
  fontSize: number
}

export const inputPadding = 25
const caretWidth = 2

const useStyles = makeStyles<Theme, Props>((theme) => ({
  root: {
    cursor: 'text',
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
    minHeight: 64,
    position: 'relative',
    whiteSpace: 'nowrap',
    fontSize: (props) => `${props.fontSize}rem`,
    marginLeft: 'auto',
    padding: `0 ${inputPadding}px`,
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
    marginRight: `${inputPadding - caretWidth / 2}px`, // -
    transition: 'all 0.1s',
    pointerEvents: 'none',
  },
}))

export default useStyles
