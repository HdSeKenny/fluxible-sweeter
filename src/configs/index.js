const  hostConfig = require('./host.json');
const config = {
    userProfileExpire: 40,
    program:`Kenny's Blog`
};

config.path_prefix = hostConfig.instance_name ? '/': hostConfig.instance_name;

module.exports = config;
