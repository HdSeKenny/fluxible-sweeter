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

var BlockStyleControls = function (_React$Component) {
  (0, _inherits3.default)(BlockStyleControls, _React$Component);

  function BlockStyleControls(props) {
    (0, _classCallCheck3.default)(this, BlockStyleControls);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BlockStyleControls.__proto__ || (0, _getPrototypeOf2.default)(BlockStyleControls)).call(this, props));

    _this.state = {
      BLOCK_TYPES: [{ label: 'H1', style: 'header-one' }, { label: 'H2', style: 'header-two' }, { label: 'H3', style: 'header-three' }, { label: 'H4', style: 'header-four' }, { label: 'H5', style: 'header-five' }, { label: 'H6', style: 'header-six' }, { label: 'Blockquote', style: 'blockquote' }, { label: 'UL', style: 'unordered-list-item' }, { label: 'OL', style: 'ordered-list-item' }, { label: 'Code Block', style: 'code-block' }]
    };
    return _this;
  }

  (0, _createClass3.default)(BlockStyleControls, [{
    key: 'render',
    value: function render() {
      var BLOCK_TYPES = this.state.BLOCK_TYPES;
      var _props = this.props,
          editorState = _props.editorState,
          onToggle = _props.onToggle;

      var selection = editorState.getSelection();
      var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

      return _react2.default.createElement(
        'div',
        { className: 'RichEditor-controls' },
        BLOCK_TYPES.map(function (type) {
          return _react2.default.createElement(_DraftStyleButton2.default, {
            key: type.label,
            active: type.style === blockType,
            label: type.label,
            onToggle: onToggle,
            style: type.style
          });
        })
      );
    }
  }]);
  return BlockStyleControls;
}(_react2.default.Component);

BlockStyleControls.propTypes = {
  editorState: _propTypes2.default.object,
  onToggle: _propTypes2.default.func
};
exports.default = BlockStyleControls;
module.exports = exports['default'];