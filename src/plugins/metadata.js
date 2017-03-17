import express from 'express';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

let router = express.Router();

/**
 * accepts collections and returns it as a downloadable json file
 */
router.post('/', function(req, res, next) {
    let collections = null;
    try {
        collections = JSON.parse(req.body.collections);
    } catch (e) {
        res.send(404, 'Invalid parameters');
    }

    // version + 1, and sort by order
    collections.forEach((collection) => {
        collection.metadata.forEach((item) => {
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
