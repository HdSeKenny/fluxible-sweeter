const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const wbsap = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;
const env = require('./src/configs');

const { hot_server_host, hot_server_port } = env.development;

module.exports = function makeWebpackConfig(options) {

  const isDev = options.model === 'dev';
  const isProd = options.model === 'prod';
  const isTest = options.model === 'test';

  const config = {};

  config.resolve = {
    extensions: ['.js', '.jsx']
  };

  config.entry = ['./src/client.js'];

  // config.externals = {
  //   sharp: 'commonjs sharp'
  // };

  config.output = {
    // Absolute output directory
    // path: path.join(__dirname, '/src/public/build/'),
    path: isProd ? `${__dirname}/dist/public/build/` : `${__dirname}/dist/`,

    // Uses webpack-dev-server in development
    publicPath: isProd ? '/' : `http://${hot_server_host}:${hot_server_port}/`,

    // Filename for entry points
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',

    // Filename for non-entry points
    chunkFilename: isProd ? '[name].[chunkhash].js' : '[name].js'
  };


  // webpakc module
  config.module = {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot-loader', 'babel-loader']
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
    new ExtractTextPlugin({ filename: isProd ? '[name].[hash].css' : '[name].css', disable: false, allChunks: true }),

    // Set jquery for global, used for bootstrap
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // }),

    // LoaderOptionsPlugin
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          autoprefixer
        ]
      }
    }),

    new webpack.IgnorePlugin(/vertx/),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    // generates webpack assets config to use hashed assets in production mode
    new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: isProd ? 'common.[hash].js' : 'common.js' }),
    new wbsap('../webpack.json')
  ];

  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoEmitOnErrorsPlugin(),

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
        this.plugin('done', function(stats) {
          const data = stats.toJson();
          const assets = data.assetsByChunkName;
          const output = {
            assets: {},
            cdnPath: this.options.output.publicPath
          };
          const hostAddress = '/build/';
          Object.keys(assets).forEach((key) => {
            const value = assets[key];
            const isArrayValue = _.isArray(value);
            if (isArrayValue) {
              value.forEach(str => {
                if (str.includes('css') && !str.includes('map')) {
                  output.assets.style = `${hostAddress}${str}`;
                }

                if (str.includes('js')) {
                  output.assets.main = `${hostAddress}${str}`;
                }
              });
            } else {
              output.assets[key] = `${hostAddress}${value}`;
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
    config.plugins.push(
      // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
      // Define free global variables
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"'
        }
      })
    );
  }

  // set webpack devtool
  if (isTest) {
    config.devtool = 'inline-source-map';
  } else if (isProd) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './src/',
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  };

  config.node = {
    global: true,
    process: true,
    crypto: 'empty',
    clearImmediate: false,
    setImmediate: false
  };

  return config;
};
