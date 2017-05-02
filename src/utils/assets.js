// const path = require('path');
let webpackAssets;

try {
  webpackAssets = require('../configs/assets.json');
} catch (e) {
  throw new Error('Please run `grunt prod or grunt` to generate the js assets.');
}

const assets = {};

assets.common = webpackAssets.assets.common;
assets.main = webpackAssets.assets.main;
assets.style = webpackAssets.assets.style;
assets.essentials = webpackAssets.assets.essentials ? webpackAssets.assets.essentials : null;

export default assets;
