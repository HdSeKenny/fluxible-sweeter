const gulp = require('gulp');
const http = require('http');
const fs = require('fs');
const del = require('del');
const babel = require('gulp-babel');
const gutil = require('gulp-util');
const open = require('open');
const webpack = require('webpack');
const stream = require('webpack-stream');
const WebpackDevServer = require('webpack-dev-server');
const gulpLoadPlugins = require('gulp-load-plugins');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const config = require('./src/configs');
const makeWebpackConfig = require('./webpack.config');

const plugins = gulpLoadPlugins();
const serverPath = 'src/**/*.js';
const devAssets = '.tmp/configs/assets.json';
const babelExpressSrc = [
  serverPath,
  '!node_modules/**/*.js',
  '!src/actions/*.js',
  '!src/components/**/*.js',
  '!src/plugins/**/*.js',
  '!src/polyfills/**/*.js',
  '!src/stores/**/*.js',
  '!src/styles/**/*.js',
  '!src/utils/**/*.js',
  '!src/client.js',
];

const nodemonJgnores = [
  'node_modules/**/*.js',
  'src/actions/*.js',
  'src/components/**/*.js',
  'src/plugins/**/*.js',
  'src/polyfills/**/*.js',
  'src/stores/**/*.js',
  'src/styles/**/*.js',
  'src/utils/**/*.js',
  'src/client.js',
];

function checkAppReady(cb) {
  const options = {
    host: 'localhost',
    port: config.server.port
  };
  http
    .get(options, () => cb(true))
    .on('error', () => cb(false));
}

// Call page until first success
function whenServerReady(cb) {
  let serverReady = false;
  const appReadyInterval = setInterval(() =>
    checkAppReady((ready) => {
      if (!ready || serverReady) {
        return;
      }
      clearInterval(appReadyInterval);
      serverReady = true;
      cb();
    }),
    100);
}

gulp.task('client', cb => {
  whenServerReady(() => {
    open(`http://${config.server.host}:${config.server.port}`);
    cb();
  });
});

gulp.task('babel:dev', () => {
  return gulp.src([serverPath])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest('.tmp'));
});

// Start server with restart on file change events
gulp.task('express:dev', () => {
  plugins.nodemon({
    script: '.tmp/bin/server.js',
    ext: 'js',
    ignore: nodemonJgnores,
    tasks: ['babel:express']
  });
});

gulp.task('babel:express', () => {
  return gulp.src(babelExpressSrc)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest('.tmp'));
});

gulp.task('assets:dev', (cb) => {
  const { hot_server_host, hot_server_port } = config.development;
  fs.writeFile(devAssets, JSON.stringify({
    assets: {
      'style': `http://${hot_server_host}:${hot_server_port}/main.css`,
      'main': `http://${hot_server_host}:${hot_server_port}/main.js`,
      'common': `http://${hot_server_host}:${hot_server_port}/common.js`
    }
  }, null, 2), cb);
});

// Clean task before build - development mode
gulp.task('clean:dev', cb => del(['.tmp'], cb));

gulp.task('webpack-dev-server', () => {
  // Make dev webpack configs
  const configs = makeWebpackConfig('dev');
  const { hot_server_host, hot_server_port } = config.development;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(configs), {
    publicPath: configs.output.publicPath,
    contentBase: './src/',
    historyApiFallback: true,
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false,
      children: false
    }
  }).listen(hot_server_port, hot_server_host, (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('webpack-dev-server => address:', configs.output.publicPath);
    gutil.log('webpack-dev-server => process: building modules ...');
  });
});

gulp.task('env:dev', (cb) => {
  process.env.NODE_ENV = 'development';
  cb();
});

// Gulp development mode
gulp.task('dev', (cb) => {
  runSequence(
    'clean:dev',
    'babel:dev',
    'assets:dev',
    'env:dev',
    ['webpack-dev-server', 'express:dev'],
    'client',
    cb
  );
});

/* Production settings begin ========================= */

gulp.task('build', (cb) => {
  // Gulp build mode, run this then run 'npm start'
  runSequence('clean:prod', 'babel:prod', 'webpack', cb);
});

gulp.task('prod', (cb) => {
  // Gulp production mode
  runSequence('clean:prod', 'babel:prod', 'webpack', 'env:prod', ['express:prod', 'client'], cb);
});

gulp.task('express:prod', () => {
  // Node express server production mode
  require('./dist/bin/server');
});

gulp.task('env:prod', (cb) => {
  // Set  express server environment to production
  process.env.NODE_ENV = 'production';
  cb();
});

// Clean task before build - production mode
gulp.task('clean:prod', cb => del(['dist'], cb));

gulp.task('webpack', [], () => {
  // Make prod webpack configs
  const configs = makeWebpackConfig('prod');

  // gulp looks for all source files under specified path
  return gulp.src(configs.entry)
    // creates a source map for debugging by maintaining the actual source code
    .pipe(sourcemaps.init())
    // blend in the webpack config into the source files
    .pipe(stream(configs))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(configs.output.path));
});

// Compile all Babel Javascript into ES5 and put it into the dist dir
gulp.task('babel:prod', () => {
  return gulp.src([serverPath])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
/* ========================= Production settings end */