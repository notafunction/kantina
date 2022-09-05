import React from 'react'
import { render } from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import ErrorBoundary from './components/ErrorBoundary'
import FirebaseServicesProvider from './providers/FirebaseServicesProvider'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ConfigProvider } from 'antd'
import { FirebaseAppProvider } from 'reactfire'
import firebaseConfig from './services/firebase.config.json'

const history = createBrowserHistory()

ConfigProvider.config({})

render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <FirebaseServicesProvider>
      <BrowserRouter history={history}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </FirebaseServicesProvider>
  </FirebaseAppProvider>,
  document.getElementById('root')
)

registerServiceWorker()
