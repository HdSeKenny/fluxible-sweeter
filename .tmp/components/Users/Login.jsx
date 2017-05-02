'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _reactBootstrap = require('react-bootstrap');

var _PropTypes = require('react-router/lib/PropTypes');

var _sweetAlert = require('../../utils/sweetAlert');

var _sweetAlert2 = _interopRequireDefault(_sweetAlert);

var _actions = require('../../actions');

var _stores = require('../../stores');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Login = _react2.default.createClass({

  displayName: 'Login',

  contextTypes: {
    router: _PropTypes.routerShape.isRequired,
    config: _react.PropTypes.object,
    executeAction: _react2.default.PropTypes.func.isRequired
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.UserStore]
  },

  getInitialState: function () {
    return this.getStateFromStores();
  },
  getStateFromStores: function () {
    return {
      userImg: this.getStore(_stores.UserStore).getLoginUserloginUserImage()
    };
  },
  onChange: function (res) {
    if (res.resMsg === 'USER_LOGIN_SUCCESS') {
      _sweetAlert2.default.alertSuccessMessageWithCallback('Login success !', () => {
        this.context.router.push('/');
      });
    }

    if (res.resMsg === 'USER_LOGIN_FAIL') {
      this.setState({ errorMessage: res.errorMsg });
    }

    if (res.resMsg === 'LOAD_LOGIN_USER_IMAGE_SUCCESS') {
      this.setState({ userImg: this.getStore(_stores.UserStore).getLoginUserloginUserImage() });
    }
  },
  onLoginSubmit: function (e) {
    e.preventDefault();
    const { email: email, password: password } = this.state;
    const creds = { email: email, password: password };
    const validateInfo = this.validateForm(creds);
    if (validateInfo) {
      this.setState({ errorMessage: validateInfo });
    } else {
      this.executeAction(_actions.UserActions.Login, creds);
    }
  },
  validateForm: function (creds) {
    if (!creds.email) {
      return 'Username is required';
    } else if (!creds.password) {
      return 'Password is required';
    }
  },
  onEmailChange: function (e) {
    this.setState({ email: e.target.value });
  },
  onPasswordChange: function (e) {
    this.setState({ password: e.target.value });
  },
  getLoginUserImage: function () {
    const { email: email } = this.state;
    this.executeAction(_actions.UserActions.GetLoginUserImage, { email: email });
  },
  render: function () {
    const { errorMessage: errorMessage, userImg: userImg } = this.state;
    const imageUrl = userImg || '/images/users/default-user.png';
    return _react2.default.createElement(
      'div',
      { className: 'login-page' },
      _react2.default.createElement(
        'form',
        null,
        _react2.default.createElement(
          'div',
          { className: 'form-content' },
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement('img', { alt: '', src: imageUrl })
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement('input', {
              type: 'email',
              className: 'form-control',
              placeholder: 'Email address',
              onChange: this.onEmailChange,
              onBlur: this.getLoginUserImage,
              autoComplete: 'off',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement('input', {
              type: 'password',
              className: 'form-control',
              placeholder: 'Password',
              onChange: this.onPasswordChange,
              autoComplete: 'off',
              required: true
            }),
            _react2.default.createElement(
              'div',
              { className: 'help-block' },
              ' ',
              errorMessage,
              ' '
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'label',
              null,
              _react2.default.createElement('input', { type: 'checkbox', value: 'remember-me' }),
              ' Remember me'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              _reactBootstrap.Button,
              { className: 'btn btn-lg btn-primary btn-block', type: 'submit', onClick: this.onLoginSubmit },
              'Sign in'
            )
          )
        )
      )
    );
  }
});

exports.default = Login;
module.exports = exports['default'];
