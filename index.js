/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App'; // ✅ correct place
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

console.log('React Native Modules:', require('react-native').NativeModules);

