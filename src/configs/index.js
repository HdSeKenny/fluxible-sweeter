const hostConfig = require('./host');

const config = {
  userProfileExpire: 40,
  program: 'K.Blog'
};

config.path_prefix = hostConfig.instance_name ? '/' : hostConfig.instance_name;

module.exports = config;
