const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { KatalWebpackPlugin } = require('@amzn/katal-webpack-plugin');
const configUtils = require('./configUtils');

/**
 * This contains shared configuration between local builds and running your
 * application through mons. Add logic here that works for both.
 *
 * Webpack is an open source project used for bundling assets. You can find
 * its documentation here: https://webpack.js.org/concepts/
 * It works by building a tree of dependencies starting from an Entry file.
 * From here rules can be applied to transform files to their final format.
 */

/** Plugins that should only be added in development. */
const DEVO_PLUGINS = [];

/** Plugins that should only be added in production. */
const PROD_PLUGINS = [
    new MiniCssExtractPlugin({
        filename: configUtils.appCssFileName,
        chunkFilename: configUtils.appCssChunkFileName
    })
];

/** Plugins to run regardless of the environment. */
const ALL_PLUGINS = [
    ...(configUtils.isProdBuild ? PROD_PLUGINS : DEVO_PLUGINS),

    new HtmlWebpackPlugin({
        template: 'public/index.html',
        filename: 'index.html',
        webcomponentsLoader: configUtils.webcomponentsLoader,
        manifest: '/public/staticbb/manifest.json'
    }),

    new ForkTsCheckerWebpackPlugin(),
    new CleanWebpackPlugin(),

    new KatalWebpackPlugin({
        replacements: [
            {
                template: '{{Country}}',
                developmentValue: 'us',
                replacement: {
                    source: 'cloudformation',
                    key: 'Country',
                },
            },
            {
                template: '{{Stage}}',
                developmentValue: 'beta',
                replacement: {
                    source: 'cloudformation',
                    key: 'Stage',
                },
            },
            {
                template: '{{Env}}',
                developmentValue: 'development',
                replacement: {
                    source: 'cloudformation',
                    key: 'Stage',
                },
            },
        ]
    })
];

module.exports = {
    mode: configUtils.webpackMode,

    devtool: configUtils.webpackDevTool,

    // this is necessary due to a bug in webpack-dev-server https://issues.amazon.com/issues/KAT-6707
    target: configUtils.isProdBuild ? 'browserslist' : 'web',

    context: path.resolve(__dirname, '..'),

    entry: configUtils.entryFile,

    output: {
        filename: configUtils.appJsFileName,
        chunkFilename: configUtils.appJsChunkFileName,
        path: configUtils.outputDir,
        publicPath: "/"
    },

    resolve: {
        alias: {
            src: path.resolve(__dirname, '..', 'src')
        },
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
        fallback: { "timers": require.resolve("timers-browserify") }
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    safari10: true
                }
            }),
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            // prevents breaking urls which use katal manifest template strings
                            normalizeUrl: false
                        }
                    ]
                }
            })
        ]
    },

    module: {
        rules: [
            {
                test: /\.(jsx?|tsx?)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    babelrc: true
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    configUtils.isProdBuild
                        ? MiniCssExtractPlugin.loader
                        // In development, style-loader is used instead of
                        // MiniCssExtractPlugin so that css changes are hot reloaded.
                        : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|bmp|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[contenthash:8].[ext]'
                }
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false
                }
            },
        ]
    },

    plugins: ALL_PLUGINS,

    devServer: {
        hot: true,
        compress: true,
        host: '0.0.0.0',
        allowedHosts: "all",  // disableHostCheck: true,
        open: configUtils.serverMode === 'standalone',
        historyApiFallback: true,
        port: 3000,
        onBeforeSetupMiddleware: (devServer) => {
            return KatalWebpackPlugin.createMiddleware()(devServer.app, devServer, devServer.compiler);
        },
        proxy: { '/api': { target: 'http://localhost:8080', secure: false }  }
    },

    performance: { hints: false },
};
