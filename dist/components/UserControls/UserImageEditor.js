'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UI = require('../UI');

var _utils = require('../../utils');

var _plugins = require('../../plugins');

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserImageEditor = function (_React$Component) {
  _inherits(UserImageEditor, _React$Component);

  function UserImageEditor(props) {
    _classCallCheck(this, UserImageEditor);

    var _this2 = _possibleConstructorReturn(this, (UserImageEditor.__proto__ || Object.getPrototypeOf(UserImageEditor)).call(this, props));

    _this2.willSave = _this2.willSave.bind(null, _this2);
    _this2.state = {
      currentUser: props.currentUser,
      imageData: null,
      isUploadDisable: true
    };
    return _this2;
  }

  _createClass(UserImageEditor, [{
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
          Promise.all([_this.context.executeAction(_actions.UserActions.UploadImageSuccess, newUser), _this.context.executeAction(_actions.BlogActions.UploadImageSuccess, newUser)]).then(function () {
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