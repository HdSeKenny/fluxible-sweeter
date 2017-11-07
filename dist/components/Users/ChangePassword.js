'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _UserBar = require('./UserBar');

var _UserBar2 = _interopRequireDefault(_UserBar);

var _UI = require('../UI');

var _actions = require('../../actions');

var _stores = require('../../stores');

var _UserNavs = require('../UserNavs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChangePassword = (0, _createReactClass2.default)({

  displayName: 'ChangePassword',

  contextTypes: {
    // router: routerShape.isRequired,
    executeAction: _propTypes2.default.func
  },

  propTypes: {
    location: _propTypes2.default.object
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.UserStore]
  },

  getInitialState: function getInitialState() {
    return this.getStatesFromStores();
  },
  getStatesFromStores: function getStatesFromStores() {
    return {
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      passwordValidate: '',
      confirmPasswordValidate: ''
    };
  },
  onChange: function onChange(res) {
    var _this = this;

    if (res.stat) {
      _UI.Swal.success(res.msg, function () {
        _this.context.router.push('/login');
      });
    } else {
      this.setState({ oldPasswordMsg: res.msg });
    }
  },
  validatePassword: function validatePassword(password) {
    var flag = false;
    if (!password) {
      this.setState({
        passwordMsg: '* Password is required !',
        passwordValidate: 'has-error'
      });
    } else if (password.length < 5) {
      this.setState({
        passwordMsg: '* Password is too short',
        passwordValidate: 'has-error'
      });
    } else {
      this.setState({
        passwordMsg: '',
        passwordValidate: 'has-success'
      });
      flag = true;
    }

    return flag;
  },
  validateOldPassword: function validateOldPassword(password) {
    var flag = false;
    if (!password) {
      this.setState({ oldPasswordMsg: '* Password is required !' });
    } else {
      this.setState({ oldPasswordMsg: '' });
      flag = true;
    }
    return flag;
  },
  validateConfirmPassword: function validateConfirmPassword(confirmPassword) {
    var flag = false;
    if (!confirmPassword) {
      this.setState({
        confirmPasswordMsg: '* Please enter password again !',
        confirmPasswordValidate: 'has-error'
      });
    } else if (confirmPassword !== this.state.newPassword) {
      this.setState({
        confirmPasswordMsg: '* The password is different',
        confirmPasswordValidate: 'has-error'
      });
    } else {
      this.setState({
        confirmPasswordMsg: '',
        confirmPasswordValidate: 'has-success'
      });
      flag = true;
    }
    return flag;
  },
  handleOldPassword: function handleOldPassword(e) {
    this.validateOldPassword(e.target.value);
    this.setState({ oldPassword: e.target.value });
  },
  handlePassword: function handlePassword(e) {
    this.validatePassword(e.target.value);
    this.setState({ newPassword: e.target.value });
  },
  handleConfirmPassword: function handleConfirmPassword(e) {
    this.validateConfirmPassword(e.target.value);
    this.setState({ confirmNewPassword: e.target.value });
  },
  onSubmitChangePassword: function onSubmitChangePassword(e) {
    e.preventDefault();
    var _state = this.state,
        currentUser = _state.currentUser,
        oldPassword = _state.oldPassword,
        newPassword = _state.newPassword,
        confirmNewPassword = _state.confirmNewPassword;


    var isOldPassword = this.validateOldPassword(oldPassword);
    var isNewPassword = this.validatePassword(newPassword);
    var isConfirmNewPassword = this.validateConfirmPassword(confirmNewPassword);

    if (isOldPassword && isNewPassword && isConfirmNewPassword) {
      var newPasswordObj = {
        userId: currentUser._id,
        oldPassword: oldPassword,
        newPassword: newPassword
      };
      this.executeAction(_actions.UserActions.ChangeUserPassword, newPasswordObj);
    } else {
      _UI.Swal.error('Update password failed !');
    }
  },
  render: function render() {
    var pathname = this.props.location.pathname;
    var _state2 = this.state,
        currentUser = _state2.currentUser,
        oldPassword = _state2.oldPassword,
        newPassword = _state2.newPassword,
        confirmNewPassword = _state2.confirmNewPassword;

    return _react2.default.createElement(
      'div',
      { className: 'user-settings' },
      _react2.default.createElement(_UserBar2.default, { path: pathname, user: currentUser, isCurrentUser: true, currentUser: currentUser }),
      _react2.default.createElement(
        'div',
        { className: 'settings-content' },
        _react2.default.createElement(
          'div',
          { className: 'settings-left' },
          _react2.default.createElement(_UserNavs.UserSettingsNav, { path: pathname })
        ),
        _react2.default.createElement(
          'div',
          { className: 'settings-right' },
          _react2.default.createElement(
            'div',
            { className: 'well personal-info' },
            _react2.default.createElement(
              'h2',
              null,
              'Change Password'
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-horizontal change-password' },
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'label',
                  { className: 'col-sm-3 control-label', htmlFor: 'old-password' },
                  'Old Password'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-6' },
                  _react2.default.createElement('input', {
                    type: 'password',
                    className: 'form-control',
                    value: oldPassword,
                    onChange: this.handleOldPassword
                  }),
                  _react2.default.createElement(
                    'p',
                    { className: 'help-block' },
                    ' ',
                    this.state.oldPasswordMsg
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group ' + this.state.passwordValidate },
                _react2.default.createElement(
                  'label',
                  { className: 'col-sm-3 control-label', htmlFor: 'new-password' },
                  'New Password'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-6' },
                  _react2.default.createElement('input', {
                    type: 'password',
                    className: 'form-control',
                    value: newPassword,
                    onChange: this.handlePassword
                  }),
                  _react2.default.createElement(
                    'p',
                    { className: 'help-block' },
                    ' ',
                    this.state.passwordMsg
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group ' + this.state.confirmPasswordValidate },
                _react2.default.createElement(
                  'label',
                  { className: 'col-sm-3 control-label', htmlFor: 'confirm-password' },
                  'Confirm Password'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-6' },
                  _react2.default.createElement('input', {
                    type: 'password',
                    className: 'form-control',
                    value: confirmNewPassword,
                    onChange: this.handleConfirmPassword
                  }),
                  _react2.default.createElement(
                    'p',
                    { className: 'help-block' },
                    ' ',
                    this.state.confirmPasswordMsg
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group options' },
                _react2.default.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'confirm-btn' }),
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-6' },
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-primary', onClick: this.onSubmitChangePassword },
                    'Confirm change'
                  )
                )
              )
            )
          )
        )
      )
    );
  }
});

exports.default = ChangePassword;
module.exports = exports['default'];