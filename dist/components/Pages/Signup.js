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

var Signup = (0, _createReactClass2.default)({

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

  getInitialState: function getInitialState() {
    return {
      firstNameValidate: '',
      lastNameValidate: '',
      usernameValidate: '',
      emailValidate: '',
      passwordValidate: ''
    };
  },
  onChange: function onChange(res) {
    if (res.msg === 'USER_REGISTER_SUCCESS') {
      _plugins.swal.success(res.stat);
      _UI.ModalsFactory.hide('signupModal');
      this.context.router.push('/list');
    }

    if (res.msg === 'USER_REGISTER_FAIL') {
      this.setState({ emailMsg: '* ' + res.stat, emailValidate: 'has-error' });
    }
  },
  handleRegister: function handleRegister(e) {
    e.preventDefault();
    var newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    var firstName = this.validateFirstName(newUser.firstName);
    var lastName = this.validateLastName(newUser.lastName);
    var username = this.validateUsername(newUser.username);
    var email = this.validateEmail(newUser.email);
    var password = this.validatePassword(newUser.password);
    var confirmPassword = this.validateConfirmPassword(this.state.confirmPassword);

    if (firstName && lastName && username && email && password && confirmPassword) {
      this.context.executeAction(_actions.UserActions.UserRegister, newUser);
    } else {
      _plugins.swal.error('Register failed !');
    }
  },
  validateFirstName: function validateFirstName(firstName) {
    var regex = /^[a-zA-Z']*$/;
    var flag = false;
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
  validateLastName: function validateLastName(lastName) {
    var regex = /^[a-zA-Z']*$/;
    var flag = false;
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
  validateUsername: function validateUsername(username) {
    var regex = /^[a-zA-Z0-9_]+$/;
    var flag = false;
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
  validateEmail: function validateEmail(email) {
    var flag = false;
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
  validateConfirmPassword: function validateConfirmPassword(confirmPassword) {
    var flag = false;
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
  openLoginModal: function openLoginModal() {
    this.props.switchOpenModal('loginModal');
    _UI.ModalsFactory.hide('signupModal');
  },
  handleFirstName: function handleFirstName(e) {
    this.validateFirstName(e.target.value);
    this.setState({ firstName: e.target.value });
  },
  handleLastName: function handleLastName(e) {
    this.validateLastName(e.target.value);
    this.setState({ lastName: e.target.value });
  },
  handleUsername: function handleUsername(e) {
    this.validateUsername(e.target.value);
    this.setState({ username: e.target.value });
  },
  handleEmail: function handleEmail(e) {
    this.validateEmail(e.target.value);
    this.setState({ email: e.target.value });
  },
  handlePassword: function handlePassword(e) {
    this.validatePassword(e.target.value);
    this.setState({ password: e.target.value });
  },
  handleConfirmPassword: function handleConfirmPassword(e) {
    this.validateConfirmPassword(e.target.value);
    this.setState({ confirmPassword: e.target.value });
  },
  render: function render() {
    var _state = this.state,
        firstNameValidate = _state.firstNameValidate,
        firstNameMsg = _state.firstNameMsg,
        lastNameValidate = _state.lastNameValidate,
        lastNameMsg = _state.lastNameMsg,
        usernameValidate = _state.usernameValidate,
        usernameMsg = _state.usernameMsg,
        emailValidate = _state.emailValidate,
        emailMsg = _state.emailMsg,
        passwordValidate = _state.passwordValidate,
        passwordMsg = _state.passwordMsg,
        confirmPasswordValidate = _state.confirmPasswordValidate,
        confirmPasswordMsg = _state.confirmPasswordMsg;


    var formGroups = {
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
                { className: 'form-group ' + firstNameValidate },
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
                { className: 'form-group ' + lastNameValidate },
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
          Object.keys(formGroups).map(function (key, index) {
            var formGroup = formGroups[key];
            var valid = formGroup.valid,
                holder = formGroup.holder,
                handleEvent = formGroup.handleEvent,
                msg = formGroup.msg;

            var inputType = 'text';
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
                  { className: 'form-group ' + valid },
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