const concurrent = require('contra').concurrent;
const _ = require('lodash');

function fetchData(context, routerState, cb) {
  cb = cb || function noop() {};
  var fetchDataRoutes = _.filter(routerState.components, function(component) {

    return component.fetchData;
  });
  if (fetchDataRoutes.length === 0) {
    return cb();
  }
  var dataFetchers = _.reduce(fetchDataRoutes, function(result, component) {
    var fetcher = component.fetchData
      .bind(null, context, routerState.params, routerState.location.query);
    var name = component.displayName || component.name;
    result[name] = fetcher;
    return result;
  }, {});


  concurrent(dataFetchers, cb);
}

module.exports = fetchData;
