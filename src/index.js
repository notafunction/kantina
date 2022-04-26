import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import store from './store'
import ErrorBoundary from './components/ErrorBoundary'
import App from './App'
import firebase, { firebaseConfig } from './services/firebase'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ConfigProvider } from 'antd'

const history = createBrowserHistory()

const rrfProps = {
  firebase,
  createFirestoreInstance,
  dispatch: store.dispatch,
  config: {
    ...firebaseConfig,
    userProfile: 'users',
    profileParamsToPopulate: [{ child: 'role', root: 'roles' }],
    profileFactory: (user) => {
      const profile = {
        email: user.email || user.providerData[0].email,
        role: 'user'
      }

      if (user.providerData && user.providerData.length) {
        profile.providerData = user.providerData
      }

      return profile
    }
  }
}

ConfigProvider.config({})

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter history={history}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
