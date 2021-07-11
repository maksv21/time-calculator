import { makeStyles } from '@material-ui/core'

import type { Theme } from '@material-ui/core'

export interface Props {
  fontSize: number
}

const inputPadding = '25px'

const useStyles = makeStyles<Theme, Props>((theme) => ({
  root: {
    position: 'relative',
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
    whiteSpace: 'nowrap',
    fontSize: (props) => `${props.fontSize}rem`,
    marginLeft: 'auto',
    padding: `0 ${inputPadding}`,
    transition: 'font-size 0.1s',
    outline: 'none',
  },
}))

export default useStyles
