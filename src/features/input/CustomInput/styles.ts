import { makeStyles } from '@material-ui/core'

import type { Theme } from '@material-ui/core'

export interface Props {
  fontSize: number
}

const inputPadding = '25px'

const useStyles = makeStyles<Theme, Props>((theme) => ({
  root: {
    transition: 'padding 0.1s',
  },
  padding: {
    width: inputPadding,
    display: 'inline-block',
  },
  input: {
    overflow: 'auto',
    transition: 'all 0.1s',
    whiteSpace: 'nowrap',
    fontSize: (props) => `${props.fontSize}rem`,

    /* Hide scrollbar for Chromium browsers */
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    /* Hide scrollbar for Firefox */
    'scrollbar-width': 'none' /* Firefox */,

    // for cursor
    position: 'relative',
  },
  cursor: {
    background: theme.palette.primary.contrastText,
    width: '.2rem',
    height: (props) => `${props.fontSize + 0.5}rem`,
    position: 'absolute',
    display: 'inline-block',
    right: 0,
    marginRight: `${parseInt(inputPadding, 10) - 2}px`, // indent the cursor a bit to the right
  },
}))

export default useStyles
