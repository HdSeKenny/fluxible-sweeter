'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _reactBootstrap = require('react-bootstrap');

var _reactRouter = require('react-router');

var _actions = require('../../actions');

var _stores = require('../../stores');

var _sweetAlert = require('../../utils/sweetAlert');

var _sweetAlert2 = _interopRequireDefault(_sweetAlert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Register = _react2.default.createClass({

  displayName: 'Register',

  contextTypes: {
    router: _reactRouter.routerShape.isRequired,
    executeAction: _react2.default.PropTypes.func.isRequired
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.UserStore]
  },

  getInitialState: function () {
    return {
      firstNameValidate: '',
      lastNameValidate: '',
      usernameValidate: '',
      emailValidate: '',
      passwordValidate: ''
    };
  },
  onChange: function (res) {
    if (res.user) {
      if (res.stat) {
        _sweetAlert2.default.alertSuccessMessageWithCallback(res.msg, () => {
          this.context.router.push('/');
        });
      } else {
        this.setState({ emailMsg: `* ${res.msg}`, emailValidate: 'has-error' });
      }
    }
  },
  handleRegister: function (e) {
    e.preventDefault();
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    const firstName = this.validateFirstName(newUser.firstName);
    const lastName = this.validateLastName(newUser.lastName);
    const username = this.validateUsername(newUser.username);
    const email = this.validateEmail(newUser.email);
    const password = this.validatePassword(newUser.password);
    const confirmPassword = this.validateConfirmPassword(this.state.confirmPassword);

    if (firstName && lastName && username && email && password && confirmPassword) {
      this.executeAction(_actions.UserActions.UserRegister, newUser);
    } else {
      _sweetAlert2.default.alertErrorMessage('Register failed !');
    }
  },
  validateFirstName: function (firstName) {
    const regex = /^[a-zA-Z']*$/;
    let flag = false;
    if (!firstName) {
      this.setState({
        firstNameMsg: '* First name is required !',
        firstNameValidate: 'has-error'
      });
    } else if (!regex.test(firstName)) {
      this.setState({
        firstNameMsg: "* Alphabetical characters and ' only",
        firstNameValidate: 'has-error'
      });
    } else {
      this.setState({
        firstNameMsg: '',
        firstNameValidate: 'has-success'
      });
      flag = true;
    }
    return flag;
  },
  validateLastName: function (lastName) {
    const regex = /^[a-zA-Z']*$/;
    let flag = false;
    if (!lastName) {
      this.setState({
        lastNameMsg: '* Last name is required !',
        lastNameValidate: 'has-error'
      });
    } else if (!regex.test(lastName)) {
      this.setState({
        lastNameMsg: "* Alphabetical characters and ' only.",
        lastNameValidate: 'has-error'
      });
    } else {
      this.setState({
        lastNameMsg: '',
        lastNameValidate: 'has-success'
      });
      flag = true;
    }
    return flag;
  },
  validateUsername: function (username) {
    const regex = /^[a-zA-Z0-9_]+$/;
    let flag = false;
    if (!username) {
      this.setState({
        usernameMsg: '* Username is required !',
        usernameValidate: 'has-error'
      });
    } else if (!regex.test(username)) {
      this.setState({
        usernameMsg: '* Username should be alphabetical characters, number and "_".',
        usernameValidate: 'has-error'
      });
    } else if (username.length < 5 || username.length > 15) {
      this.setState({
        usernameMsg: '* he length should between 5 ~ 15',
        usernameValidate: 'has-error'
      });
    } else {
      this.setState({
        usernameMsg: '',
        usernameValidate: 'has-success'
      });
      flag = true;
    }
    return flag;
  },
  validateEmail: function (email) {
    let flag = false;
    if (!email) {
      this.setState({
        emailMsg: '* Email address is required !',
        emailValidate: 'has-error'
      });
    } else {
      this.setState({
        emailMsg: '', emailValidate: 'has-success'
      });
      flag = true;
    }
    return flag;
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
  validateConfirmPassword: function (confirmPassword) {
    let flag = false;
    if (!confirmPassword) {
      this.setState({
        confirmPasswordMsg: '* Please enter password again !',
        confirmPasswordValidate: 'has-error'
      });
    } else if (confirmPassword !== this.state.password) {
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
  handleFirstName: function (e) {
    this.validateFirstName(e.target.value);
    this.setState({ firstName: e.target.value });
  },
  handleLastName: function (e) {
    this.validateLastName(e.target.value);
    this.setState({ lastName: e.target.value });
  },
  handleUsername: function (e) {
    this.validateUsername(e.target.value);
    this.setState({ username: e.target.value });
  },
  handleEmail: function (e) {
    this.validateEmail(e.target.value);
    this.setState({ email: e.target.value });
  },
  handlePassword: function (e) {
    this.validatePassword(e.target.value);
    this.setState({ password: e.target.value });
  },
  handleConfirmPassword: function (e) {
    this.validateConfirmPassword(e.target.value);
    this.setState({ confirmPassword: e.target.value });
  },
  render: function () {
    return _react2.default.createElement(
      'article',
      { className: 'register-page' },
      _react2.default.createElement(
        'section',
        { className: 'register-section' },
        _react2.default.createElement(
          'form',
          { role: 'form', onSubmit: this.handleRegister },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement('div', { className: 'col-xs-3' }),
            _react2.default.createElement(
              'div',
              { className: 'col-xs-6 form-content' },
              _react2.default.createElement(
                'h3',
                null,
                'Please register '
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-12' },
                  _react2.default.createElement('hr', null)
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-6' },
                  _react2.default.createElement(
                    'div',
                    { className: `form-group ${this.state.firstNameValidate}` },
                    _react2.default.createElement('input', { type: 'text', onChange: this.handleFirstName, className: 'form-control', placeholder: 'First Name' }),
                    _react2.default.createElement(
                      'p',
                      { className: 'help-block' },
                      ' ',
                      this.state.firstNameMsg
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-6' },
                  _react2.default.createElement(
                    'div',
                    { className: `form-group ${this.state.lastNameValidate}` },
                    _react2.default.createElement('input', { type: 'text', onChange: this.handleLastName, className: 'form-control', placeholder: 'Last Name' }),
                    _react2.default.createElement(
                      'p',
                      { className: 'help-block' },
                      ' ',
                      this.state.lastNameMsg
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-12 col-sm-12 col-md-12' },
                  _react2.default.createElement(
                    'div',
                    { className: `form-group ${this.state.usernameValidate}` },
                    _react2.default.createElement('input', { type: 'text', onChange: this.handleUsername, className: 'form-control', placeholder: 'Username' }),
                    _react2.default.createElement(
                      'p',
                      { className: 'help-block' },
                      ' ',
                      this.state.usernameMsg
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-12 col-sm-12 col-md-12' },
                  _react2.default.createElement(
                    'div',
                    { className: `form-group ${this.state.emailValidate}` },
                    _react2.default.createElement('input', { type: 'email', onChange: this.handleEmail, className: 'form-control', placeholder: 'Email Address' }),
                    _react2.default.createElement(
                      'p',
                      { className: 'help-block' },
                      ' ',
                      this.state.emailMsg
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-12 col-sm-12 col-md-12' },
                  _react2.default.createElement(
                    'div',
                    { className: `form-group ${this.state.passwordValidate}` },
                    _react2.default.createElement('input', { type: 'password', onChange: this.handlePassword, className: 'form-control', placeholder: 'Password' }),
                    _react2.default.createElement(
                      'p',
                      { className: 'help-block' },
                      ' ',
                      this.state.passwordMsg
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-12 col-sm-12 col-md-12' },
                  _react2.default.createElement(
                    'div',
                    { className: `form-group ${this.state.confirmPasswordValidate}` },
                    _react2.default.createElement('input', { type: 'password', onChange: this.handleConfirmPassword, className: 'form-control', placeholder: 'Password' }),
                    _react2.default.createElement(
                      'p',
                      { className: 'help-block' },
                      ' ',
                      this.state.confirmPasswordMsg
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-12' },
                  _react2.default.createElement('hr', { className: 'hr-2' })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-12 col-md-12' },
                  _react2.default.createElement(
                    _reactBootstrap.Button,
                    { type: 'submit' },
                    _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'plane' }),
                    ' Create'
                  )
                )
              )
            ),
            _react2.default.createElement('div', { className: 'col-xs-3' })
          )
        )
      )
    );
  }
});

exports.default = Register;
module.exports = exports['default'];
