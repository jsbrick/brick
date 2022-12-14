module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb',
    'airbnb-typescript',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    ecmaVersion: 12,
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.js', 'build/'],
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/semi': 'warn',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-multiple-empty-lines': 'warn',
    'no-nested-ternary': 'off',
    '@typescript-eslint/member-delimiter-style': ['warn', {
      multiline: {
        delimiter: 'semi',
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
      multilineDetection: 'brackets',
    }],
    'jsx-a11y/label-has-associated-control': 'off',
    'react/jsx-indent': [2, 2, { indentLogicalExpressions: true }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'consistent-return': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'implicit-arrow-linebreak': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'import/order': ['warn', {
      alphabetize: { order: 'ignore' },
      'newlines-between': 'always',
      pathGroupsExcludedImportTypes: ['react'],
      warnOnUnassignedImports: true,
      groups: ['builtin', 'external', 'internal'],
      pathGroups: [
        {
          pattern: 'react',
          group: 'external',
          position: 'before',
        },
        ...['containers', 'shared', 'utils', 'services', 'contexts'].map((name) => [
          { pattern: `${name}`, group: 'internal' },
          { pattern: `${name}/**`, group: 'internal' },
        ]),
      ].flat(),
    }],
    'react-hooks/exhaustive-deps': 'off',
  },
};
