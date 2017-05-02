const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const env = require('./src/configs/development');
// const babelrc = fs.readFileSync('./.babelrc');
// const babelLoaderQuery = JSON.parse(babelrc);
// const chunkRegex = /^([A-Za-z0-9_-]+)\..*/;
const configs = require('./src/configs');

module.exports = function makeWebpackConfig(options) {
  const isDev = options.model === 'dev';
  const isProd = options.model === 'prod';
  const isTest = options.model === 'test';
  const { disableDevServer } = options;

  const config = {};

  config.resolve = {
    extensions: ['.js', '.jsx']
  };

  config.entry = './src/client.js';


  config.output = {
    // Absolute output directory
    // path: path.join(__dirname, '/src/public/build/'),
    path: `${__dirname}/dist/`,

    // Uses webpack-dev-server in development
    publicPath: isProd ? '/' : `http://${env.hot_server_host}:${env.hot_server_port}/`,

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
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
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
    }]
  };

  // config default config
  config.plugins = [
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Extract css files
    // Disabled when in test mode or not in build mode
    new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true }),

    // Set jquery for global, used for bootstrap
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
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

    new webpack.IgnorePlugin(/vertx/),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    // generates webpack assets config to use hashed assets in production mode
    new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'common.js' })
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

          Object.keys(assets).forEach((key) => {
            const value = assets[key];
            const isArrayValue = _.isArray(value);

            if (isDev && !disableDevServer) {
              if (isArrayValue) {
                value.forEach(v => {
                  const assetsKey = v.split('.').join('_');
                  output.assets[assetsKey] = `http://${env.hot_server_host}:${env.hot_server_port}/${v}`;
                });
              } else {
                const assetsKey = value.split('.').join('_');
                output.assets[assetsKey] = `http://${env.hot_server_host}:${env.hot_server_port}/${value}`;
              }
            } else {
              output.assets[key] = `${configs.path_prefix}/dist/${value}`;
            }
          });

          fs.writeFileSync(
            path.join(__dirname, '/src/public/assets', 'assets.json'),
            JSON.stringify(output, null, 4)
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
