'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

require('babel-polyfill');

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _components = require('./components');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _fetchData = require('./utils/fetchData');

var _fetchData2 = _interopRequireDefault(_fetchData);

var _indexedDB = require('./utils/indexedDB');

var _indexedDB2 = _interopRequireDefault(_indexedDB);

require('./public/styles/main.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './polyfills';
var socket = _socket2.default.connect();

window.React = _react2.default;
window.socket = socket;

var dehydratedState = window.__DATA__;
var firstRender = true;

// const dehydratedStores = dehydratedState.context.dispatcher.stores;
_indexedDB2.default.init().then(function () {
  // Check if it should clear the indexedDB
  _indexedDB2.default.checkIndexedDBClear();

  _app2.default.rehydrate(dehydratedState, function (err, context) {
    if (err) {
      throw err;
    }
    window.context = context;

    // const _dispatcherStores = app._dispatcher.stores;
    // const fluxibleStores = Object.keys(_dispatcherStores).map(key => {
    //   return context.getStore(key);
    // });

    var routes = (0, _routes2.default)(context);
    var scrollRoutes = ['list', 'about', ':blogId/details', ':username'];
    function UpdateRoute() {
      if (!firstRender) {
        (0, _fetchData2.default)(context, this.state);
      }
      firstRender = false;
      var targetPath = this.state.routes[1].path;
      if (!targetPath || scrollRoutes.includes(targetPath) && this.state.routes.length < 3) {
        window.scrollTo(0, 0);
      }
    }

    _reactDom2.default.render(_react2.default.createElement(_components.Custom, { context: context.getComponentContext() }, _react2.default.createElement(_reactRouter.Router, {
      history: _reactRouter.browserHistory,
      children: routes,
      onUpdate: UpdateRoute
    })), document.getElementById('main'));
  });
}).catch(function (initError) {
  // eslint-disable-next-line no-console
  console.log('initError', initError);
});