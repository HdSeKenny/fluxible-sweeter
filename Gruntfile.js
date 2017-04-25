// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const path = require('path');
const makeWebpackConfig = require('./webpack.config');
const env = require('./src/configs/development');

module.exports = function(grunt) {
  // load npm grunt tasks
  // require('load-grunt-tasks')(grunt);
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    clean: [path.join(__dirname, '/dist')],

    webpack: {
      build: makeWebpackConfig({ model: 'prod' }),
      dev: makeWebpackConfig({ model: 'dev', disableDevServer: true })
    },

    'webpack-dev-server': {
      options: {
        hot: true,
        host: '0.0.0.0',
        // inline: true,
        // watchContentBase: true,
        historyApiFallback: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        port: env.hot_server_port,
        webpack: makeWebpackConfig({ model: 'dev' }),
        publicPath: `http://${env.hot_server_host}:${env.hot_server_port}`
      },

      start: {}
    },

    express: {
      options: {
        port: 3000
        // port: process.env.PORT || 3000
      },
      dev: {
        options: {
          script: 'src/bin/www'
        }
      },
      prod: {
        options: {
          script: 'src/bin/www'
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },

    watch: {
      livereload: {
        files: ['src/**/*'],
        options: {
          livereload: true
        }
      },
      express: {
        files: ['src/public/styles/**/*'],
        tasks: ['less:dev', 'express:dev', 'wait'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    env: {
      options: {
        // Shared Options Hash
      },
      dev: {
        NODE_ENV: 'development',
        logger: () => {
          grunt.log.ok('set NODE_ENV = development');
        }
      },
      build: {
        NODE_ENV: 'production',
        logger: () => {
          grunt.log.ok('set NODE_ENV = production');
        }
      }
    }
  });

  // The development server (the recommended option for development)
  grunt.registerTask('default', ['env:dev', 'clean', 'less:dev', 'webpack-dev-server']);

  // Run the node server
  grunt.registerTask('server:prod', function() {
    grunt.log.ok('Waiting for server loading...');
    this.async();
    require('./src/bin/www');
  });

  // Used for development
  grunt.registerTask('devWatch', ['less:dev', 'express:dev', 'watch:less']);
  grunt.registerTask('devServer', ['env:dev', 'webpack-dev-server']);

  grunt.registerTask('server:dev', () => {
    grunt.log.ok('Waiting for server loading...');
    require('./src/bin/www');
  });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function() {
    grunt.log.ok('Waiting for server loading...');
    const done = this.async();
    setTimeout(() => {
      grunt.log.writeln('Done waiting!');
      done();
    }, 2000);
  });

  // Development model
  grunt.registerTask('dev', [
    'less:dev',
    'express:dev',
    'wait',
    'watch'
  ]);

  // Production model
  grunt.registerTask('prod', [
    'env:build',
    'clean',
    'less:dev',
    'webpack:build',
    'server:prod'
  ]);

  // Production model
  grunt.registerTask('serve', [
    'env:build',
    'clean',
    'less:dev',
    'webpack:build',
    'server:prod'
  ]);

  // Production model => build
  grunt.registerTask('build', [
    'clean',
    'less:dev',
    'webpack:build'
  ]);
};
