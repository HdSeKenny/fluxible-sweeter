'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _PropTypes = require('react-router/lib/PropTypes');

var _sweetAlert = require('../../utils/sweetAlert');

var _sweetAlert2 = _interopRequireDefault(_sweetAlert);

var _actions = require('../../actions');

var _stores = require('../../stores');

var _UI = require('../UI');

var _Layout = require('../UI/Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Login = _react2.default.createClass({

  displayName: 'Login',

  contextTypes: {
    router: _PropTypes.routerShape.isRequired,
    config: _react.PropTypes.object,
    executeAction: _react.PropTypes.func.isRequired
  },

  propTypes: {
    onForgotPassword: _react.PropTypes.func,
    openNavbarModals: _react.PropTypes.func,
    hideNavbarModals: _react.PropTypes.func,
    switchOpenModal: _react.PropTypes.func
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
      switchOn: false
    };
  },
  onChange: function (res) {
    if (res.msg === 'USER_LOGIN_SUCCESS') {
      _sweetAlert2.default.success(res.msg);
      _UI.ModalsFactory.hide('loginModal');
      this.context.router.push('/list');
    }

    if (res.msg === 'USER_LOGIN_FAIL') {
      this.setState({ errorMessage: res.errorMsg });
    }

    if (res.msg === 'LOGOUT_SUCCESS') {
      _sweetAlert2.default.success(res.msg);
      this.context.router.push('/');
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
  _renderEmailInput: function (email) {
    return _react2.default.createElement(_UI.Input, {
      ref: 'emailRef',
      autoComplete: 'off',
      format: 'email',
      icon: 'fa fa-user',
      required: true,
      errorMessage: 'Please verify your email',
      placeholder: 'email',
      value: email,
      onFieldChange: this.onEmailChange
    });
  },
  _renderPasswordInput: function (password) {
    return _react2.default.createElement(_UI.Input, {
      ref: 'loginRef',
      autoComplete: 'off',
      format: 'password',
      icon: 'fa fa-lock',
      required: true,
      errorMessage: 'Password is required',
      placeholder: 'password',
      value: password,
      onFieldChange: this.onPasswordChange
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
