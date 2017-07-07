'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _draftJs = require('draft-js');

var _stores = require('../../stores');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SweetEditor extends _react2.default.Component {

  constructor() {
    super();

    this.onChange = editorState => {
      const editorContent = (0, _draftJs.convertToRaw)(editorState.getCurrentContent());
      const plainText = editorState.getCurrentContent().getPlainText();
      this.setState({ editorState: editorState }, () => {
        this.props.onSweetChange(editorContent, plainText);
      });
    };

    this.focus = () => {
      this.editor.focus();
    };

    this.state = {
      editorState: _draftJs.EditorState.createEmpty()
    };
    this._onStoreChange = this._onStoreChange.bind(this);
  }


  componentDidMount() {
    this.context.getStore(_stores.BlogStore).addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    this.context.getStore(_stores.BlogStore).removeChangeListener(this._onStoreChange);
  }

  _onStoreChange(res) {
    if (res.msg === 'CREATE_BLOG_SUCCESS') {
      this.setState({ editorState: _draftJs.EditorState.createEmpty() });
    }
  }

  render() {
    const { EmojiPlugins: EmojiPlugins } = this.props;
    return _react2.default.createElement(
      'div',
      { className: 'sweet-editor', onClick: this.focus },
      _react2.default.createElement(_draftJsPluginsEditor2.default, {
        editorState: this.state.editorState,
        onChange: this.onChange,
        plugins: EmojiPlugins,
        ref: element => {
          this.editor = element;
        }
      })
    );
  }
}
exports.default = SweetEditor;
SweetEditor.contextTypes = {
  getStore: _propTypes2.default.func.isRequired
};
SweetEditor.propTypes = {
  EmojiPlugins: _propTypes2.default.array,
  onSweetChange: _propTypes2.default.func,
  editorState: _propTypes2.default.object
};
module.exports = exports['default'];
