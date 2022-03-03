import React from 'react';
import {Provider} from 'react-redux';
import AppRoute from './AppRoute';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <AppRoute></AppRoute>
    </Provider>
  );
}
