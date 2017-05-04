'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FullScreen extends _react.Component {

  getClassName() {
    return (0, _classnames2.default)({
      'fullscreen': true,
      'fullscreen-scroll': this.props.scroll
    }, this.props.className);
  }

  render() {
    const className = this.getClassName();
    return _react2.default.createElement(
      'div',
      _extends({}, this.props, { className: className }),
      this.props.children
    );
  }
}
exports.default = FullScreen;
FullScreen.displayName = 'FullScreen';
FullScreen.propTypes = {
  className: _react2.default.PropTypes.string,
  scroll: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.array
};
module.exports = exports['default'];
