module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    // 'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],

  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['warn'],
    '@typescript-eslint/member-delimiter-style': ['error'],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        '**/*Test.tsx',
        '**/*test.ts',
      ],
    }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'warn',
      {
        'allowSingleExtends': true
      }
    ],
    '@typescript-eslint/no-unused-vars': ['error', {
      'ignoreRestSiblings': true
    }],
    'prefer-destructuring': ['warn', {
      'object': true,
      'array': false
    }],
    'no-plusplus': ['error', {
      'allowForLoopAfterthoughts': true
    }],
    'object-curly-spacing': ['error', 'always'],  // add spacing for object curly spacing, e.g. { key: 'value' }
    '@typescript-eslint/type-annotation-spacing': ['warn']
  },
  settings: {
    'react': {
      'version': 'detect'
    },
    'import/resolver': {
      typescript: {},
    },
  },
};
