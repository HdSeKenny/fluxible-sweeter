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
const browserSync = require('browser-sync').create();
const config = require('./src/configs');
const makeWebpackConfig = require('./webpack.config');

const plugins = gulpLoadPlugins();
const {
  hot_server_host,
  hot_server_port
} = config.development;
const {
  host,
  port,
  browserSyncPort
} = config.server;
const paths = {
  src_server_path: 'src/**/*.js',
  dev_server_path: '.tmp/bin/server.js',
  dev_aasets: '.tmp/configs/assets.json',
  server_address: `${host}:${port}`,
  browser_sync_url: `http://${host}:${browserSyncPort}`,
  prod_url: `http://${host}:${port}`,
  prod_server_path: './dist/bin/server',
  assets_style: `http://${hot_server_host}:${hot_server_port}/main.css`,
  assets_main: `http://${hot_server_host}:${hot_server_port}/main.js`,
  assets_common: `http://${hot_server_host}:${hot_server_port}/common.js`
};

const babelExpressSrc = [
  paths.src_server_path,
  '!node_modules/**/*.js',
  '!src/actions/*.js',
  '!src/components/**/*.js',
  '!src/plugins/**/*.js',
  '!src/polyfills/**/*.js',
  '!src/stores/**/*.js',
  '!src/styles',
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
  'src/styles',
  'src/utils/**/*.js',
  'src/client.js',
];

function checkAppReady(p, cb) {
  const options = {
    host,
    port: p
  };
  http
    .get(options, () => cb(true))
    .on('error', () => cb(false));
}

// Call page until first success
function whenServerReady(p, cb) {
  let serverReady = false;
  const appReadyInterval = setInterval(() =>
    checkAppReady(p, (ready) => {
      if (!ready || serverReady) {
        return;
      }
      clearInterval(appReadyInterval);
      serverReady = true;
      cb();
    }),
    100);
}

gulp.task('client:dev', cb => {
  whenServerReady(browserSyncPort, () => {
    open(paths.browser_sync_url);
    cb();
  });
});

gulp.task('client:prod', cb => {
  whenServerReady(port, () => {
    open(paths.prod_url);
    cb();
  });
});

gulp.task('babel:dev', () => {
  return gulp.src([paths.src_server_path])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest('.tmp'));
});

gulp.task('browser-sync', (cb) => {
  browserSync.init({
    open: false,
    logFileChanges: false,
    proxy: paths.server_address,
    ws: true,
    middleware: [],
    port: browserSyncPort,
    plugins: []
  });
  cb();
});

gulp.task('express:dev', () => {
  // Start server with restart on file change events
  plugins.nodemon({
    script: paths.dev_server_path,
    ext: 'js',
    ignore: nodemonJgnores,
    tasks: ['babel:express']
  }).on('start', () => {
    whenServerReady(browserSyncPort, () => {
      browserSync.reload();
    });
  });
});

gulp.task('babel:express', () => {
  return gulp.src(babelExpressSrc)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest('.tmp'));
});

gulp.task('assets:dev', (cb) => {
  fs.writeFile(paths.dev_aasets, JSON.stringify({
    assets: {
      'style': paths.assets_style,
      'main': paths.assets_main,
      'common': paths.assets_common
    }
  }, null, 2), cb);
});

// Clean task before build - development mode
gulp.task('clean:dev', cb => del(['.tmp'], cb));

gulp.task('webpack-dev-server', () => {
  const configs = makeWebpackConfig('dev');
  const compiler = webpack(configs);

  // Start a webpack-dev-server
  new WebpackDevServer(compiler, {
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
    'env:dev', ['webpack-dev-server', 'express:dev'],
    'browser-sync',
    'client:dev',
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
  runSequence('clean:prod', 'babel:prod', 'webpack', 'env:prod', ['express:prod', 'client:prod'], cb);
});

gulp.task('express:prod', () => {
  // Node express server production mode
  require(paths.prod_server_path);
});

gulp.task('env:prod', (cb) => {
  // Set  express server environment to production
  process.env.NODE_ENV = 'production';
  cb();
});

// Clean task before build - production mode
gulp.task('clean:prod', cb => del(['dist'], cb));

gulp.task('webpack', [], () => {
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
  return gulp.src([paths.src_server_path])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
/* ========================= Production settings end */