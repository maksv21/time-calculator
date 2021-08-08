import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
    maxHeight: '1200px',
    background: '#f5f5f5',
  },

  expressionInput: {
    background: 'white',
    height: '30%',
    position: 'relative',
    boxShadow: '0px 0px 7px rgb(0 0 0 / 25%)',
  },

  keyboard: {
    height: '70%',
    maxWidth: '900px',
    margin: '0 auto',
  },

  caret: {},
}))

export default useStyles
