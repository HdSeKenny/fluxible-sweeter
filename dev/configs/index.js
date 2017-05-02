'use strict';

// import hostConfig from './host';
// import params from './params';
const hostConfig = require('./host');
const params = require('./params');

const config = {
  userProfileExpire: 40,
  program: 'K.Blog',
  params: params
};

config.path_prefix = hostConfig.instance_name ? '/' : hostConfig.instance_name;

// export default config;
module.exports = config;
