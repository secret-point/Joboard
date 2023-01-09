const babelRuntimeVersion = require("@babel/runtime/package.json").version;

module.exports = {
  sourceType: "unambiguous",

  plugins: [
    "@babel/plugin-proposal-class-properties",
    [
      "@babel/plugin-transform-runtime",
      { version: babelRuntimeVersion, useESModules: true },
    ],
  ],

  presets: [
    "@babel/preset-react",
    ["@babel/preset-typescript", { onlyRemoveTypeImports: true }],
    ["@babel/preset-env", { useBuiltIns: false }],
  ],

  env: {
    test: {
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          { version: babelRuntimeVersion, useESModules: false },
        ],
      ],

      presets: [["@babel/preset-env", { targets: { node: "current" } }]],
    },
  },
};
