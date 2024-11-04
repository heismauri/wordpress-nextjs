module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'next/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist'],
  plugins: ['prettier'],
  root: true,
  rules: {
    'arrow-body-style': 'off',
    'comma-dangle': ['error', 'never'],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'max-len': ['error', { code: 120, tabWidth: 2 }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-underscore-dangle': 'off',
    'object-curly-newline': ['error', { consistent: true }],
    'prettier/prettier': 'error',
    'quote-props': ['error', 'consistent'],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off'
  },
  settings: {
    react: { version: '18.3.1' }
  }
};
