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

var _utils = require('../../utils');

var _plugins = require('../../plugins');

var _actions = require('../../actions');

var _stores = require('../../stores');

var _UI = require('../UI');

var _Layout = require('../UI/Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = (0, _createReactClass2.default)({

  displayName: 'Login',

  contextTypes: {
    router: _reactRouter.routerShape.isRequired,
    config: _propTypes2.default.object,
    executeAction: _propTypes2.default.func
  },

  propTypes: {
    onForgotPassword: _propTypes2.default.func,
    openNavbarModals: _propTypes2.default.func,
    hideNavbarModals: _propTypes2.default.func,
    switchOpenModal: _propTypes2.default.func
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.UserStore]
  },

  getInitialState: function getInitialState() {
    return this.getStateFromStores();
  },
  getStateFromStores: function getStateFromStores() {
    return {
      switchOn: false,
      emailErrorMessage: '',
      passwordErrorMessage: '',
      remember: false
    };
  },
  onChange: function onChange(res) {
    if (res.msg === 'USER_LOGIN_SUCCESS') {
      _plugins.swal.success(res.msg);
      _UI.ModalsFactory.hide('loginModal');
      // this.context.router.push('/list');
    }

    if (res.msg === 'USER_LOGIN_FAIL') {
      this.setState({ errorMessage: res.errorMsg });
    }

    if (res.msg === 'LOGOUT_SUCCESS') {
      _plugins.swal.success(res.msg);
      this.context.router.push('/');
    }
  },
  onLoginSubmit: function onLoginSubmit(e) {
    e.preventDefault();
    var _state = this.state,
        email = _state.email,
        password = _state.password;

    var creds = { email: email, password: password };
    var validateInfo = this.validateForm(creds);
    if (validateInfo) {
      this.setState({ errorMessage: validateInfo, emailErrorMessage: '', passwordErrorMessage: '' });
    } else {
      this.executeAction(_actions.UserActions.Login, creds);
    }
  },
  validateForm: function validateForm(creds) {
    var emailValidation = this.validateEmail(creds.email);
    var passwordValidation = this.validatePassword(creds.password);

    return emailValidation.emailErrorMessage || passwordValidation.passwordErrorMessage;
  },
  validateEmail: function validateEmail(email) {
    var isUnEmpty = _utils.jsUtils.isUnEmptyString(email);
    var isEmail = _utils.validations.isEmail(email);
    var result = {
      email: email,
      emailErrorMessage: ''
    };

    if (!isUnEmpty) {
      result.emailErrorMessage = 'Email is required!';
    } else if (!isEmail) {
      result.emailErrorMessage = 'Please check your email address!';
    }

    return result;
  },
  validatePassword: function validatePassword(password) {
    var isUnEmpty = _utils.jsUtils.isUnEmptyString(password);

    var result = {
      password: password,
      passwordErrorMessage: ''
    };

    if (!isUnEmpty) {
      result.passwordErrorMessage = 'Password is required!';
    }

    return result;
  },
  onEmailChange: function onEmailChange(e) {
    var email = e.target.value;
    this.setState({ email: email, errorMessage: '' });
  },
  onPasswordChange: function onPasswordChange(e) {
    var password = e.target.value;
    this.setState({ password: password, errorMessage: '' });
  },
  openSignupModal: function openSignupModal() {
    this.props.switchOpenModal('signupModal');

    _UI.ModalsFactory.hide('loginModal');

    // this.props.hideNavbarModals('loginModal');

    // Click signup in login modal, it should hide login modal
    // then open signup modal, but the 'modal-open' class will
    // be deleted by login modal hide event
    // setTimeout(() => {
    //   $('body').addClass('modal-open');
    // }, 500);
  },
  rememberMe: function rememberMe() {
    this.setState({ remember: !this.state.remember });
  },
  _renderEmailInput: function _renderEmailInput(email, remember) {
    var emailErrorMessage = this.state.emailErrorMessage;

    return _react2.default.createElement(_UI.SweetInput, {
      ref: 'emailRef',
      autoComplete: remember ? 'on' : 'off',
      format: 'email',
      icon: 'fa fa-user',
      required: true,
      errorMessage: emailErrorMessage,
      placeholder: 'email',
      value: email,
      onChange: this.onEmailChange
    });
  },
  _renderPasswordInput: function _renderPasswordInput(password, remember) {
    var passwordErrorMessage = this.state.passwordErrorMessage;

    return _react2.default.createElement(_UI.SweetInput, {
      ref: 'loginRef',
      autoComplete: remember ? 'on' : 'off',
      format: 'password',
      icon: 'fa fa-lock',
      required: true,
      errorMessage: passwordErrorMessage,
      placeholder: 'password',
      value: password,
      onChange: this.onPasswordChange
    });
  },
  _renderLoginOptions: function _renderLoginOptions() {
    return _react2.default.createElement(
      _Layout.Row,
      { className: 'login-options' },
      _react2.default.createElement(
        _Layout.Col,
        { size: '6', className: 'pl-0' },
        _react2.default.createElement(_UI.Switch, { after: 'Remember me', rememberMe: this.rememberMe })
      ),
      _react2.default.createElement(
        _Layout.Col,
        { size: '6', className: 'pr-0 tar' },
        _react2.default.createElement(
          'span',
          { className: 'forgot-pw' },
          'Forgot password'
        )
      )
    );
  },
  _renderLoginBtns: function _renderLoginBtns(isModalLogin) {
    if (isModalLogin) {
      return _react2.default.createElement(
        _Layout.Row,
        null,
        _react2.default.createElement(
          _Layout.Col,
          { size: '6', className: 'pl-0' },
          _react2.default.createElement(
            'button',
            { type: 'submit', className: 'btn btn-info btn-login' },
            'Login'
          )
        ),
        _react2.default.createElement(
          _Layout.Col,
          { size: '6', className: 'pr-0 tar' },
          _react2.default.createElement(
            'span',
            { onClick: this.openSignupModal, className: 'btn btn-primary btn-signup' },
            'signup'
          )
        )
      );
    } else {
      return _react2.default.createElement(
        _Layout.Row,
        { className: 'p-0' },
        _react2.default.createElement(
          'button',
          { type: 'submit', className: 'btn btn-info btn-login' },
          'Login'
        )
      );
    }
  },
  _renderOtherAuths: function _renderOtherAuths(isModalLogin) {
    var twitterImg = '/images/svg/twitter.svg';
    var googleImg = '/images/google+.png';
    var githubImg = '/images/github.png';
    return _react2.default.createElement(
      'div',
      { className: '' },
      isModalLogin && _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Layout.Row,
          null,
          _react2.default.createElement(
            _Layout.Col,
            { size: '4', className: 'p-0' },
            _react2.default.createElement('hr', null)
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '4' },
            _react2.default.createElement(
              'h5',
              { className: 'tac' },
              'or login with'
            )
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '4', className: 'p-0 tar' },
            _react2.default.createElement('hr', null)
          )
        ),
        _react2.default.createElement(
          _Layout.Row,
          { className: 'other-auths' },
          _react2.default.createElement(
            _Layout.Col,
            { size: '4', className: 'tac' },
            _react2.default.createElement('img', { alt: 'twitter', src: twitterImg })
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '4', className: 'tac' },
            _react2.default.createElement('img', { alt: 'google+', src: googleImg })
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '4', className: 'tac' },
            _react2.default.createElement('img', { alt: 'github', src: githubImg })
          )
        )
      ),
      !isModalLogin && _react2.default.createElement(
        _Layout.Row,
        { className: 'mt-15 mb-15' },
        _react2.default.createElement(
          _Layout.Col,
          { size: '4 login-with p-0' },
          _react2.default.createElement(
            'h5',
            null,
            'Other Logins:'
          )
        ),
        _react2.default.createElement(
          _Layout.Col,
          { size: '8 other-auths p-0' },
          _react2.default.createElement(
            _Layout.Col,
            { size: '2', className: 'tac p-0' },
            _react2.default.createElement('img', { alt: 'twitter', src: twitterImg })
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '2', className: 'tac p-0' },
            _react2.default.createElement('img', { alt: 'google+', src: googleImg })
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '2', className: 'tac p-0' },
            _react2.default.createElement('img', { alt: 'github', src: githubImg })
          )
        )
      )
    );
  },
  render: function render() {
    var _this = this;

    var _state2 = this.state,
        errorMessage = _state2.errorMessage,
        password = _state2.password,
        email = _state2.email,
        remember = _state2.remember;
    var isModalLogin = this.props.isModalLogin;

    return _react2.default.createElement(
      'section',
      { className: 'login-section' },
      _react2.default.createElement(
        'div',
        { className: 'wrapper-md animated fadeInUp' },
        !isModalLogin && _react2.default.createElement(
          'h4',
          { className: 'title' },
          'Login to account',
          _react2.default.createElement(
            'span',
            { className: 'no-account', onClick: function onClick() {
                return _this.props.openSignupModal();
              } },
            'Sign up'
          )
        ),
        _react2.default.createElement(
          'form',
          { role: 'form', onSubmit: this.onLoginSubmit },
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            this._renderEmailInput(email, remember)
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group ' + (errorMessage && 'mb-5') },
            this._renderPasswordInput(password, remember)
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group mb-5 mt-0' },
            _react2.default.createElement(
              'p',
              { className: 'help-block text-left' },
              errorMessage
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            this._renderLoginOptions()
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group mt-15' },
            this._renderLoginBtns(isModalLogin)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: '' },
          this._renderOtherAuths(isModalLogin)
        )
      )
    );
  }
});

exports.default = Login;
module.exports = exports['default'];