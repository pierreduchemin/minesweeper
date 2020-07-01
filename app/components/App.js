// @flow

import React, { Component } from 'react';
import BoardC from './BoardC';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers/minesweeper';

const store = createStore(reducers);

const App: () => React$Node = () => {
    return (
      <Provider store={store}>
        <BoardC />
      </Provider>
    );
}

export default App;