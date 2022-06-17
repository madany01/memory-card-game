module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'import'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/destructuring-assignment': ['error', 'always', { ignoreClassFields: true }],
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/button-has-type': 'off',
    'no-console': 'off',
    'no-return-assign': ['error', 'except-parens'],
    'no-param-reassign': 'off',
  },
}
