module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'standard',
    'plugin:vue/essential',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'vue',
  ],
  rules: {
    'no-new': 'off',
    'prettier/prettier': ['error', {
      'singleQuote': true,
      'semi': false,
      'printWidth': 120
    }]
  }
}
