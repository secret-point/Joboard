module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    // ...add your webpack config
    return config;
  },
  paths: function(paths, env) {
    // ...add your paths config
    paths.appBuild = paths.appPath + "/lib";
    return paths;
  },
  jest: function(config) {
    const newConfig = { ...config };
    newConfig.collectCoverageFrom = [
      ...newConfig.collectCoverageFrom,
      "!src/index.tsx",
      "!src/serviceWorker.ts"
    ];
    newConfig.coverageThreshold = {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100
      }
    };
    return newConfig;
  }
};
