'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * adding child context to react component
 */
exports.default = (0, _createReactClass2.default)({

  displayName: 'Custom',

  propTypes: {
    context: _propTypes2.default.object,
    children: _propTypes2.default.object
  },

  childContextTypes: {
    executeAction: _propTypes2.default.func,
    getStore: _propTypes2.default.func,
    config: _propTypes2.default.object
  },

  /**
     * Provides the current context as a child context
     * @method getChildContext
     */
  getChildContext: function getChildContext() {
    return { getStore: this.props.context.getStore, executeAction: this.props.context.executeAction, config: this.props.context.config };
  },
  render: function render() {
    return _react2.default.cloneElement(this.props.children, { context: this.props.context });
  }
});
module.exports = exports['default'];