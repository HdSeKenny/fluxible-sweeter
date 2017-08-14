var _ = require('lodash')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs'))
var path = require('path')

var cache = {}

var defaultOptions = {
  cache: true,
  ext: 'dust'
}

var defaultDust = require('dustjs-linkedin')

var dust = defaultDust

function readContentFromPaths (paths, name, ext) {
  return new Promise(function (resolve, reject) {
    var _path = paths.shift()
    fs.readFileAsync(path.resolve(_path, name) + ext)
      .then(function (content) {
        resolve(content.toString())
      }, function (err) {
        if (paths.length) {
          return resolve(readContentFromPaths(paths, name, ext))
        }

        reject(err)
      })
  })
}

module.exports = function (dustjs) {
  return module.exports.bind(dustjs)
}

Object.defineProperty(module.exports, 'bind', {
  enumerable: true,
  value: function (dustjs) {
    if (!_.isPlainObject(dustjs)) {
      dust = require('dustjs-linkedin')
    }

    return module.exports
  }
})

Object.defineProperty(module.exports, 'engine', {
  emuerable: true,
  value: function (opts) {
    var dustOptions = _.merge({}, defaultOptions, opts)

    if (dustOptions.useHelpers) {
      require('dustjs-helpers')
    }

    return function (file, options, callback) {
      var compiler

      if (dustOptions.cache) {
        compiler = cache[file]
      }

      var ext = '.' + (options.ext || dustOptions.ext)

      if (!_.isFunction(compiler)) {
        var content = fs.readFileSync(file).toString()
        compiler = dust.compileFn(content)

        if (dustOptions.cache) {
          cache[file] = compiler
        }
      }

      dust.onLoad = function (name, callback) {
        readContentFromPaths([].concat(options.settings.views), name, ext)
          .then(function (content) {
            callback(null, content)
          }, callback)
      }

      compiler(options, function (err, content) {
        if (err) {
          return callback(err)
        }

        callback(null, content)
      })
    }
  }
})

Object.defineProperty(module.exports, '_', {
  enumerable: true,
  get: function () {
    return dust
  }
})
