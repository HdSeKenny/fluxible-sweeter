'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DraftStyleButton = require('./DraftStyleButton');

var _DraftStyleButton2 = _interopRequireDefault(_DraftStyleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InlineStyleControls extends _react2.default.Component {

  constructor(props) {
    super(props);
    this.state = {
      INLINE_STYLES: [{ label: 'Bold', style: 'BOLD' }, { label: 'Italic', style: 'ITALIC' }, { label: 'Underline', style: 'UNDERLINE' }, { label: 'Monospace', style: 'CODE' }]
    };
  }

  render() {
    const { INLINE_STYLES: INLINE_STYLES } = this.state;
    const { editorState: editorState, onToggle: onToggle } = this.props;
    const currentStyle = editorState.getCurrentInlineStyle();
    return _react2.default.createElement(
      'div',
      { className: 'RichEditor-controls' },
      INLINE_STYLES.map(type => _react2.default.createElement(_DraftStyleButton2.default, {
        key: type.label,
        active: currentStyle.has(type.style),
        label: type.label,
        onToggle: onToggle,
        style: type.style
      }))
    );
  }
}
exports.default = InlineStyleControls;
InlineStyleControls.propTypes = {
  editorState: _propTypes2.default.object,
  onToggle: _propTypes2.default.func
};
module.exports = exports['default'];
