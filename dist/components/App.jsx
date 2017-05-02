'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UI = require('./UI');

var _actions = require('../actions');

var _UserControls = require('./UserControls');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App extends _react.Component {

  render() {
    const route = this.props.location.pathname;
    const child = _react2.default.cloneElement(this.props.children);
    return _react2.default.createElement(
      _UI.FullScreen,
      { id: 'app' },
      _react2.default.createElement(_UserControls.Navbar, { route: route }),
      _react2.default.createElement(
        'div',
        { className: 'content-pages' },
        child
      ),
      _react2.default.createElement(_UserControls.Footer, null)
    );
  }
}
exports.default = App;
App.displayName = 'App';
App.propTypes = {
  location: _react.PropTypes.object,
  children: _react.PropTypes.object
};

App.fetchData = (context, params, query, done) => {
  Promise.all([context.executeAction(_actions.UserActions.LoadUsers, params), context.executeAction(_actions.BlogActions.LoadBlogs, params)]).then(() => {
    done();
  });
};

module.exports = exports['default'];
