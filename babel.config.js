module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  overrides: [
    {
      test: /node_modules\/react-native\//,
      presets: ['module:metro-react-native-babel-preset'],
    },
  ],
  ignore: [
    /node_modules\/.*\/node_modules\/react-native\/.*/,
  ],
};
