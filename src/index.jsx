import React from 'react'
import { createRoot } from 'react-dom/client'
import registerServiceWorker from './registerServiceWorker'
import ErrorBoundary from './components/ErrorBoundary'
import FirebaseServicesProvider from './providers/FirebaseServicesProvider'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ConfigProvider } from 'antd'
import AuthProvider from './containers/Auth/components/AuthProvider'

const history = createBrowserHistory()

ConfigProvider.config({})

const root = createRoot(document.getElementById('root'))

root.render(
  <FirebaseServicesProvider>
    <AuthProvider>
      <BrowserRouter history={history}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  </FirebaseServicesProvider>
)

registerServiceWorker()
