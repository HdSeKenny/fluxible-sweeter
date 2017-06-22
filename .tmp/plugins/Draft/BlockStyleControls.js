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

class BlockStyleControls extends _react2.default.Component {

  constructor(props) {
    super(props);
    this.state = {
      BLOCK_TYPES: [{ label: 'H1', style: 'header-one' }, { label: 'H2', style: 'header-two' }, { label: 'H3', style: 'header-three' }, { label: 'H4', style: 'header-four' }, { label: 'H5', style: 'header-five' }, { label: 'H6', style: 'header-six' }, { label: 'Blockquote', style: 'blockquote' }, { label: 'UL', style: 'unordered-list-item' }, { label: 'OL', style: 'ordered-list-item' }, { label: 'Code Block', style: 'code-block' }]
    };
  }

  render() {
    const { BLOCK_TYPES: BLOCK_TYPES } = this.state;
    const { editorState: editorState, onToggle: onToggle } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    return _react2.default.createElement(
      'div',
      { className: 'RichEditor-controls' },
      BLOCK_TYPES.map(type => _react2.default.createElement(_DraftStyleButton2.default, {
        key: type.label,
        active: type.style === blockType,
        label: type.label,
        onToggle: onToggle,
        style: type.style
      }))
    );
  }
}
exports.default = BlockStyleControls;
BlockStyleControls.propTypes = {
  editorState: _propTypes2.default.object,
  onToggle: _propTypes2.default.func
};
module.exports = exports['default'];
