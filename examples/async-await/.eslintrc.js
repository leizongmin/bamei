module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
  },
  extends: 'lei',
  rules: {
    'generator-star-spacing': 'off',
    'require-yield': 'off',
  },
};