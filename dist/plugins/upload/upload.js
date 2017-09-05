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

const getSlashPosition = (string, word, index) => {
  return string.split(word, index).join(word).length;
};

const getSlashNumber = string => {
  return string.length > 0 ? string.split('/').length : 0;
};

const convertImagePath = () => {
  const slashNumber = getSlashNumber(__dirname);
  const slashPositon = getSlashPosition(__dirname, '/', slashNumber - 2);
  const uri = __dirname.substring(0, slashPositon);
  return `${uri}/public/styles/images/upload/`;
};

const storage = _multer2.default.diskStorage({
  destination: function (req, file, cb) {
    cb(null, convertImagePath());
  },
  filename: function (req, file, cb) {
    const datetimestamp = Date.now();
    const fileParams = file.originalname.split('.');
    const fileFormat = fileParams[fileParams.length - 1];
    cb(null, `${datetimestamp}.${fileFormat}`);
  }
});

const upload = (0, _multer2.default)({ storage: storage }).single('slim');

const copyImageIntoFolder = filename => {
  const src = convertImagePath();
  const destDir = `${_configs2.default.server.root}/src/public/styles/images/upload/`;
  const inStr = _fs2.default.createReadStream(`${src}${filename}`);
  const outStr = _fs2.default.createWriteStream(`${destDir}${filename}`);

  inStr.pipe(outStr);
};

exports.default = {
  changeProfileImage: function (req, res) {
    _mongodb2.default.connect(_configs2.default.mongo.sweeter.url, (err, db) => {
      const userId = _mongodb2.default.ObjectID(req.params.userId);
      const User = db.collection('users');
      upload(req, res, uploadError => {
        if (uploadError) {
          throw uploadError;
        }
        const { filename: filename } = req.file;

        // Copy the image file into src
        copyImageIntoFolder(filename);

        const newImgUri = `/styles/images/upload/${filename}`;
        const updateData = { $set: { 'image_url': newImgUri } };
        User.updateOne({ '_id': userId }, updateData, updateErr => {
          if (updateErr) {
            throw updateErr;
          }
          User.findOne({ '_id': userId }, (findErr, newUser) => {
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
