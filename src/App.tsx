import { StrictMode, useEffect, useMemo, useState } from 'react'
import { Provider } from 'react-redux'
import { CssBaseline, ThemeProvider, useMediaQuery } from '@material-ui/core'
import { store } from 'app/store'
import createTheme from 'app/theme'
import AppLayout from 'app/AppLayout'
import type { FC } from 'react'

const App: FC = () => {
  const isDarkModeEnabled = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(
    () => createTheme(isDarkModeEnabled),
    [isDarkModeEnabled]
  )

  // the first value of isDarkModeEnabled is always true, and there is some blinking when dark mode was enabled,
  // so render the app only when final value was set
  const [shouldRender, setShouldRender] = useState(false)
  useEffect(() => {
    setTimeout(() => setShouldRender(true), 1)
  }, [])

  return shouldRender ? (
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppLayout />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  ) : null
}

export default App
