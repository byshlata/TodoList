import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';

import { App } from 'App';
import { store } from 'state/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
