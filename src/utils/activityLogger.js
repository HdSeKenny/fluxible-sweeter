import onFinished from 'on-finished';
import {DIUserActivity} from '../models'
import os from 'os';

var activityLogger = (req, res, next)=> {
    req.startTime = (new Date()).getTime();

    var gatherInfoes = () => {
        var current = (new Date()).getTime();
        var userId = (req.session && req.session.user && req.session.user.id && req.session.user.id.uac) ? req.session.user.id.uac : null;

        return {
            session_id: req.sessionID,
            activity_ts: Date.now(),

            url: req.url,
            method: req.method,
            status_code: res.statusCode,

            username: userId,
            device_profile: req.useragent,
            client_ipaddress: req.headers['x-real-client-ip'] ? req.headers['x-real-client-ip'] : req.ip,

            host_name: os.hostname(),
            host_address: req.headers.host,

            response_time: (current - req.startTime) / 1000,
            response_size: res.get('content-length')
        };

    };

    var saveLog = (info)=> {
        var activity = DIUserActivity(info);
        activity.save(function (err) {
            console.log("activity log saved");
        });
    };

    var onResponseFinished = function () {
        var info = gatherInfoes();
        saveLog(info);
    };
    onFinished(res, onResponseFinished);
    next();
};

module.exports = activityLogger;