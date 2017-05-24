'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DraftStyleButton extends _react2.default.Component {

  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return _react2.default.createElement(
      'span',
      { className: className, onMouseDown: this.onToggle },
      this.props.label
    );
  }
}
exports.default = DraftStyleButton;
DraftStyleButton.propTypes = {
  onToggle: _propTypes2.default.func,
  style: _propTypes2.default.string,
  active: _propTypes2.default.bool,
  label: _propTypes2.default.string
};
module.exports = exports['default'];
