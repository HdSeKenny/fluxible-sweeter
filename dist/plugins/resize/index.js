'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (url, width, height, callback) => {
  // eslint-disable-next-line
  const sourceImage = new Image();
  sourceImage.onload = function () {
    // Create a canvas with the desired dimensions
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    // Scale and draw the source image to the canvas
    canvas.getContext('2d').drawImage(sourceImage, 0, 0, width, height);

    // Convert the canvas to a data URL in PNG format
    callback(canvas.toDataURL());
  };

  sourceImage.src = url;
};

module.exports = exports['default'];
