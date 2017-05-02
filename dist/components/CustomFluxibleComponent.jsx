'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * adding child context to react component
 */
const CustomFluxibleComponent = _react2.default.createClass({
  displayName: 'CustomFluxibleComponent',

  propTypes: {
    context: _react2.default.PropTypes.object.isRequired,
    children: _react2.default.PropTypes.object
  },

  childContextTypes: {
    executeAction: _react2.default.PropTypes.func.isRequired,
    getStore: _react2.default.PropTypes.func.isRequired,
    config: _react2.default.PropTypes.object
  },

  /**
     * Provides the current context as a child context
     * @method getChildContext
     */
  getChildContext: function () {
    return { getStore: this.props.context.getStore, executeAction: this.props.context.executeAction, config: this.props.context.config };
  },
  render: function () {
    return _react2.default.cloneElement(this.props.children, { context: this.props.context });
  }
});
exports.default = CustomFluxibleComponent;
module.exports = exports['default'];
