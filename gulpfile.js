const gulp = require('gulp');
const http = require('http');
const fs = require('fs');
const nodemon = require('gulp-nodemon');
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
const serverPath = `${__dirname}/src/**/*.js`;
const serverIgnore = `!${__dirname}/src/public/**/*`;
const devAssets = `${__dirname}/.tmp/configs/assets.json`;

function checkAppReady(cb) {
  const options = {
    host: 'localhost',
    port: config.server.port
  };
  http
    .get(options, () => cb(true))
    .on('error', () => cb(false));
}

function onServerLog(log) {
  console.log(plugins.util.colors.white('[') +
    plugins.util.colors.yellow('nodemon') +
    plugins.util.colors.white('] ') +
    log.message);
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

gulp.task('start:client', cb => {
  whenServerReady(() => {
    open(`http://${config.server.host}:${config.server.port}`);
    cb();
  });
});

// Compile all Babel Javascript into ES5 and put it into the dist dir
gulp.task('babel:prod', () => {
  return gulp.src([serverPath, serverIgnore])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('babel:dev', () => {
  return gulp.src([serverPath, serverIgnore])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest('.tmp'));
});

// Start server with restart on file change events
gulp.task('nodemon', ['babel'], () =>
  plugins.nodemon({
    script: serverPath,
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    tasks: ['babel']
  })
);

gulp.task('start:server', (cb) => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  // nodemon(`-w ${serverPath} ${serverPath}`)
  //   .on('log', onServerLog);
  nodemon({
    // the script to run the app
    script: serverPath,
    ext: 'js'
  }).on('log', () => {
    // cb()
  });
});

gulp.task('dev', cb => {
  runSequence(
    'clean:dev',
    'webpack-dev-server',
    ['start:server', 'start:client'],
    cb
  );
});

gulp.task('assets:dev', (cb) => {
  const { hot_server_host, hot_server_port } = config.development;
  fs.writeFile('.tmp/configs/assets.json', JSON.stringify({
    assets: {
      'style': `http://${hot_server_host}:${hot_server_port}/main.css`,
      'main': `http://${hot_server_host}:${hot_server_port}/main.js`,
      'common': `http://${hot_server_host}:${hot_server_port}/common.js`
    }
  }, null, 2), cb);
});

// Clean task before build - development mode
gulp.task('clean:dev', cb => del(['.tmp'], cb));

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

// Gulp development mode
gulp.task('dev', (cb) => {
  runSequence('clean:dev', 'babel:dev', ['webpack-dev-server'], cb);
});

// Gulp production mode
gulp.task('prod', (cb) => {
  runSequence('clean:prod', 'babel:prod', 'webpack', cb);
});