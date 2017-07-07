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

const Login = (0, _createReactClass2.default)({

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

  getInitialState: function () {
    return this.getStateFromStores();
  },
  getStateFromStores: function () {
    return {
      switchOn: false,
      emailErrorMessage: '',
      passwordErrorMessage: ''
    };
  },
  onChange: function (res) {
    if (res.msg === 'USER_LOGIN_SUCCESS') {
      _plugins.swal.success(res.msg);
      _UI.ModalsFactory.hide('loginModal');
      this.context.router.push('/list');
    }

    if (res.msg === 'USER_LOGIN_FAIL') {
      this.setState({ errorMessage: res.errorMsg });
    }

    if (res.msg === 'LOGOUT_SUCCESS') {
      _plugins.swal.success(res.msg);
      this.context.router.push('/');
    }
  },
  onLoginSubmit: function (e) {
    e.preventDefault();
    const { email: email, password: password } = this.state;
    const creds = { email: email, password: password };
    const validateInfo = this.validateForm(creds);
    if (validateInfo) {
      this.setState({ errorMessage: validateInfo, emailErrorMessage: '', passwordErrorMessage: '' });
    } else {
      this.executeAction(_actions.UserActions.Login, creds);
    }
  },
  validateForm: function (creds) {
    const emailValidation = this.validateEmail(creds.email);
    const passwordValidation = this.validatePassword(creds.password);

    return emailValidation.emailErrorMessage || passwordValidation.passwordErrorMessage;
  },
  validateEmail: function (email) {
    const isUnEmpty = _utils.jsUtils.isUnEmptyString(email);
    const isEmail = _utils.validations.isEmail(email);
    const result = {
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
  validatePassword: function (password) {
    const isUnEmpty = _utils.jsUtils.isUnEmptyString(password);

    const result = {
      password: password,
      passwordErrorMessage: ''
    };

    if (!isUnEmpty) {
      result.passwordErrorMessage = 'Password is required!';
    }

    return result;
  },
  onEmailChange: function (e) {
    const email = e.target.value;
    const result = this.validateEmail(email);
    this.setState(result);
  },
  onPasswordChange: function (e) {
    const password = e.target.value;
    const result = this.validatePassword(password);
    this.setState(result);
  },
  openSignupModal: function () {
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
  componentDidMount: function () {},
  _renderEmailInput: function (email) {
    const { emailErrorMessage: emailErrorMessage } = this.state;
    return _react2.default.createElement(_UI.SweetInput, {
      ref: 'emailRef',
      autoComplete: 'off',
      format: 'email',
      icon: 'fa fa-user',
      required: true,
      errorMessage: emailErrorMessage,
      placeholder: 'email',
      value: email,
      onChange: this.onEmailChange
    });
  },
  _renderPasswordInput: function (password) {
    const { passwordErrorMessage: passwordErrorMessage } = this.state;
    return _react2.default.createElement(_UI.SweetInput, {
      ref: 'loginRef',
      autoComplete: 'off',
      format: 'password',
      icon: 'fa fa-lock',
      required: true,
      errorMessage: passwordErrorMessage,
      placeholder: 'password',
      value: password,
      onChange: this.onPasswordChange
    });
  },
  _renderForgotPassword: function () {
    return _react2.default.createElement(
      _Layout.Row,
      null,
      _react2.default.createElement(
        _Layout.Col,
        { size: '6', className: 'pl-0' },
        _react2.default.createElement(_UI.Switch, { after: 'Remember me' })
      ),
      _react2.default.createElement(
        _Layout.Col,
        { size: '6', className: 'pr-0 tar' },
        _react2.default.createElement(
          'span',
          { className: 'forgot-pw' },
          'Forgot your password ?'
        )
      )
    );
  },
  _renderLoginBtns: function () {
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
  },
  _renderOtherAuths: function () {
    const twitterImg = '/styles/images/svg/twitter.svg';
    const googleImg = '/styles/images/google+.png';
    const githubImg = '/styles/images/github.png';
    return _react2.default.createElement(
      'div',
      { className: '' },
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
    );
  },
  render: function () {
    const { errorMessage: errorMessage, password: password, email: email } = this.state;
    return _react2.default.createElement(
      'section',
      { className: 'login-section mt-15 mr-15 ml-15' },
      _react2.default.createElement(
        'div',
        { className: 'wrapper-md animated fadeInUp' },
        _react2.default.createElement(
          'form',
          { role: 'form', onSubmit: this.onLoginSubmit },
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'p',
              { className: 'help-block text-left' },
              errorMessage
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            this._renderEmailInput(email)
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            this._renderPasswordInput(password)
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            this._renderForgotPassword()
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group pt-10' },
            this._renderLoginBtns()
          )
        ),
        _react2.default.createElement(
          'div',
          { className: '' },
          this._renderOtherAuths()
        )
      )
    );
  }
});

exports.default = Login;
module.exports = exports['default'];
