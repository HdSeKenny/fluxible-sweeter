'use strict';

const hostConfig = require('./host.json');
const params = require('./params.json');

const config = {
  userProfileExpire: 40,
  program: 'Sweeter',
  params: params
};

config.path_prefix = (hostConfig.instance_name ? '/' : '') + hostConfig.instance_name;

// export default config;
module.exports = config;
