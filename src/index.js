import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import 'raf/polyfill';
// import 'core-js/es7/array';
// import 'core-js/es6/number';

import './index.scss';
import store from './store';
import App from './App';

// if (typeof window !== 'undefined') {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
// }
