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

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _draftJsEmojiPlugin = require('draft-js-emoji-plugin');

var _draftJsEmojiPlugin2 = _interopRequireDefault(_draftJsEmojiPlugin);

var _configs = require('../../configs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emojiPlugin = (0, _draftJsEmojiPlugin2.default)(_configs.params.emojiConfig);
var plugins = [emojiPlugin];

var SweetEditor = function (_React$Component) {
  (0, _inherits3.default)(SweetEditor, _React$Component);

  function SweetEditor() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SweetEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SweetEditor.__proto__ || (0, _getPrototypeOf2.default)(SweetEditor)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      emojiState: (0, _draftJsPluginsEditor.createEditorStateWithText)(_this.props.contentText)
    }, _this.onEmojiChange = function (editorState) {
      _this.setState({ emojiState: editorState });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SweetEditor, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      // Add new sweet record caused previous record re-render
      return this.state.emojiState.getCurrentContent() != nextState.emojiState.getCurrentContent();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'pin-editor' },
        _react2.default.createElement(_draftJsPluginsEditor2.default, {
          editorState: this.state.emojiState,
          onChange: function onChange(editorState) {
            return _this2.onEmojiChange(editorState);
          },
          plugins: plugins,
          ref: function ref(element) {
            _this2.editor = element;
          },
          readOnly: true
        })
      );
    }
  }]);
  return SweetEditor;
}(_react2.default.Component);

SweetEditor.propTypes = {
  EmojiPlugins: _propTypes2.default.array,
  onSweetChange: _propTypes2.default.func,
  editorState: _propTypes2.default.object,
  contentText: _propTypes2.default.string,
  isPinItem: _propTypes2.default.bool
};
exports.default = SweetEditor;
module.exports = exports['default'];