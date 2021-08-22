import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column',
    textAlign: 'right',
  },

  preResult: {
    height: '36px', // height if there's no value
    fontSize: '2.5rem',
    marginRight: '25px',
    overflow: 'auto',
    whiteSpace: 'nowrap',
    color: theme.palette.text.secondary,
  },
}))

export default useStyles
