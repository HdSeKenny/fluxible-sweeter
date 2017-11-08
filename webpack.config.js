const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const wbsap = require('webpack-bundle-size-analyzer');
const env = require('./src/configs');

const {
  hot_server_host,
  hot_server_port
} = env.development;

module.exports = function makeWebpackConfig(mode) {

  const isDev = mode === 'dev';
  const isProd = mode === 'prod';
  // const isTest = mode === 'test';

  const config = {};
  const paths = {
    ENTRY: './src/client.js',
    PROD_PATH: `${__dirname}/dist/build`,
    DEV_PATH: `${__dirname}/.tmp`,
    DEV_PUBLIC_PATH: `http://${hot_server_host}:${hot_server_port}/`
  };

  config.resolve = {
    extensions: ['.js']
  };

  config.entry = [paths.ENTRY];

  config.output = {
    // Absolute output directory
    path: isProd ? paths.PROD_PATH : paths.DEV_PATH,

    // Uses webpack-dev-server in development
    publicPath: isProd ? paths.PROD_PATH : paths.DEV_PUBLIC_PATH,

    // Filename for entry points
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',

    // Filename for non-entry points
    chunkFilename: isProd ? '[name].[chunkhash].js' : '[name].js'
  };

  // webpakc module
  config.module = {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      exclude: /node_modules/,
      loaders: ['json-loader']
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader'],
      })
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=100000'
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      test: /\.html$/,
      loader: 'raw-loader'
    }, {
      test: /\.node$/,
      use: 'node-loader'
    }]
  };

  // config default config
  config.plugins = [
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Extract css files
    // Disabled when in test mode or not in build mode
    new ExtractTextPlugin({
      filename: isProd ? '[name].[hash].css' : '[name].css',
      disable: false,
      allChunks: !isDev
    }),

    // LoaderOptionsPlugin
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          autoprefixer
        ]
      }
    }),

    // generates webpack assets config to use hashed assets in production mode
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: isProd ? 'common.[hash].js' : 'common.js'
    }),

    new wbsap.WebpackBundleSizeAnalyzerPlugin('../webpack.json')
  ];

  // Add build specific plugins
  if (isProd) {
    config.devtool = 'source-map';
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }),

      // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
      // Define free global variables
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),

      function webpackStatsPlugin() {
        this.plugin('done', function (stats) {
          const data = stats.toJson();
          const assets = data.assetsByChunkName;
          const output = {
            assets: {},
            cdnPath: this.options.output.publicPath
          };
          Object.keys(assets).forEach((key) => {
            const value = assets[key];
            const isArrayValue = _.isArray(value);
            if (isArrayValue) {
              value.forEach(str => {
                if (str.includes('css') && !str.includes('map')) {
                  output.assets.style = `/${str}`;
                }

                if (str.includes('js')) {
                  output.assets.main = `/${str}`;
                }
              });
            } else {
              output.assets[key] = `/${value}`;
            }
          });

          fs.writeFileSync(
            path.join(__dirname, '/dist/configs', 'assets.json'),
            JSON.stringify(output, null, 2)
          );
        });
      }
    );
  }

  // Add dev specific plugins
  if (isDev) {
    config.devtool = 'eval-source-map';
    // This is for development mode to reload page
    // Work with 'HotModuleReplacementPlugin'
    config.entry.unshift(
      `webpack-dev-server/client?${paths.DEV_PUBLIC_PATH}`,
      'webpack/hot/dev-server'
    );

    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),

      // new webpack.ProgressPlugin({ profile: false }),
      // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
      // Define free global variables
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"'
        }
      })
    );
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {};

  config.node = {
    global: true,
    process: true,
    crypto: 'empty',
    clearImmediate: false,
    setImmediate: false
  };

  return config;
};
