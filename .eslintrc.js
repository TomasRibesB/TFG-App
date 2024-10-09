module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  presets: ['module:metro-react-native-babel-preset'],
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'react-native-paper/babel',
  ],
};
