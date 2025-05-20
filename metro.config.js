// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

module.exports = mergeConfig(getDefaultConfig(__dirname), {
  resolver: {
    extraNodeModules: {
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@managers': path.resolve(__dirname, 'src/managers'),
      '@models': path.resolve(__dirname, 'src/models'),
    },
  },
});
