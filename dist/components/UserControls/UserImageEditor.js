'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UI = require('../UI');

var _utils = require('../../utils');

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable all */
class UserImageEditor extends _react.Component {

  constructor(props) {
    super(props);

    this.didLoad = this.didLoad.bind(null, this);
    this.didSave = this.didSave.bind(null, this);
    this.didUpload = this.didUpload.bind(null, this);
    this.didReceiveServerError = this.didReceiveServerError.bind(null, this);
    this.didRemove = this.didRemove.bind(null, this);
    this.didTransform = this.didTransform.bind(null, this);
    this.didConfirm = this.didConfirm.bind(null, this);
    this.didCancel = this.didCancel.bind(null, this);
    this.willTransform = this.willTransform.bind(null, this);
    this.willSave = this.willSave.bind(null, this);
    this.willRemove = this.willRemove.bind(null, this);
    this.willRequest = this.willRequest.bind(null, this);

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

  didLoad(self, data) {
    console.log('didLoad.....', data);
    return true;
  }

  didSave(self, data) {
    console.log('didSave...', data);
  }

  didUpload(self, err, data, res) {
    console.log('didUpload...', data, res);
  }

  didReceiveServerError(self, err, defaultError) {
    console.log('tesdidReceiveServerError...', defaultError);
    return defaultError;
  }

  didRemove(self, data) {
    console.log('didRemove...', data);
  }

  didTransform(self, data) {}

  didConfirm(self, data) {
    console.log('didConfirm...', data);
  }

  didCancel() {
    console.log('didCancel...');
  }

  willTransform(self, data, cb) {
    cb(data);
  }

  willSave(self, data, cb) {
    self.setState({ imageData: data, isUploadDisable: false });
    cb(data);
  }

  willRemove(self, data, cb) {
    console.log('willRemove...', data);

    cb();
  }

  willRequest(self, xhr) {
    console.log('xhr...', xhr);
  }

  onUploadImage() {
    const { imageData: imageData, currentUser: currentUser } = this.state;
    if (!imageData) {
      _utils.sweetAlert.alertWarningMessage('Browser an image first !');
      return;
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
        _this.context.executeAction(_actions.UserActions.UploadImageSuccess, newUser);
        _this.context.executeAction(_actions.BlogActions.UploadImageSuccess, newUser);
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
        {
          ratio: '1:1',
          download: true,
          didLoad: this.didLoad
          // service={uploadImageApi}
          , didUpload: this.didUpload,
          didReceiveServerError: this.didReceiveServerError,
          didRemove: this.didRemove,
          didTransform: this.didTransform,
          didCancel: this.didCancel,
          willTransform: this.willTransform,
          willSave: this.willSave,
          willRequest: this.willRequest,
          uploadBase64: false },
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
// import { Row, Col } from '../UI/Layout';

UserImageEditor.displayName = 'UserImageEditor';
UserImageEditor.contextTypes = {
  executeAction: _react2.default.PropTypes.func
};
UserImageEditor.propTypes = {
  onSave: _react.PropTypes.func,
  onCancel: _react.PropTypes.func,
  currentUser: _react.PropTypes.object
};
module.exports = exports['default'];
