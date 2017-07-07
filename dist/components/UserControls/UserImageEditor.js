'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UI = require('../UI');

var _utils = require('../../utils');

var _plugins = require('../../plugins');

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserImageEditor extends _react2.default.Component {

  constructor(props) {
    super(props);
    this.willSave = this.willSave.bind(null, this);
    this.state = {
      currentUser: props.currentUser,
      imageData: null,
      isUploadDisable: true
    };
  }

  onCancelEdit() {
    _UI.ModalsFactory.hide('uploadModal');
  }

  onSubmitEdit() {
    this.props.onSave(this.state.image);
  }

  willSave(self, data, cb) {
    self.setState({ imageData: data, isUploadDisable: false });
    cb(data);
  }

  onUploadImage() {
    const { imageData: imageData, currentUser: currentUser } = this.state;
    if (!imageData) {
      return _plugins.swal.warning('Browser an image first !');
    }

    const { image: image, name: name } = imageData.output;
    const output = _utils.jsUtils.base64ToBlob(image, name);

    const formData = new FormData(); // eslint-disable-line
    formData.append('slim', output, name);

    const _this = this;

    $.ajax({
      url: `/api/upload/${currentUser.id_str}`,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: newUser => {
        Promise.all([_this.context.executeAction(_actions.UserActions.UploadImageSuccess, newUser), _this.context.executeAction(_actions.BlogActions.UploadImageSuccess, newUser)]).then(() => {
          // do nothing
        });
      }
    });
  }

  render() {
    const { isUploadDisable: isUploadDisable } = this.state;

    return _react2.default.createElement(
      'div',
      { className: 'image-editor' },
      _react2.default.createElement(
        _UI.SlimEditor,
        { ratio: '1:1', download: true, willSave: this.willSave, uploadBase64: false },
        _react2.default.createElement('input', { type: 'file', name: 'slim' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'editor-btns' },
        _react2.default.createElement(
          'button',
          { type: 'reset', className: 'btn btn-default', onClick: this.onCancelEdit },
          'Cancel'
        ),
        _react2.default.createElement(
          'button',
          { type: 'submit', className: 'btn btn-info', disabled: isUploadDisable, onClick: () => this.onUploadImage() },
          'Upload'
        )
      )
    );
  }
}
exports.default = UserImageEditor;
UserImageEditor.displayName = 'UserImageEditor';
UserImageEditor.contextTypes = {
  executeAction: _propTypes2.default.func
};
UserImageEditor.propTypes = {
  onSave: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  currentUser: _propTypes2.default.object
};
module.exports = exports['default'];
