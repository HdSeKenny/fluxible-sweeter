'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _reactRouter = require('react-router');

var _UserBar = require('./UserBar');

var _UserBar2 = _interopRequireDefault(_UserBar);

var _sweetAlert = require('../../utils/sweetAlert');

var _sweetAlert2 = _interopRequireDefault(_sweetAlert);

var _actions = require('../../actions');

var _stores = require('../../stores');

var _LeftNavs = require('../LeftNavs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ChangePassword = _react2.default.createClass({

  displayName: 'ChangePassword',

  contextTypes: {
    router: _reactRouter.routerShape.isRequired,
    executeAction: _react2.default.PropTypes.func
  },

  propTypes: {
    location: _react2.default.PropTypes.object
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.UserStore]
  },

  getInitialState: function () {
    return this.getStatesFromStores();
  },
  getStatesFromStores: function () {
    return {
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      passwordValidate: '',
      confirmPasswordValidate: ''
    };
  },
  onChange: function (res) {
    if (res.stat) {
      _sweetAlert2.default.alertSuccessMessageWithCallback(res.msg, () => {
        this.context.router.push('/login');
      });
    } else {
      this.setState({ oldPasswordMsg: res.msg });
    }
  },
  validatePassword: function (password) {
    let flag = false;
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
  validateOldPassword: function (password) {
    let flag = false;
    if (!password) {
      this.setState({ oldPasswordMsg: '* Password is required !' });
    } else {
      this.setState({ oldPasswordMsg: '' });
      flag = true;
    }
    return flag;
  },
  validateConfirmPassword: function (confirmPassword) {
    let flag = false;
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
  handleOldPassword: function (e) {
    this.validateOldPassword(e.target.value);
    this.setState({ oldPassword: e.target.value });
  },
  handlePassword: function (e) {
    this.validatePassword(e.target.value);
    this.setState({ newPassword: e.target.value });
  },
  handleConfirmPassword: function (e) {
    this.validateConfirmPassword(e.target.value);
    this.setState({ confirmNewPassword: e.target.value });
  },
  onSubmitChangePassword: function (e) {
    e.preventDefault();
    const {
      currentUser: currentUser,
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword
    } = this.state;

    const isOldPassword = this.validateOldPassword(oldPassword);
    const isNewPassword = this.validatePassword(newPassword);
    const isConfirmNewPassword = this.validateConfirmPassword(confirmNewPassword);

    if (isOldPassword && isNewPassword && isConfirmNewPassword) {
      const newPasswordObj = {
        userId: currentUser._id,
        oldPassword: oldPassword,
        newPassword: newPassword
      };
      this.executeAction(_actions.UserActions.ChangeUserPassword, newPasswordObj);
    } else {
      _sweetAlert2.default.alertErrorMessage('Update password failed !');
    }
  },
  render: function () {
    const { pathname: pathname } = this.props.location;
    const { currentUser: currentUser, oldPassword: oldPassword, newPassword: newPassword, confirmNewPassword: confirmNewPassword } = this.state;
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
          _react2.default.createElement(_LeftNavs.UserSettingsNav, { path: pathname })
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
                { className: `form-group ${this.state.passwordValidate}` },
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
                { className: `form-group ${this.state.confirmPasswordValidate}` },
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
