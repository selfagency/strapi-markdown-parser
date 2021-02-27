const { readGitignoreFiles } = require('eslint-gitignore')

module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:standard/recommended', 'plugin:security/recommended', 'plugin:prettier/recommended'],
  settings: {
    'prettier-vue': {
      SFCBlocks: {
        template: true,
        script: true,
        style: true
      }
    }
  },
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  plugins: ['prettier', 'security', 'standard'],
  root: true,
  ignorePatterns: readGitignoreFiles({ cwd: __dirname }),
  rules: {
    'callback-return': ['error'],
    camelcase: ['warn'],
    'handle-callback-err': ['error'],
    indent: ['off'],
    'key-spacing': ['off'],
    'linebreak-style': ['warn', 'unix'],
    'no-console': ['warn'],
    'no-eval': ['error'],
    'no-mixed-requires': ['error'],
    'no-script-url': ['error'],
    'no-undef': ['off'],
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: 'i|res|next|^err'
      }
    ],
    'no-useless-escape': ['off'],
    'node/no-extraneous-import': ['off'],
    'node/no-unsupported-features/es-syntax': ['off'],
    'node/no-unpublished-require': ['off'],
    'padding-line-between-statements': ['warn'],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true
      }
    ],
    'security/detect-non-literal-fs-filename': ['off'],
    'security/detect-non-literal-regexp': ['off'],
    'security/detect-non-literal-require': ['off'],
    'security/detect-object-injection': ['off'],
    semi: ['warn', 'never'],
    'wrap-iife': ['error', 'inside']
  }
}
