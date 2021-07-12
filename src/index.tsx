import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'

import './index.css'
import theme from 'app/theme'
import { store } from 'app/store'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)

serviceWorker.register()
