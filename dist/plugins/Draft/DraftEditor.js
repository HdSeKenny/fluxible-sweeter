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

var _draftJs = require('draft-js');

var _BlockStyleControls = require('./BlockStyleControls');

var _BlockStyleControls2 = _interopRequireDefault(_BlockStyleControls);

var _InlineStyleControls = require('./InlineStyleControls');

var _InlineStyleControls2 = _interopRequireDefault(_InlineStyleControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {stateToHTML} from 'draft-js-export-html';
var DraftEditor = function (_React$Component) {
  (0, _inherits3.default)(DraftEditor, _React$Component);

  function DraftEditor(props) {
    (0, _classCallCheck3.default)(this, DraftEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DraftEditor.__proto__ || (0, _getPrototypeOf2.default)(DraftEditor)).call(this, props));

    _this.state = {
      editorState: _draftJs.EditorState.createEmpty(),
      styleMap: {
        CODE: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
          fontSize: 16,
          padding: 2
        }
      },
      showEditor: false
    };

    _this.focus = function () {
      return _this.refs.editor.focus();
    };
    _this.onChange = function (editorState) {
      // console.log(JSON.stringify());
      var plainText = editorState.getCurrentContent().getPlainText();
      _this.setState({ editorState: editorState, plainText: plainText });
    };

    _this.handleKeyCommand = function (command) {
      return _this._handleKeyCommand(command);
    };
    _this.onTab = function (e) {
      return _this._onTab(e);
    };
    _this.toggleBlockType = function (type) {
      return _this._toggleBlockType(type);
    };
    _this.toggleInlineStyle = function (style) {
      return _this._toggleInlineStyle(style);
    };
    return _this;
  }

  (0, _createClass3.default)(DraftEditor, [{
    key: '_handleKeyCommand',
    value: function _handleKeyCommand(command) {
      var editorState = this.state.editorState;

      var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return true;
      }
      return false;
    }
  }, {
    key: '_onTab',
    value: function _onTab(e) {
      var maxDepth = 4;
      this.onChange(_draftJs.RichUtils.onTab(e, this.state.editorState, maxDepth));
    }
  }, {
    key: '_toggleBlockType',
    value: function _toggleBlockType(blockType) {
      this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, blockType));
    }
  }, {
    key: '_toggleInlineStyle',
    value: function _toggleInlineStyle(inlineStyle) {
      this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
    }
  }, {
    key: 'createArticle',
    value: function createArticle() {
      var editorState = this.state.editorState;

      var editorContent = (0, _draftJs.convertToRaw)(editorState.getCurrentContent());
      var plainText = editorState.getCurrentContent().getPlainText();
      this.props.onCreateArticle({ editorContent: editorContent, plainText: plainText });
    }
  }, {
    key: 'getBlockStyle',
    value: function getBlockStyle(block) {
      switch (block.getType()) {
        case 'blockquote':
          return 'RichEditor-blockquote';
        default:
          return null;
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // eslint-disable-next-line
      this.setState({ showEditor: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          editorState = _state.editorState,
          styleMap = _state.styleMap,
          showEditor = _state.showEditor;

      // If the user changes block type before entering any text, we can
      // either style the placeholder or hide it. Let's just hide it now.

      var contentState = editorState.getCurrentContent();
      var className = 'RichEditor-editor';
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' RichEditor-hidePlaceholder';
        }
      }

      return _react2.default.createElement(
        'div',
        { className: 'DraftEditor' },
        _react2.default.createElement(
          'div',
          { className: 'RichEditor-root' },
          _react2.default.createElement(_BlockStyleControls2.default, { editorState: editorState, onToggle: this.toggleBlockType }),
          _react2.default.createElement(_InlineStyleControls2.default, { editorState: editorState, onToggle: this.toggleInlineStyle }),
          _react2.default.createElement(
            'div',
            { className: className, onClick: this.focus },
            showEditor && _react2.default.createElement(_draftJs.Editor, {
              editorKey: 'b_editor',
              dataOffsetKey: 'b_editor',
              blockStyleFn: function blockStyleFn(block) {
                return _this2.getBlockStyle(block);
              },
              customStyleMap: styleMap,
              editorState: editorState,
              handleKeyCommand: this.handleKeyCommand,
              onChange: this.onChange,
              onTab: this.onTab,
              placeholder: 'Write an article...',
              ref: 'editor',
              spellCheck: true
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'btns mt-15 tar' },
          _react2.default.createElement(
            'button',
            { className: 'btn btn-primary mr-10', onClick: function onClick() {
                return _this2.createArticle();
              } },
            'Create'
          ),
          _react2.default.createElement(
            'button',
            { className: 'btn btn-default' },
            'Reset'
          )
        )
      );
    }
  }]);
  return DraftEditor;
}(_react2.default.Component);

DraftEditor.propTypes = {
  onToggle: _propTypes2.default.func,
  onCreateArticle: _propTypes2.default.func
};
exports.default = DraftEditor;
module.exports = exports['default'];