/* main.js */
'use strict';

import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Routes from './routes';
import rootReducers from './reducers/root_reducers';

const rootElement = document.getElementById('app');
let store = createStore(rootReducers, window.devToolsExtension ? window.devToolsExtension() : undefined); //eslint-disable-line

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  rootElement
);
