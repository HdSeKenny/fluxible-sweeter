'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fluxibleAddonsReact = require('fluxible-addons-react');

var _reactRouter = require('react-router');

var _actions = require('../../actions');

var _stores = require('../../stores');

var _plugins = require('../../plugins');

var _Layout = require('../UI/Layout');

var _UI = require('../UI');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Signup = (0, _createReactClass2.default)({

  displayName: 'Signup',

  contextTypes: {
    router: _reactRouter.routerShape.isRequired,
    executeAction: _propTypes2.default.func
  },

  propTypes: {
    switchOpenModal: _propTypes2.default.func
  },

  mixins: [_fluxibleAddonsReact.FluxibleMixin],

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
    if (res.msg === 'USER_REGISTER_SUCCESS') {
      _plugins.swal.success(res.stat);
      _UI.ModalsFactory.hide('signupModal');
      this.context.router.push('/list');
    }

    if (res.msg === 'USER_REGISTER_FAIL') {
      this.setState({ emailMsg: `* ${res.stat}`, emailValidate: 'has-error' });
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
      this.context.executeAction(_actions.UserActions.UserRegister, newUser);
    } else {
      _plugins.swal.error('Register failed !');
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
        lastNameMsg: "* Alphabetical characters and 'only.",
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
  openLoginModal: function () {
    this.props.switchOpenModal('loginModal');
    _UI.ModalsFactory.hide('signupModal');
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
    const {
      firstNameValidate: firstNameValidate,
      firstNameMsg: firstNameMsg,
      lastNameValidate: lastNameValidate,
      lastNameMsg: lastNameMsg,
      usernameValidate: usernameValidate,
      usernameMsg: usernameMsg,
      emailValidate: emailValidate,
      emailMsg: emailMsg,
      passwordValidate: passwordValidate,
      passwordMsg: passwordMsg,
      confirmPasswordValidate: confirmPasswordValidate,
      confirmPasswordMsg: confirmPasswordMsg
    } = this.state;

    const formGroups = {
      username: {
        valid: usernameValidate,
        msg: usernameMsg,
        holder: 'Username',
        handleEvent: this.handleUsername
      },
      email: {
        valid: emailValidate,
        msg: emailMsg,
        holder: 'Email Address',
        handleEvent: this.handleEmail
      },
      password: {
        valid: passwordValidate,
        msg: passwordMsg,
        holder: 'Password',
        handleEvent: this.handlePassword
      },
      confirmPassword: {
        valid: confirmPasswordValidate,
        msg: confirmPasswordMsg,
        holder: 'Confirm Password',
        handleEvent: this.handleConfirmPassword
      }
    };
    return _react2.default.createElement(
      'article',
      { className: 'register-page' },
      _react2.default.createElement(
        'section',
        { className: 'register-section' },
        _react2.default.createElement(
          'form',
          { role: 'form', onSubmit: this.handleRegister, className: 'mt-20' },
          _react2.default.createElement(
            _Layout.Row,
            null,
            _react2.default.createElement(
              _Layout.Col,
              { size: '6' },
              _react2.default.createElement(
                'div',
                { className: `form-group ${firstNameValidate}` },
                _react2.default.createElement('input', { type: 'text', onChange: this.handleFirstName, className: 'form-control', placeholder: 'First Name' }),
                _react2.default.createElement(
                  'p',
                  { className: 'help-block' },
                  ' ',
                  firstNameMsg
                )
              )
            ),
            _react2.default.createElement(
              _Layout.Col,
              { size: '6' },
              _react2.default.createElement(
                'div',
                { className: `form-group ${lastNameValidate}` },
                _react2.default.createElement('input', { type: 'text', onChange: this.handleLastName, className: 'form-control', placeholder: 'Last Name' }),
                _react2.default.createElement(
                  'p',
                  { className: 'help-block' },
                  ' ',
                  lastNameMsg
                )
              )
            )
          ),
          Object.keys(formGroups).map((key, index) => {
            const formGroup = formGroups[key];
            const { valid: valid, holder: holder, handleEvent: handleEvent, msg: msg } = formGroup;
            let inputType = 'text';
            if (['password', 'confirmPassword'].includes(key)) {
              inputType = 'password';
            }

            if (key === 'email') {
              inputType = 'email';
            }

            return _react2.default.createElement(
              _Layout.Row,
              { key: index },
              _react2.default.createElement(
                _Layout.Col,
                { size: '12' },
                _react2.default.createElement(
                  'div',
                  { className: `form-group ${valid}` },
                  _react2.default.createElement('input', { type: inputType, onChange: handleEvent, className: 'form-control', placeholder: holder }),
                  _react2.default.createElement(
                    'p',
                    { className: 'help-block' },
                    ' ',
                    msg
                  )
                )
              )
            );
          }),
          _react2.default.createElement(
            _Layout.Row,
            null,
            _react2.default.createElement(_Layout.Col, { size: '6' }),
            _react2.default.createElement(
              _Layout.Col,
              { size: '3 tar pr-5' },
              _react2.default.createElement(
                'button',
                { type: 'submit', className: 'btn btn-info btn-block' },
                'Create'
              )
            ),
            _react2.default.createElement(
              _Layout.Col,
              { size: '3 tar pl-5' },
              _react2.default.createElement(
                'span',
                { onClick: this.openLoginModal, className: 'btn btn-info btn-block' },
                'Login'
              )
            )
          )
        )
      )
    );
  }
});

exports.default = Signup;
module.exports = exports['default'];
