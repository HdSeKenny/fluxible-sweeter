var config = require('../configs');

module.exports = {

      urlContent: function (url) {
        return config.path_prefix + url;
      }

};
