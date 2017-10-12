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

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _UserBar = require('./UserBar');

var _UserBar2 = _interopRequireDefault(_UserBar);

var _UI = require('../UI');

var _actions = require('../../actions');

var _stores = require('../../stores');

var _plugins = require('../../plugins');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserInfo = (0, _createReactClass2.default)({

  displayName: 'UserInfo',

  contextTypes: {
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
    var username = this.props.params.username;

    return {
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      user: this.getStore(_stores.UserStore).getUserByUsername(username),
      isCurrentUser: this.getStore(_stores.UserStore).isCurrentUser(username),
      editable: false,
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
      profession: '',
      firstNameValidate: '',
      lastNameValidate: '',
      usernameValidate: '',
      emailValidate: '',
      phoneValidate: '',
      birthdayValidate: '',
      professionValidate: '',
      year: '',
      month: '',
      day: ''
    };
  },
  onChange: function onChange(res) {
    if (res.resMsg === 'UPDATE_USER_SUCCESS') {
      // alert(res.resMsg);
    }
    this.setState(this.getStatesFromStores());
  },
  editInputValues: function editInputValues() {
    var currentUser = this.state.currentUser;

    if (this.state.editable) {
      this.setState({ editable: false });
    } else {
      this.setState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        phone: currentUser.phone,
        username: currentUser.username,
        birthday: currentUser.birthday,
        profession: currentUser.profession,
        firstNameMsg: '',
        lastNameMsg: '',
        usernameMsg: '',
        emailMsg: '',
        phoneMsg: '',
        professionMsg: '',
        birthdayMsg: '',
        editable: true
      });
    }
  },
  cancelEditInfo: function cancelEditInfo() {
    this.setState(this.getStatesFromStores());
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
      this.setState({ firstNameMsg: '', firstNameValidate: 'has-success' });
      flag = true;
    }
    return flag;
  },
  validateLastName: function validateLastName(lastName) {
    var regex = /^[a-zA-Z']*$/;
    var flag = false;
    if (!lastName) {
      this.setState({ lastNameMsg: '* Last name is required !', lastNameValidate: 'has-error' });
    } else if (!regex.test(lastName)) {
      this.setState({
        lastNameMsg: "* Alphabetical characters and ' only.",
        lastNameValidate: 'has-error'
      });
    } else {
      this.setState({ lastNameMsg: '', lastNameValidate: 'has-success' });
      flag = true;
    }
    return flag;
  },
  validateUsername: function validateUsername(username) {
    var regex = /^[a-zA-Z0-9_]+$/;
    var flag = false;
    if (!username) {
      this.setState({ usernameMsg: '* Username is required !', usernameValidate: 'has-error' });
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
      this.setState({ usernameMsg: '', usernameValidate: 'has-success' });
      flag = true;
    }
    return flag;
  },
  validateEmail: function validateEmail(email) {
    var regex = /.+@.+/;
    var flag = false;
    if (!email) {
      this.setState({ emailMsg: '* Email address is required !', emailValidate: 'has-error' });
    } else if (!regex.test(email)) {
      this.setState({ emailMsg: '* Invalid email address!', emailValidate: 'has-error' });
    } else {
      this.setState({ emailMsg: '', emailValidate: 'has-success' });
      flag = true;
    }
    return flag;
  },
  validatePhone: function validatePhone(phone) {
    var regex = /^\d+$/;
    var flag = true;
    if (phone) {
      if (!regex.test(phone)) {
        this.setState({ phoneMsg: 'Phone should be number only !', phoneValidate: 'has-error' });
        flag = false;
      } else {
        this.setState({ phoneMsg: '', phoneValidate: 'has-success' });
      }
    }
    return flag;
  },
  validateProfession: function validateProfession(profession) {
    var regex = /^[a-zA-Z]*$/;
    var flag = true;
    if (profession) {
      if (!regex.test(profession)) {
        this.setState({ professionMsg: 'Profession should be characters only !', professionValidate: 'has-error' });
        flag = false;
      } else {
        this.setState({ professionMsg: '', professionValidate: 'has-success' });
      }
    }

    return flag;
  },
  validateBirthday: function validateBirthday(month, day, year) {
    var flag = true;
    if (month || day || year) {
      if (!(month && day && year)) {
        this.setState({ birthdayMsg: 'Please pick full date!', birthdayValidate: 'has-error' });
        flag = false;
      } else {
        this.setState({ birthdayMsg: '', birthdayValidate: 'has-success' });
      }
    }

    return flag;
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
  handlePhone: function handlePhone(e) {
    this.validatePhone(e.target.value);
    this.setState({ phone: e.target.value });
  },
  handleProfession: function handleProfession(e) {
    this.validateProfession(e.target.value);
    this.setState({ profession: e.target.value });
  },
  handleChangeDay: function handleChangeDay(data) {
    if (data.day !== 'Day') {
      this.setState({ day: data.day });
    } else {
      this.setState({ day: '' });
    }
  },
  handleChangeMonth: function handleChangeMonth(data) {
    if (data.month !== 'Month') {
      this.setState({ month: data.month });
    } else {
      this.setState({ month: '' });
    }
  },
  handleChangeYear: function handleChangeYear(data) {
    if (data.year !== 'Year') {
      this.setState({ year: data.year });
    } else {
      this.setState({ year: '' });
    }
  },
  handleNewInfo: function handleNewInfo(e) {
    e.preventDefault();
    var _state = this.state,
        year = _state.year,
        month = _state.month,
        day = _state.day,
        profession = _state.profession,
        phone = _state.phone,
        firstName = _state.firstName,
        lastName = _state.lastName,
        username = _state.username,
        email = _state.email;

    var isFirstName = this.validateFirstName(firstName);
    var isLastName = this.validateLastName(lastName);
    var isUsername = this.validateUsername(username);
    var isEmail = this.validateEmail(email);
    var isPhone = this.validatePhone(phone);
    var isProfession = this.validateProfession(profession);
    var isBirthday = this.validateBirthday(month, day, year);

    var newUser = {
      _id: this.state.currentUser._id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email
    };

    if (year && month && day) {
      newUser.birthday = month + '/' + day + '/' + year;
    }

    if (profession && isProfession) {
      newUser.profession = profession;
    }

    if (phone && isPhone) {
      newUser.phone = phone;
    }

    if (isFirstName && isLastName && isUsername && isEmail && isPhone && isProfession && isBirthday) {
      this.executeAction(_actions.UserActions.UpdateUserInfo, newUser);
    } else {
      _plugins.swal.error('Update failed !');
    }
  },
  _renderNameGroup: function _renderNameGroup(currentUser, editable) {
    var _state2 = this.state,
        firstNameValidate = _state2.firstNameValidate,
        lastNameValidate = _state2.lastNameValidate,
        firstName = _state2.firstName,
        lastName = _state2.lastName;

    return _react2.default.createElement(
      'div',
      { className: 'form-group ' + firstNameValidate },
      _react2.default.createElement(
        'label',
        { className: 'col-sm-1 control-label', htmlFor: 'name' },
        'Name'
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-sm-4' },
        editable && _react2.default.createElement('input', { type: 'text', className: 'form-control', value: firstName, onChange: this.handleFirstName }),
        !editable && _react2.default.createElement(
          'p',
          null,
          currentUser.firstName,
          ' ',
          currentUser.lastName
        ),
        editable && _react2.default.createElement(
          'p',
          { className: 'help-block' },
          ' ',
          this.state.firstNameMsg
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-sm-4 ' + lastNameValidate },
        editable && _react2.default.createElement('input', { type: 'text', className: 'form-control', value: lastName, onChange: this.handleLastName }),
        editable && _react2.default.createElement(
          'p',
          { className: 'help-block' },
          ' ',
          this.state.lastNameMsg
        )
      )
    );
  },
  _renderUserNameGroup: function _renderUserNameGroup(currentUser, editable) {
    var _state3 = this.state,
        username = _state3.username,
        usernameValidate = _state3.usernameValidate;

    return _react2.default.createElement(
      'div',
      { className: 'form-group ' + usernameValidate },
      _react2.default.createElement(
        'label',
        { className: 'col-sm-1 control-label', htmlFor: 'username' },
        'Username'
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-sm-8' },
        editable && _react2.default.createElement('input', { type: 'text', className: 'form-control', value: username, onChange: this.handleUsername }),
        editable && _react2.default.createElement(
          'p',
          { className: 'help-block' },
          ' ',
          this.state.usernameMsg
        ),
        !editable && _react2.default.createElement(
          'p',
          null,
          currentUser.username
        )
      )
    );
  },
  _renderEmailGroup: function _renderEmailGroup(currentUser, editable) {
    var _state4 = this.state,
        email = _state4.email,
        emailValidate = _state4.emailValidate;

    return _react2.default.createElement(
      'div',
      { className: 'form-group ' + emailValidate },
      _react2.default.createElement(
        'label',
        { className: 'col-sm-1 control-label', htmlFor: 'email' },
        'Email'
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-sm-8' },
        editable && _react2.default.createElement('input', { type: 'email', className: 'form-control', value: email, onChange: this.handleEmail }),
        editable && _react2.default.createElement(
          'p',
          { className: 'help-block' },
          ' ',
          this.state.emailMsg
        ),
        !editable && _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'span',
            null,
            currentUser.email
          )
        )
      )
    );
  },
  _renderPhoneGroup: function _renderPhoneGroup(currentUser, editable) {
    var _state5 = this.state,
        phone = _state5.phone,
        phoneValidate = _state5.phoneValidate;

    return _react2.default.createElement(
      'div',
      { className: 'form-group ' + phoneValidate },
      _react2.default.createElement(
        'label',
        { className: 'col-sm-1 control-label', htmlFor: 'phone' },
        'Phone'
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-sm-8' },
        editable && _react2.default.createElement('input', { type: 'text', className: 'form-control', value: phone, onChange: this.handlePhone }),
        editable && _react2.default.createElement(
          'p',
          { className: 'help-block' },
          ' ',
          this.state.phoneMsg
        ),
        !editable && currentUser.phone && _react2.default.createElement(
          'p',
          null,
          currentUser.phone
        ),
        !editable && !currentUser.phone && _react2.default.createElement(
          'p',
          { className: 'info-empty' },
          'empty'
        )
      )
    );
  },
  _renderBirthdayGroup: function _renderBirthdayGroup(currentUser, editable) {
    var birthdayValidate = this.state.birthdayValidate;

    return _react2.default.createElement(
      'div',
      { className: 'form-group ' + birthdayValidate },
      _react2.default.createElement(
        'label',
        { className: 'col-sm-1 control-label', htmlFor: 'birthday' },
        'Birthday'
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-sm-8' },
        editable && _react2.default.createElement(_UI.DatePicker, {
          onChangeDay: this.handleChangeDay,
          onChangeMonth: this.handleChangeMonth,
          onChangeYear: this.handleChangeYear
        }),
        editable && _react2.default.createElement(
          'p',
          { className: 'help-block' },
          ' ',
          this.state.birthdayMsg
        ),
        !editable && currentUser.birthday && _react2.default.createElement(
          'p',
          null,
          currentUser.birthday
        ),
        !editable && !currentUser.birthday && _react2.default.createElement(
          'p',
          { className: 'info-empty' },
          'empty'
        )
      )
    );
  },
  _renderProfessionGroup: function _renderProfessionGroup(currentUser, editable) {
    var _state6 = this.state,
        profession = _state6.profession,
        professionValidate = _state6.professionValidate;

    return _react2.default.createElement(
      'div',
      { className: 'form-group ' + professionValidate },
      _react2.default.createElement(
        'label',
        { className: 'col-sm-1 control-label', htmlFor: 'profession' },
        'Profession'
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-sm-8' },
        editable && _react2.default.createElement('input', { type: 'text', className: 'form-control', value: profession, onChange: this.handleProfession }),
        editable && _react2.default.createElement(
          'p',
          { className: 'help-block' },
          ' ',
          this.state.professionMsg
        ),
        !editable && currentUser.profession && _react2.default.createElement(
          'p',
          null,
          currentUser.profession
        ),
        !editable && !currentUser.profession && _react2.default.createElement(
          'p',
          { className: 'info-empty' },
          'empty'
        )
      )
    );
  },
  _renderOptionsGroup: function _renderOptionsGroup(editable) {
    return _react2.default.createElement(
      'div',
      { className: 'form-group options' },
      _react2.default.createElement(
        'label',
        { className: 'col-sm-1 control-label', htmlFor: 'options' },
        'Options'
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-sm-8' },
        !editable && _react2.default.createElement(
          'button',
          { className: 'btn btn-warning edit-btn', onClick: this.editInputValues },
          'Edit Info'
        ),
        editable && _react2.default.createElement(
          'button',
          { className: 'btn btn-primary save-btn', onClick: this.handleNewInfo },
          'Save'
        ),
        editable && _react2.default.createElement(
          'button',
          { className: 'btn btn-default cancel-btn', onClick: this.cancelEditInfo },
          'Cancel'
        )
      )
    );
  },
  render: function render() {
    var pathname = this.props.location.pathname;
    var _state7 = this.state,
        currentUser = _state7.currentUser,
        editable = _state7.editable,
        user = _state7.user,
        isCurrentUser = _state7.isCurrentUser;

    var displayUser = isCurrentUser ? currentUser : user;
    return _react2.default.createElement(
      'div',
      { className: 'user-settings' },
      _react2.default.createElement(_UserBar2.default, { path: pathname, user: displayUser, isCurrentUser: true, currentUser: currentUser }),
      _react2.default.createElement(
        'div',
        { className: 'settings-content form-horizontal' },
        _react2.default.createElement(
          'div',
          { className: 'well personal-info' },
          _react2.default.createElement(
            'h2',
            null,
            'Personal information'
          ),
          this._renderNameGroup(displayUser, editable),
          this._renderUserNameGroup(displayUser, editable),
          this._renderEmailGroup(displayUser, editable),
          this._renderPhoneGroup(displayUser, editable),
          this._renderBirthdayGroup(displayUser, editable),
          this._renderProfessionGroup(displayUser, editable),
          isCurrentUser && this._renderOptionsGroup(editable)
        )
      )
    );
  }
});

exports.default = UserInfo;
module.exports = exports['default'];