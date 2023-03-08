const path = require("path");
const brazil = require("@amzn/brazil");
const assetUrls = require("@amzn/katal-components/asseturls");

const PACKAGING_DIR = "packaging_additional_published_artifacts";
const IS_PROD_BUILD = process.env.NODE_ENV === "production";

module.exports = {
  isProdBuild: IS_PROD_BUILD,

  webpackMode: IS_PROD_BUILD ? "production" : "development",

  webpackDevTool: IS_PROD_BUILD
    ? "source-map"
    : "eval-cheap-module-source-map",

  entryFile: path.resolve(__dirname, "..", "src", "index.tsx"),
  entryFileMX: path.resolve(__dirname, "..", "src", "components", "mx", "index.tsx"),
  entryFileUK: path.resolve(__dirname, "..", "src", "components", "uk", "index.tsx"),
  entryFileBGC: path.resolve(__dirname, "..", "src", "components", "bgc", "index.tsx"),

  webcomponentsLoader: assetUrls.urls.webcomponentsLoader,

  appJsFileName: IS_PROD_BUILD
    ? "newstaticbb/js/[name].prod.js"
    : "newstaticbb/js/[name].js",

  appJsChunkFileName: IS_PROD_BUILD
    ? "newstaticbb/js/[name].prod.chunk.js"
    : "newstaticbb/js/[name].chunk.js",

  appCssFileName: IS_PROD_BUILD
    ? "newstaticbb/css/[name].prod.css"
    : "newstaticbb/css/[name].css",

  appCssChunkFileName: IS_PROD_BUILD
    ? "newstaticbb/css/[name].prod.chunk.css"
    : "newstaticbb/css/[name].chunk.css",

  outputDir: path.resolve(brazil.buildDir, PACKAGING_DIR)
};
