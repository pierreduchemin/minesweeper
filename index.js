/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './app/components/App';
import {name as appName} from './app.json';
import reducers from './app/reducers/minesweeper';

import type { Store } from './types';

const store: Store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

AppRegistry.registerComponent(appName, () => App);
