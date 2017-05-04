const path = require('path');
const config = require('./');
const environmentConfig = require('./server_overwrite.json');

const serverConfig = {
  mongo: {
    session: {
      url: 'mongodb://localhost/sweetersession',
      ttl: 60 * config.userProfileExpire  // 20 min
    },
    sweeter: {
      url: 'mongodb://localhost/sweeter',
    },
    connectErrorMsg: 'Please check configuration is right or datebase is running properly.'
  },
  server: {
    addr: '',
    port: 9000,

    host: 'localhost',
    // user activity logger
    logUserActivity: true,

    root: path.normalize(`${__dirname}/../..`),

    browserSyncPort: process.env.BROWSER_SYNC_PORT || 9000,

    // enable logger middleware ,it should set to false on production env
    logEnable: true
  },

  userRoles: ['guest', 'user', 'admin'],
  apiService: 'http://localhost:9000/api/',
  apiTimeout: 120000, // .net api timeout
  APIAuthHeader: 'Basic cXVhdHRyb3VzZXIxOjFxYXoyd3N4',
  exportPath: '/tmp',
  requestBodySize: '20mb',
};

if (environmentConfig.apiService) {
  serverConfig.apiService = environmentConfig.apiService;
}
if (environmentConfig.APIAuthHeader) {
  serverConfig.APIAuthHeader = environmentConfig.APIAuthHeader;
}

module.exports = serverConfig;
