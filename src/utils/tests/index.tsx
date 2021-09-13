import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import { ThemeProvider } from '@material-ui/core'
import createTheme from 'app/theme'
import type { FC } from 'react'
import type { RenderOptions } from '@testing-library/react'

const AllTheProviders: FC = ({ children }) => {
  const theme = createTheme(false)

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  )
}

export const renderWithStore = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): ReturnType<typeof render> => {
  return render(ui, { wrapper: AllTheProviders, ...options })
}
