import { createMuiTheme } from '@material-ui/core'

export const FONT_FAMILY = '"Roboto", "Helvetica", "Arial", sans-serif'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffc107',
    },
    secondary: {
      main: '#ff9100',
    },
  },
  typography: {
    fontSize: 10,
    fontFamily: FONT_FAMILY,
  },
})

export default theme
