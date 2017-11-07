'use strict';

var path = require('path');
var params = require('./params');
var instance = require('./instance');

module.exports = {
  project: 'Sweeter',
  mongo: {
    session: {
      url: 'mongodb://localhost/sweetersession',
      ttl: 60 * 40 // 20 min
    },
    sweeter: {
      url: 'mongodb://localhost/sweeter'
    },
    connectErrorMsg: 'Please check configuration is right or datebase is running properly.'
  },
  server: {
    host: 'localhost',

    // user activity logger
    logUserActivity: true,

    // enable logger middleware
    logEnable: true,

    // Browser-sync port
    browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,

    // Server port
    port: process.env.PORT || 9000,

    // Production source path
    prodSource: path.join(__dirname, '..', 'build'),

    // Development source path
    devSource: path.join(__dirname, '..', '..', '.tmp'),

    // Public source path
    lib: path.join(__dirname, '..', '..', 'lib'),

    // Favicon icon path
    faviconPath: path.join(__dirname, '..', '..', 'lib', 'images', 'favicon.ico')
  },
  development: {
    hot_server_host: 'localhost',
    hot_server_port: 5858
  },
  userRoles: ['guest', 'user', 'admin'],
  kenny: '583ff3d6a193d70f6946948e',
  requestBodySize: '20mb',
  indexedDB: {
    name: 'sweeter',
    version: 1,
    dateKey: 'last_updated_date',
    expired: 180 * 60 * 1000 // 3 hours
  },
  params: params,
  path_prefix: instance.name ? '/' + instance.name : ''
};