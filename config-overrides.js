const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    // ...add your webpack config
    config.output.filename = 'staticbb/js/[name].js';
    config.output.chunkFilename = 'staticbb/js/[name].chunk.js';
    // Override the existed CSS setting and set new one.
    config.plugins.forEach( (existed, index) => {
      if( existed instanceof MiniCssExtractPlugin) {
          //delete existed;
          config.plugins.splice(index,1);
      }              
    })
    config.plugins.push(new MiniCssExtractPlugin({
      filename: 'staticbb/css/[name].css',
      chunkFilename: 'staticbb/css/[name].chunk.css',
      })
    );
    return config;
  },
  paths: function (paths, env) {
    // ...add your paths config
    paths.appBuild = paths.appPath + "/lib";
    return paths;
  },
  jest: function (config) {
    const newConfig = { ...config };
    newConfig.collectCoverageFrom = [
      ...newConfig.collectCoverageFrom,
      "!src/index.tsx",
      "!src/serviceWorker.ts",
      "!src/@types/**.ts",
      "!src/action/job-actions/**.ts"
    ];
    newConfig.coverageThreshold = {
      global: {
        branches: 0,
        functions: 0,
        lines: 0,
        statements: 0
      }
    };
    return newConfig;
  }
};
