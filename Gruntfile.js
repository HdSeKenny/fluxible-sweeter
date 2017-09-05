const path = require('path');
const makeWebpackConfig = require('./webpack.config');
const env = require('./src/configs');

const { hot_server_host, hot_server_port } = env.development;

module.exports = function(grunt) {
  // load npm grunt tasks
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    // project variables
    project: {
      srcPublic: path.join(__dirname, '/src/public'),
      distPublic: path.join(__dirname, '/dist/public'),
      devPublic: path.join(__dirname, '/dev/public'),

      src: path.join(__dirname, '/src'),
      dist: path.join(__dirname, '/dist'),
      dev: path.join(__dirname, '/dev')
    },

    // clean dist
    clean: {
      dev: ['<%= project.dev %>'],
      prod: ['<%= project.dist %>']
    },

    webpack: {
      build: makeWebpackConfig({ model: 'prod' }),
      // dev: makeWebpackConfig({ model: 'dev', disableDevServer: true })
    },

    babel: {
      options: {
        'babelrc': false,
        presets: ['react'],
        plugins: [
          'add-module-exports',
          'transform-es2015-modules-commonjs',
          'transform-export-extensions',
          'transform-object-rest-spread',

          // following plugins can be removed when done the todos in changes-on-project-transpiling.md
          'transform-es2015-shorthand-properties',
          'transform-es2015-duplicate-keys',
          'transform-function-bind',
          'transform-class-properties',
        ]
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: [
            'bin/server.js',
            '**/*.js',
            '**/*.jsx',
            '!**tests/**/*',
            '!**mocks/**/*'
          ],
          dest: '<%= project.dev %>'
        }]
      },
      prod: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: [
            'bin/server.js',
            '**/*.js',
            '**/*.jsx',
            '!**tests/**/*',
            '!**mocks/**/*'
          ],
          dest: '<%= project.dist %>'
        }]
      }
    },

    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: '<%= project.src %>',
          src: ['**/*.json'],
          dest: '<%= project.dev %>'
        },
        {
          expand: true,
          cwd: '<%= project.srcPublic %>',
          src: ['styles/images/**/*'],
          dest: '<%= project.devPublic %>'
        },
        {
          expand: true,
          cwd: '<%= project.srcPublic %>',
          src: [
            'styles/**/*.ttf',
            'styles/**/*.woff',
            'styles/**/*.eot',
            'styles/**/*.woff2',
            'styles/**/*.svg',
            'styles/**/*.otf'
          ],
          dest: '<%= project.devPublic %>'
        },
        {
          expand: true,
          cwd: '<%= project.srcPublic %>',
          src: ['styles/**/*.css'],
          dest: '<%= project.devPublic %>'
        },
        {
          expand: true,
          cwd: '<%= project.srcPublic %>',
          src: ['styles/**/*.less'],
          dest: '<%= project.devPublic %>'
        },
        {
          expand: true,
          cwd: '<%= project.srcPublic %>',
          src: ['assets/**/*'],
          dest: '<%= project.devPublic %>'
        },
        {
          expand: true,
          cwd: '<%= project.src %>',
          src: ['**/*.jade'],
          dest: '<%= project.dev %>'
        }]
      },
      prod: {
        files: [{
          expand: true,
          cwd: '<%= project.src %>',
          src: ['**/*.json'],
          dest: '<%= project.dist %>'
        },
        {
          expand: true,
          cwd: '<%= project.srcPublic %>',
          src: ['styles/images/**/*'],
          dest: '<%= project.distPublic %>'
        },
        {
          expand: true,
          cwd: '<%= project.srcPublic %>',
          src: [
            'styles/**/*.ttf',
            'styles/**/*.woff',
            'styles/**/*.eot',
            'styles/**/*.woff2',
            'styles/**/*.svg',
            'styles/**/*.otf'
          ],
          dest: '<%= project.distPublic %>'
        },
        {
          expand: true,
          cwd: '<%= project.srcPublic %>',
          src: ['styles/**/*.css'],
          dest: '<%= project.distPublic %>'
        },
        {
          expand: true,
          cwd: '<%= project.srcPublic %>',
          src: ['styles/**/*.less'],
          dest: '<%= project.distPublic %>'
        },
        {
          expand: true,
          cwd: '<%= project.src %>',
          src: ['**/*.jade'],
          dest: '<%= project.dist %>'
        },
        {
          expand: true,
          cwd: '<%= project.srcPublic %>',
          src: ['assets/**/*'],
          dest: '<%= project.distPublic %>'
        }]
      }
    },

    'webpack-dev-server': {
      options: {
        // hot: true,
        host: '0.0.0.0',
        inline: true,
        // watchContentBase: true,
        historyApiFallback: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        port: hot_server_port,
        webpack: makeWebpackConfig({ model: 'dev' }),
        public: hot_server_host,
        publicPath: `http://${hot_server_host}:${hot_server_port}`
      },

      start: {}
    },

    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'dev/bin/server.js'
        }
      },
      prod: {
        options: {
          script: '<%= project.dist %>/bin/server.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'path/to/test/server.js'
        }
      }
    },

    watch: {
      options: {

      },

      less: {
        options: {
          livereload: false
        },
        files: ['src/public/styles/**/*.less'],
        tasks: [],
      },

      css: {
        files: 'src/public/styles/main.css',
        tasks: []
      },

      jsons: {
        files: ['src/**/*.json'],
        tasks: ['newer:copy:dev'],
        options: {
          spawn: false,
          interval: 500,
        }
      },

      express: {
        files: ['src/configs/*.js', 'src/configs/*.json', 'src/services/*.js', 'src/*.js', 'src/components/Html.js'],
        tasks: ['newer:babel:dev', 'newer:copy:dev', 'express:dev'],
        options: {
          spawn: false,
          interval: 500
        }
      }
    },

    // todo client and server should monitor different files
    // complete the ignore list to get a better experience on server-side relaunch
    nodemon: {
      client: {
        script: 'dev/bin/server.js',
        options: {
          watch: ['dev/**/*'],
          ignore: ['public/**/*', 'tests/*/*', 'assets.json'],
          nodeArgs: ['--harmony', '--inspect'],
          verbose: true,
        }
      },
      server: {
        script: 'dev/bin/server.js',
        options: {
          nodeArgs: ['--harmony', '--inspect'],
          verbose: true,
          watch: ['dev/**/*'],
          ignore: ['public/**/*', 'tests/*/*', 'assets.json'],
        },
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
    },

    concurrent: {
      client: {
        tasks: ['webpack-dev-server', 'watch', 'nodemon:client'],
        options: {
          logConcurrentOutput: true
        }
      },
      server: {
        tasks: ['webpack-dev-server', 'watch', 'nodemon:server'],
        options: {
          logConcurrentOutput: true
        }
      },
      express: {
        tasks: ['webpack-dev-server', 'express-server'],
        options: {
          logConcurrentOutput: true
        }
      },
      'babel-webpack': {
        tasks: ['watch:scripts', 'watch:jsons', 'webpack-dev-server'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  // defaule model
  grunt.registerTask('default', ['prod']);

  // Development model
  grunt.registerTask('webpack-server', [
    'env:dev',
    'clean:dev',
    'babel:dev',
    'copy:dev',
    'assets',
    'webpack-dev-server'
  ]);

  grunt.registerTask('express-server', [
    'express:dev',
    'watch'
  ]);

  grunt.registerTask('server', [
    'env:dev',
    'clean:dev',
    'babel:dev',
    'copy:dev',
    'assets',
    'concurrent:express'
  ]);

  grunt.registerTask('serve', [
    'env:dev',
    'clean:dev',
    'babel:dev',
    'copy:dev',
    'assets',
    'concurrent:express'
  ]);

  // Production model
  grunt.registerTask('prod', [
    'env:build',
    'clean:prod',
    'babel:prod',
    'copy:prod',
    'webpack:build',
    'express:prod'
  ]);

  // Production model => build
  grunt.registerTask('build', [
    'env:build',
    'clean:prod',
    'babel:prod',
    'copy:prod',
    'webpack:build'
  ]);

  grunt.registerTask('start', [
    'env:build',
    'express:start'
  ]);

  // grunt don't know when the dev webpack has finished,
  // it will cause the app crash because cant find the assets.json.
  // Because the assets is immutable for now
  // just hard code the assets instead get it from the webpack stats
  grunt.registerTask('assets', () => {
    grunt.file.write('dev/configs/assets.json', JSON.stringify({
      assets: {
        'style': `http://${hot_server_host}:${hot_server_port}/main.css`,
        'main': `http://${hot_server_host}:${hot_server_port}/main.js`,
        'common': `http://${hot_server_host}:${hot_server_port}/common.js`
      }
    }, null, 2));

    grunt.log.ok('done');
  });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function() {
    grunt.log.ok('Waiting for server loading...');
    const done = this.async();
    setTimeout(() => {
      grunt.log.writeln('Done waiting!');
      done();
    }, 5000);
  });

  grunt.registerTask('express:start', function() {
    grunt.log.ok('Waiting for server loading...');
    this.async();
    require('./dist/bin/server');
  });

  grunt.event.on('watch', (action, filepath, target) => {
    grunt.log.writeln(`${target}:${filepath} has ${action}`);
  });
};
