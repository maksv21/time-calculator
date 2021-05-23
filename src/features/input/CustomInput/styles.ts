import { makeStyles } from '@material-ui/core'

import type { Theme } from '@material-ui/core'

export interface Props {
  fontSize: number
}

const useStyles = makeStyles<Theme, Props>((theme) => ({
  root: {
    transition: 'padding 0.1s',
  },
  padding: {
    width: '15px',
    display: 'inline-block',
  },
  rootPadding: {
    padding: '0 10px',
  },
  input: {
    overflow: 'auto',
    transition: 'all 0.1s',
    whiteSpace: 'nowrap',
    fontSize: (props) => `${props.fontSize}rem`,

    /* Hide scrollbar for Chrome, Safari and Opera */
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    /* Hide scrollbar for IE, Edge and Firefox */
    '-ms-overflow-style': 'none' /* IE and Edge */,
    'scrollbar-width': 'none' /* Firefox */,
  },
}))

export default useStyles
