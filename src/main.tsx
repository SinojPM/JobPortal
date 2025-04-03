import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./variables.css"
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './redux/Store.ts'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { theme } from './utils/mantineTheme.ts';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
      <Notifications position='top-right' />
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
)
