'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DraftStyleButton = require('./DraftStyleButton');

var _DraftStyleButton2 = _interopRequireDefault(_DraftStyleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InlineStyleControls = function (_React$Component) {
  (0, _inherits3.default)(InlineStyleControls, _React$Component);

  function InlineStyleControls(props) {
    (0, _classCallCheck3.default)(this, InlineStyleControls);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InlineStyleControls.__proto__ || (0, _getPrototypeOf2.default)(InlineStyleControls)).call(this, props));

    _this.state = {
      INLINE_STYLES: [{ label: 'Bold', style: 'BOLD' }, { label: 'Italic', style: 'ITALIC' }, { label: 'Underline', style: 'UNDERLINE' }, { label: 'Monospace', style: 'CODE' }]
    };
    return _this;
  }

  (0, _createClass3.default)(InlineStyleControls, [{
    key: 'render',
    value: function render() {
      var INLINE_STYLES = this.state.INLINE_STYLES;
      var _props = this.props,
          editorState = _props.editorState,
          onToggle = _props.onToggle;

      var currentStyle = editorState.getCurrentInlineStyle();
      return _react2.default.createElement(
        'div',
        { className: 'RichEditor-controls' },
        INLINE_STYLES.map(function (type) {
          return _react2.default.createElement(_DraftStyleButton2.default, {
            key: type.label,
            active: currentStyle.has(type.style),
            label: type.label,
            onToggle: onToggle,
            style: type.style
          });
        })
      );
    }
  }]);
  return InlineStyleControls;
}(_react2.default.Component);

InlineStyleControls.propTypes = {
  editorState: _propTypes2.default.object,
  onToggle: _propTypes2.default.func
};
exports.default = InlineStyleControls;
module.exports = exports['default'];