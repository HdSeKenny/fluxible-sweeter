'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = _express2.default.Router();

/**
 * accepts collections and returns it as a downloadable json file
 */
router.post('/', function (req, res, next) {
    let collections = null;
    try {
        collections = JSON.parse(req.body.collections);
    } catch (e) {
        res.send(404, 'Invalid parameters');
    }

    // version + 1, and sort by order
    collections.forEach(collection => {
        collection.metadata.forEach(item => {
            item._id.version = collection.version;
        });
    });

    // respond
    let fileContent = JSON.stringify(collections, null, 4);
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename='collections.json'`
    });
    res.write(fileContent);
    res.end();
});

module.exports = router;
