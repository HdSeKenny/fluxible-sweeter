import serverConfig from './server';
import MongoClient from 'mongodb';
import multer from 'multer';

module.exports = (app) => {
/**
 * User multer to upload user image
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const slashNumber = getSlashNumber(__dirname);
      const slashPositon = getSlashPosition(__dirname,'/', slashNumber-1);
      const uri = __dirname.substring(0,slashPositon);
      cb(null, `${uri}/public/images/upload/`);
    },
    filename: (req, file, cb) => {
      const datetimestamp = Date.now();
      const fileParams = file.originalname.split('.');
      const fileFormat = fileParams[fileParams.length -1];
      cb(null, `${datetimestamp}.${fileFormat}`);
    }
  });

  const upload = multer({ storage: storage }).single('file');

  app.post('/api/:userId/changeProfileImage',(req, res) => {
    MongoClient.connect(serverConfig.mongo.kenny.url, (err, db) => {
      const userId = MongoClient.ObjectID(req.params.userId);
      const User = db.collection('users');
      upload(req, res, (uploadError) => {
          const newImgUri = `/images/upload/${req.file.filename}`;
          const updateData = { $set:{'image_url': newImgUri}};
          User.updateOne({'_id': userId}, updateData, (err, result) => {
            User.findOne({'_id': userId}, (err, newUser) => {
              if (err) {
                res.status(404);
              }
              res.status(200).json(newUser);
            })
          })
      });
    })
  })
};

const getSlashPosition = (string, word, index) =>{
  return string.split(word, index).join(word).length;
}

const getSlashNumber = (string) => {
  return string.length > 0 ? string.split('/').length : 0;
}
