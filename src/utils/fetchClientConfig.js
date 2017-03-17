var _ = require('lodash')

function jsonifyComplexType(value) {
    if (_.isArray(value) || _.isObject(value)) {
        return JSON.stringify(value);
    }
    return value;
}
var fetchClientConfig = {
    constructGetUri: function (baseUri, resource, params, config, context) {
        var query = [];
        var matrix = [];
        var id_param = config.id_param;
        var id_val;
        var final_uri = baseUri + '/' + resource;

        if (params) {
            _.each(params, function eachParam(v, k) {
                if (k === id_param) {
                    id_val = encodeURIComponent(v);
                } else {
                    try {
                        matrix.push(k + '=' + encodeURIComponent(jsonifyComplexType(v)));
                    } catch (err) {
                        debug('jsonifyComplexType failed: ' + err);
                    }
                }
            });
        }

        if (context) {
            _.each(context, function eachContext(v, k) {
                query.push(k + '=' + encodeURIComponent(jsonifyComplexType(v)));
            });
        }

        query.push('_t=' + new Date().getTime());

        if (id_val) {
            final_uri += '/' + id_param + '/' + id_val;
        }
        if (matrix.length > 0) {
            final_uri += ';' + matrix.sort().join(';');
        }
        if (query.length > 0) {
            final_uri += '?' + query.sort().join('&');
        }


        return final_uri;
    }
}

module.exports = fetchClientConfig