var path = require('path');
var webpackAssets;
try {
    webpackAssets = require('../public/build/assets.json');
} catch (e) {
    throw new Error('Please run `grunt prod or grunt` to generate the js assets.');
}
var assets = {};

assets.common = webpackAssets.assets.common;
assets.main = webpackAssets.assets.main;
assets.essentials = webpackAssets.assets.essentials ? webpackAssets.assets.essentials : null;

export default assets;