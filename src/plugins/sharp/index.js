// const sharp = require('sharp');
// const path = require('path');
// const async = require('async');
// const chalk = require('chalk');
// const _ = require('lodash');

// const detectDestType = function(dest) {
//   return _.endsWith(dest, '/') ? 'directory' : 'file';
// };

// const unixifyPath = function(filepath) {
//   return (process.platform === 'win32') ? filepath.replace(/\\/g, '/') : filepath;
// };

// const processName = function(name, data) {
//   return name.replace(/{([^{}]*)}/g, (a, b) => {
//     const r = data[b];
//     return typeof r === 'string' || typeof r === 'number' ? r : a;
//   });
// };

// const writeImage = function(data, image, rename, callback) {
//   const src = image.src;
//   const ext = image.ext;
//   let dest = image.dest;
//   const dir = path.dirname(dest);
//   const base = path.basename(dest, ext);

//   fs.mkdirSync(dir);
//   dest = rename ? path.join(dir, processName(rename, { base, ext: ext.substr(1) })) : dest;
//   data.toFile(dest, (err, info) => {
//     if (err) {
//       return callback(err);
//     }
//     console.log(`Images: ${chalk.cyan(src)} -> ${chalk.cyan(dest)}`);
//     callback(null, info);
//   });
// };

// const modifyImage = function(image, options, done) {
//   const tasks = _.map(options.tasks || [options], (task) => {
//     return function(callback) {
//       const data = sharp(image.src);
//       _.map(task, (args, op) => {
//         if (data[op]) {
//           // eslint-disable-next-line
//           data[op].apply(data, [].concat(args));
//         } else if (op !== 'rename') {
//           console.log(`Skipping unknown operation: ${op}`);
//         }
//       });
//       writeImage(data, image, task.rename, callback);
//     };
//   });

//   async.parallel(tasks, (err, result) => {
//     if (err) {
//       return done(new Error(err));
//     }
//     done(null, result);
//   });
// };

// const getImages = function(files) {
//   return _.reduce(files, (memo, filePair) => {
//     const isExpandedPair = !!filePair.orig.expand;
//     const isExtDotLast = (filePair.orig.extDot === 'last');
//     const isDirectory = (detectDestType(filePair.dest) === 'directory');
//     const extDot = {
//       first: /.*?(\.[^\/]*)$/, // eslint-disable-line
//       last: /.*?(\.[^\/\.]*)$/ // eslint-disable-line
//     };
//     const images = _.map(filePair.src, (src) => {
//       const ext = src.replace(isExtDotLast ? extDot.last : extDot.first, '$1');
//       const dest = (!isExpandedPair && isDirectory) ? unixifyPath(path.join(filePair.dest, src)) : filePair.dest;
//       return { src, ext, dest };
//     });
//     return memo.concat(images);
//   }, []);
// };

// const modifyImages = function(images, options, done) {
//   const tasks = _.map(images, (image) => {
//     return function(callback) {
//       modifyImage(image, options, callback);
//     };
//   });

//   async.parallel(tasks, (err, results) => {
//     if (err) {
//       return done(new Error(err));
//     }
//     const total = results.reduce((memo, result) => {
//       return memo + result.length;
//     }, 0);
//     console.log(`Generated ${chalk.cyan(total.toString())} + ${(total === 1 ? ' image' : ' images')}`);
//     done();
//   });
// };

function resizeImage(url, width, height, callback) {
  var sourceImage = new Image();

  sourceImage.onload = function() {
    // Create a canvas with the desired dimensions
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    // Scale and draw the source image to the canvas
    canvas.getContext("2d").drawImage(sourceImage, 0, 0, width, height);

    // Convert the canvas to a data URL in PNG format
    callback(canvas.toDataURL());
  }

  sourceImage.src = url;
}

module.exports = {
  resizeImage
};
