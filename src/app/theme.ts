import { createMuiTheme } from '@material-ui/core'
import type { Theme } from '@material-ui/core'

export const FONT_FAMILY = '"Roboto", "Helvetica", "Arial", sans-serif'

const createTheme = (isDarkModeEnabled?: boolean): Theme =>
  createMuiTheme({
    palette: {
      type: isDarkModeEnabled ? 'dark' : 'light',

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

export default createTheme
