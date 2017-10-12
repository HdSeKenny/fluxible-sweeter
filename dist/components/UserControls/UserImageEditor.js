'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _UI = require('../UI');

var _utils = require('../../utils');

var _plugins = require('../../plugins');

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserImageEditor = function (_React$Component) {
  (0, _inherits3.default)(UserImageEditor, _React$Component);

  function UserImageEditor(props) {
    (0, _classCallCheck3.default)(this, UserImageEditor);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (UserImageEditor.__proto__ || (0, _getPrototypeOf2.default)(UserImageEditor)).call(this, props));

    _this2.willSave = _this2.willSave.bind(null, _this2);
    _this2.state = {
      currentUser: props.currentUser,
      imageData: null,
      isUploadDisable: true
    };
    return _this2;
  }

  (0, _createClass3.default)(UserImageEditor, [{
    key: 'onCancelEdit',
    value: function onCancelEdit() {
      _UI.ModalsFactory.hide('uploadModal');
    }
  }, {
    key: 'onSubmitEdit',
    value: function onSubmitEdit() {
      this.props.onSave(this.state.image);
    }
  }, {
    key: 'willSave',
    value: function willSave(self, data, cb) {
      self.setState({ imageData: data, isUploadDisable: false });
      cb(data);
    }
  }, {
    key: 'onUploadImage',
    value: function onUploadImage() {
      var _state = this.state,
          imageData = _state.imageData,
          currentUser = _state.currentUser;

      if (!imageData) {
        return _plugins.swal.warning('Browser an image first !');
      }

      var _imageData$output = imageData.output,
          image = _imageData$output.image,
          name = _imageData$output.name;

      var output = _utils.jsUtils.base64ToBlob(image, name);

      var formData = new FormData(); // eslint-disable-line
      formData.append('slim', output, name);

      var _this = this;

      $.ajax({
        url: '/api/upload/' + currentUser.id_str,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function success(newUser) {
          _promise2.default.all([_this.context.executeAction(_actions.UserActions.UploadImageSuccess, newUser), _this.context.executeAction(_actions.BlogActions.UploadImageSuccess, newUser)]).then(function () {
            // do nothing
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var isUploadDisable = this.state.isUploadDisable;


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
            { type: 'submit', className: 'btn btn-info', disabled: isUploadDisable, onClick: function onClick() {
                return _this3.onUploadImage();
              } },
            'Upload'
          )
        )
      );
    }
  }]);
  return UserImageEditor;
}(_react2.default.Component);

UserImageEditor.displayName = 'UserImageEditor';
UserImageEditor.contextTypes = {
  executeAction: _propTypes2.default.func
};
UserImageEditor.propTypes = {
  onSave: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  currentUser: _propTypes2.default.object
};
exports.default = UserImageEditor;
module.exports = exports['default'];