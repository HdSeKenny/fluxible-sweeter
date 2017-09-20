// Project configs
const params = require('./params');
const instance = require('./instance');

module.exports = {
  project: 'Sweeter',
  mongo: {
    session: {
      url: 'mongodb://localhost/sweetersession',
      ttl: 60 * 40  // 20 min
    },
    sweeter: {
      url: 'mongodb://localhost/sweeter',
    },
    connectErrorMsg: 'Please check configuration is right or datebase is running properly.'
  },
  server: {
    port: 3000,
    host: 'localhost',
    logUserActivity: true,   // user activity logger
    logEnable: true  // enable logger middleware
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
    expired: 180 * 60 * 1000  // 3 hours
  },
  params,
  path_prefix: instance.name ? `/${instance.name}` : ''
};