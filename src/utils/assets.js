// const path = require('path');
let webpackAssets;

try {
  webpackAssets = require('../public/assets/assets.json');
} catch (e) {
  throw new Error('Please run `grunt prod or grunt` to generate the js assets.');
}

const assets = {};

assets.common_js = webpackAssets.assets.common_js;
assets.main_js = webpackAssets.assets.main_js;
assets.main_css = webpackAssets.assets.main_css;
assets.essentials = webpackAssets.assets.essentials ? webpackAssets.assets.essentials : null;

export default assets;
