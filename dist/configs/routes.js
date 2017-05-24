'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getSlashPosition = (string, word, index) => {
  return string.split(word, index).join(word).length;
};

const getSlashNumber = string => {
  return string.length > 0 ? string.split('/').length : 0;
};

exports.default = app => {
  /**
   * User multer to upload user image
   * @param  {[type]}
   * @param  {[type]}
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */

  const storage = _multer2.default.diskStorage({
    destination: (req, file, cb) => {
      const slashNumber = getSlashNumber(__dirname);
      const slashPositon = getSlashPosition(__dirname, '/', slashNumber - 1);
      const uri = __dirname.substring(0, slashPositon);
      cb(null, `${uri}/public/images/upload/`);
    },
    filename: (req, file, cb) => {
      const datetimestamp = Date.now();
      const fileParams = file.originalname.split('.');
      const fileFormat = fileParams[fileParams.length - 1];
      cb(null, `${datetimestamp}.${fileFormat}`);
    }
  });

  const upload = (0, _multer2.default)({ storage: storage }).single('file');

  app.post('/api/:userId/upload_profile_image', (req, res) => {
    _mongodb2.default.connect(_server2.default.mongo.sweeter.url, (err, db) => {
      const userId = _mongodb2.default.ObjectID(req.params.userId);
      const User = db.collection('users');
      upload(req, res, uploadError => {
        if (uploadError) {
          throw uploadError;
        }
        const newImgUri = `/images/upload/${req.file.filename}`;
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
  });
};

module.exports = exports['default'];
