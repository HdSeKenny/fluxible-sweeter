'use strict';

var _onFinished = require('on-finished');

var _onFinished2 = _interopRequireDefault(_onFinished);

var _models = require('../models');

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var activityLogger = (req, res, next) => {
    req.startTime = new Date().getTime();

    var gatherInfoes = () => {
        var current = new Date().getTime();
        var userId = req.session && req.session.user && req.session.user.id && req.session.user.id.uac ? req.session.user.id.uac : null;

        return {
            session_id: req.sessionID,
            activity_ts: Date.now(),

            url: req.url,
            method: req.method,
            status_code: res.statusCode,

            username: userId,
            device_profile: req.useragent,
            client_ipaddress: req.headers['x-real-client-ip'] ? req.headers['x-real-client-ip'] : req.ip,

            host_name: _os2.default.hostname(),
            host_address: req.headers.host,

            response_time: (current - req.startTime) / 1000,
            response_size: res.get('content-length')
        };
    };

    var saveLog = info => {
        var activity = (0, _models.DIUserActivity)(info);
        activity.save(function (err) {
            console.log("activity log saved");
        });
    };

    var onResponseFinished = function () {
        var info = gatherInfoes();
        saveLog(info);
    };
    (0, _onFinished2.default)(res, onResponseFinished);
    next();
};

module.exports = activityLogger;
