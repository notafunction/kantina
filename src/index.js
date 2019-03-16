import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';

registerServiceWorker();

const render = (Component) => {
    return ReactDOM.render(
        <Provider store={store}>
            <Component/>
        </Provider>,
        document.getElementById('root')
    );
}

render(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(NextApp);
    });
}