const path = require('path');
const params = require('./params');
const instance = require('./instance');

module.exports = {
  project: {
    name: 'Sweeter',
    gtihub: 'https://github.com/HdSeKenny/fluxible-sweeter',
    githubName: 'fluxible-sweeter',
    commitsUrl: 'https://github.com/HdSeKenny/fluxible-sweeter/commits/master',
    references: 'All the pictures in this website comes from Google, the Copyright of images belongs to Google'
  },
  developer: {
    image: '/images/kenny.jpg',
    github: 'https://github.com/HdSeKenny',
    username: 'Kenny',
    job: 'Web Developer',
    email: 'shkuanlu@qq.com',
    gender: 'Male',
    birthday: '12/20/1991',
    description: 'A beginner in web development. ^_^'
  },
  mongo: {
    session: {
      url: 'mongodb://localhost/sweetersession',
      ttl: 60 * 40  // 20 min
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
    hot_server_port: 5757
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
