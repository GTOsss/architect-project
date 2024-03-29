module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
  },
  extends: ['prettier'],
  plugins: ['prettier'],
  rules: {
    'no-param-reassign': 'off',
    'prefer-destructuring': 'off',
    'object-curly-newline': 'off',
    'arrow-body-style': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-empty-pattern': 'off',
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-useless-computed-key': 'off',
    'no-plusplus': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
