module.exports = {
  env: {
    browser: false,
    commonjs: true,
    node: true
  },
  extends: [
    'semistandard'
  ],
  rules: {
    'no-console': 'error'
  },
  overrides: [
    {
      files: [
        '**/*.test.js'
      ],
      env: {
        jest: true
      },
      ...require('eslint-plugin-jest').configs.recommended
    }
  ]
};
