'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DraftStyleButton = require('./DraftStyleButton');

var _DraftStyleButton2 = _interopRequireDefault(_DraftStyleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InlineStyleControls = function (_React$Component) {
  _inherits(InlineStyleControls, _React$Component);

  function InlineStyleControls(props) {
    _classCallCheck(this, InlineStyleControls);

    var _this = _possibleConstructorReturn(this, (InlineStyleControls.__proto__ || Object.getPrototypeOf(InlineStyleControls)).call(this, props));

    _this.state = {
      INLINE_STYLES: [{ label: 'Bold', style: 'BOLD' }, { label: 'Italic', style: 'ITALIC' }, { label: 'Underline', style: 'UNDERLINE' }, { label: 'Monospace', style: 'CODE' }]
    };
    return _this;
  }

  _createClass(InlineStyleControls, [{
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