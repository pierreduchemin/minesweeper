/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import App from './app/components/App';
import {name as appName} from './app.json';
import reducers from './app/reducers/minesweeper';

AppRegistry.registerComponent(appName, () => App);
