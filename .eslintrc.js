module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    // 'airbnb',
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
  ],
  ignorePatterns: ["/translations/**", "/src/i18n/**", "/src/actions/old/**", "/src/@types/IPayload**", "/src/@types/ICandidateApplication**", "/src/@types/IPageOrderResponse**"],
  rules: {
    "react/jsx-pascal-case": ["error"],
    "react/jsx-closing-bracket-location": ["error"],
    "react/jsx-closing-tag-location": ["error"],
    "react/self-closing-comp": ["error"],
    "react/jsx-wrap-multilines": ["error",
      {
        declaration: "parens-new-line",
        assignment: "parens-new-line",
        return: "parens-new-line",
        arrow: "parens-new-line",
        condition: "parens-new-line",
        logical: "parens-new-line",
        prop: "parens-new-line"
      }],
    "react/no-array-index-key": "error",
    "react/jsx-boolean-value": "error",
    "react/jsx-tag-spacing": ["error", { "beforeClosing": "never" }],
    "no-multi-spaces": "error",
    "jsx-quotes": ["error", "prefer-double"],
    "arrow-spacing": "error",
    "brace-style": "error",
    "comma-spacing": ["error", { "before": false, "after": true }],
    "eqeqeq": "error",
    "key-spacing": "error",
    "keyword-spacing": "error",
    "lines-around-directive": ["error",
      {
        "before": "never",
        "after": "always"
      }
    ],
    "no-console": "off",
    "no-else-return": "error",
    "no-eval": "error",
    "no-multiple-empty-lines": ["error", { "max": 1 }],
    "radix": ["error", "as-needed"],
    "semi": ["error", "always", { "omitLastInOneLineBlock": true }],
    "quotes": ["error", "double", { "avoidEscape": true }],
    "sort-vars": "warn",
    "spaced-comment": "error",
    "space-before-blocks": "error",
    "space-before-function-paren": ["error",
      {
        "anonymous": "always",
        "named": "never"
      }
    ],
    "import/no-unresolved": "off",
    "no-use-before-define": "off",
    // '@typescript-eslint/no-use-before-define': ['error'],
    "@typescript-eslint/no-extra-semi": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
    "import/extensions": [
      0,
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],

    "import/namespace": "off",
    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-duplicates": "off",
    "import/prefer-default-export": "off",
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/no-explicit-any": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-var-requires": "off",
    "import/no-named-as-default": "off",
    "@typescript-eslint/ban-types": ["error", { "types": { "Function": false, "Object": false } }],
    "@typescript-eslint/member-delimiter-style": ["error"],
    "import/order": [
      0,
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "@typescript-eslint/no-empty-interface": [
      "warn",
      {
        "allowSingleExtends": true
      }
    ],
    "prefer-destructuring": ["warn", {
      "object": true,
      "array": false
    }],
    "no-plusplus": ["warn", {
      "allowForLoopAfterthoughts": true
    }],
    "object-curly-spacing": ["error", "always"], // add spacing for object curly spacing, e.g. { key: 'value' }
    "@typescript-eslint/type-annotation-spacing": ["warn"],
    "@typescript-eslint/no-empty-function": "off"
  },
  settings: {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      typescript: {},
    },
  },
};