import _ from 'lodash';

function jsonifyComplexType(value) {
  if (_.isArray(value) || _.isObject(value)) {
    return JSON.stringify(value);
  }
  return value;
}

const fetchClientConfig = {
  constructGetUri(baseUri, resource, params, config, context) {
    const query = [];
    const matrix = [];
    const id_param = config.id_param;

    let final_uri = `${baseUri}/${resource}`;
    let id_val;

    if (params) {
      _.each(params, (v, k) => {
        if (k === id_param) {
          id_val = encodeURIComponent(v);
        } else {
          try {
            matrix.push(`${k}=${encodeURIComponent(jsonifyComplexType(v))}`);
          } catch (err) {
            console.error(`jsonifyComplexType failed: ${err}`);
          }
        }
      });
    }

    if (context) {
      _.each(context, (v, k) => {
        query.push(`${k}=${encodeURIComponent(jsonifyComplexType(v))}`);
      });
    }

    // query.push('_t=' + new Date().getTime());

    if (id_val) {
      final_uri += `/${id_param}/${id_val}`;
    }
    if (matrix.length > 0) {
      final_uri += `;${matrix.sort().join(';')}`;
    }
    if (query.length > 0) {
      final_uri += `?${query.sort().join('&')}`;
    }

    return final_uri;
  }
};

export default fetchClientConfig;