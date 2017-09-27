'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _configs = require('../../configs');

var _configs2 = _interopRequireDefault(_configs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getSlashPosition = function getSlashPosition(string, word, index) {
  return string.split(word, index).join(word).length;
};

var getSlashNumber = function getSlashNumber(string) {
  return string.length > 0 ? string.split('/').length : 0;
};

var convertImagePath = function convertImagePath() {
  var slashNumber = getSlashNumber(__dirname);
  var slashPositon = getSlashPosition(__dirname, '/', slashNumber - 2);
  var uri = __dirname.substring(0, slashPositon);
  return uri + '/public/styles/images/upload/';
};

var storage = _multer2.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, convertImagePath());
  },
  filename: function filename(req, file, cb) {
    var datetimestamp = Date.now();
    var fileParams = file.originalname.split('.');
    var fileFormat = fileParams[fileParams.length - 1];
    cb(null, datetimestamp + '.' + fileFormat);
  }
});

var upload = (0, _multer2.default)({ storage: storage }).single('slim');

var copyImageIntoFolder = function copyImageIntoFolder(filename) {
  var src = convertImagePath();
  var destDir = _configs2.default.server.root + '/src/public/styles/images/upload/';
  var inStr = _fs2.default.createReadStream('' + src + filename);
  var outStr = _fs2.default.createWriteStream('' + destDir + filename);

  inStr.pipe(outStr);
};

exports.default = {
  changeProfileImage: function changeProfileImage(req, res) {
    _mongodb2.default.connect(_configs2.default.mongo.sweeter.url, function (err, db) {
      var userId = _mongodb2.default.ObjectID(req.params.userId);
      var User = db.collection('users');
      upload(req, res, function (uploadError) {
        if (uploadError) {
          throw uploadError;
        }
        var filename = req.file.filename;

        // Copy the image file into src

        copyImageIntoFolder(filename);

        var newImgUri = '/styles/images/upload/' + filename;
        var updateData = { $set: { 'image_url': newImgUri } };
        User.updateOne({ '_id': userId }, updateData, function (updateErr) {
          if (updateErr) {
            throw updateErr;
          }
          User.findOne({ '_id': userId }, function (findErr, newUser) {
            if (findErr) {
              throw findErr;
            }
            res.status(200).json(newUser);
          });
        });
      });
    });
  }
};
module.exports = exports['default'];