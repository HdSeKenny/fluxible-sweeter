'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// const path = require('path');
var webpackAssets = void 0;

try {
  webpackAssets = require('../configs/assets.json');
} catch (e) {
  throw new Error('Please run `grunt prod or grunt` to generate the js assets.');
}

var assets = {};

assets.common = webpackAssets.assets.common;
assets.main = webpackAssets.assets.main;
assets.style = webpackAssets.assets.style;
assets.essentials = webpackAssets.assets.essentials ? webpackAssets.assets.essentials : null;

exports.default = assets;
module.exports = exports['default'];