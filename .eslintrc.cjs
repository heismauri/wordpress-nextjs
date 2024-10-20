module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react/recommended',
    'next/core-web-vitals',
    'next/typescript'
  ],
  ignorePatterns: ['dist'],
  settings: {
    react: { version: '18.3.1' }
  },
  rules: {
    'max-len': ['error', { code: 120, tabWidth: 2 }],
    'arrow-body-style': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'comma-dangle': ['error', 'never'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'object-curly-newline': ['error', { consistent: true }],
    'quote-props': ['error', 'consistent'],
    'quotes': ['error', 'single', { avoidEscape: true }]
  }
};
