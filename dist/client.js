'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('babel-polyfill');

require('bootstrap/dist/js/bootstrap');

require('./polyfills');

var _CustomFluxibleComponent = require('./components/CustomFluxibleComponent');

var _CustomFluxibleComponent2 = _interopRequireDefault(_CustomFluxibleComponent);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _fetchData = require('./utils/fetchData');

var _fetchData2 = _interopRequireDefault(_fetchData);

require('./public/styles/main.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.React = _react2.default;
window.jQuery = _jquery2.default;

const dehydratedState = window.__DATA__;
let firstRender = true;

_app2.default.rehydrate(dehydratedState, (err, context) => {
  if (err) {
    throw err;
  }
  window.context = context;

  const routes = (0, _routes2.default)(context);

  function UpdateRoute() {
    if (!firstRender) {
      (0, _fetchData2.default)(context, this.state);
    }
    firstRender = false;
  }

  _reactDom2.default.render(_react2.default.createElement(_CustomFluxibleComponent2.default, { context: context.getComponentContext() }, _react2.default.createElement(_reactRouter.Router, {
    history: _reactRouter.browserHistory,
    children: routes,
    onUpdate: UpdateRoute
  })), document.getElementById('main'));
});
