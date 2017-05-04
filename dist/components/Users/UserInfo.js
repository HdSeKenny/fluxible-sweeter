'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _sweetAlert = require('../../utils/sweetAlert');

var _sweetAlert2 = _interopRequireDefault(_sweetAlert);

var _UI = require('../UI');

var _actions = require('../../actions');

var _stores = require('../../stores');

var _LeftNavs = require('../LeftNavs');

var _UserBar = require('./UserBar');

var _UserBar2 = _interopRequireDefault(_UserBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserInfo = _react2.default.createClass({

  displayName: 'UserInfo',

  contextTypes: {
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
  onChange: function (res) {
    if (res.resMsg === 'UPDATE_USER_SUCCESS') {
      // alert(res.resMsg);
    }
    this.setState(this.getStatesFromStores());
  },
  editInputValues: function () {
    const { currentUser: currentUser } = this.state;
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
  cancelEditInfo: function () {
    this.setState(this.getStatesFromStores());
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
      this.setState({ firstNameMsg: '', firstNameValidate: 'has-success' });
      flag = true;
    }
    return flag;
  },
  validateLastName: function (lastName) {
    const regex = /^[a-zA-Z']*$/;
    let flag = false;
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
  validateUsername: function (username) {
    const regex = /^[a-zA-Z0-9_]+$/;
    let flag = false;
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
  validateEmail: function (email) {
    const regex = /.+@.+/;
    let flag = false;
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
  validatePhone: function (phone) {
    const regex = /^\d+$/;
    let flag = true;
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
  validateProfession: function (profession) {
    const regex = /^[a-zA-Z]*$/;
    let flag = true;
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
  validateBirthday: function (month, day, year) {
    let flag = true;
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
  handlePhone: function (e) {
    this.validatePhone(e.target.value);
    this.setState({ phone: e.target.value });
  },
  handleProfession: function (e) {
    this.validateProfession(e.target.value);
    this.setState({ profession: e.target.value });
  },
  handleChangeDay: function (data) {
    if (data.day !== 'Day') {
      this.setState({ day: data.day });
    } else {
      this.setState({ day: '' });
    }
  },
  handleChangeMonth: function (data) {
    if (data.month !== 'Month') {
      this.setState({ month: data.month });
    } else {
      this.setState({ month: '' });
    }
  },
  handleChangeYear: function (data) {
    if (data.year !== 'Year') {
      this.setState({ year: data.year });
    } else {
      this.setState({ year: '' });
    }
  },
  handleNewInfo: function (e) {
    e.preventDefault();
    const {
      year: year,
      month: month,
      day: day,
      profession: profession,
      phone: phone,
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email
    } = this.state;
    const isFirstName = this.validateFirstName(firstName);
    const isLastName = this.validateLastName(lastName);
    const isUsername = this.validateUsername(username);
    const isEmail = this.validateEmail(email);
    const isPhone = this.validatePhone(phone);
    const isProfession = this.validateProfession(profession);
    const isBirthday = this.validateBirthday(month, day, year);

    const newUser = {
      _id: this.state.currentUser._id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email
    };

    if (year && month && day) {
      newUser.birthday = `${month}/${day}/${year}`;
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
      _sweetAlert2.default.alertErrorMessage('Update failed !');
    }
  },
  _renderNameGroup: function (currentUser, editable) {
    const { firstNameValidate: firstNameValidate, lastNameValidate: lastNameValidate, firstName: firstName, lastName: lastName } = this.state;
    return _react2.default.createElement(
      'div',
      { className: `form-group ${firstNameValidate}` },
      _react2.default.createElement(
        'label',
        { className: 'col-sm-2 control-label' },
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
        { className: `col-sm-4 ${lastNameValidate}` },
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
  _renderUserNameGroup: function (currentUser, editable) {
    const { username: username, usernameValidate: usernameValidate } = this.state;
    return _react2.default.createElement(
      'div',
      { className: `form-group ${usernameValidate}` },
      _react2.default.createElement(
        'label',
        { className: 'col-sm-2 control-label' },
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
  _renderEmailGroup: function (currentUser, editable) {
    const { email: email, emailValidate: emailValidate } = this.state;
    return _react2.default.createElement(
      'div',
      { className: `form-group ${emailValidate}` },
      _react2.default.createElement(
        'label',
        { className: 'col-sm-2 control-label' },
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
            'a',
            { href: '#' },
            currentUser.email
          )
        )
      )
    );
  },
  _renderPhoneGroup: function (currentUser, editable) {
    const { phone: phone, phoneValidate: phoneValidate } = this.state;
    return _react2.default.createElement(
      'div',
      { className: `form-group ${phoneValidate}` },
      _react2.default.createElement(
        'label',
        { className: 'col-sm-2 control-label' },
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
  _renderBirthdayGroup: function (currentUser, editable) {
    const { birthdayValidate: birthdayValidate } = this.state;
    return _react2.default.createElement(
      'div',
      { className: `form-group ${birthdayValidate}` },
      _react2.default.createElement(
        'label',
        { className: 'col-sm-2 control-label' },
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
  _renderProfessionGroup: function (currentUser, editable) {
    const { profession: profession, professionValidate: professionValidate } = this.state;
    return _react2.default.createElement(
      'div',
      { className: `form-group ${professionValidate}` },
      _react2.default.createElement(
        'label',
        { className: 'col-sm-2 control-label' },
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
  _renderOptionsGroup: function (editable) {
    return _react2.default.createElement(
      'div',
      { className: 'form-group options' },
      _react2.default.createElement(
        'label',
        { className: 'col-sm-2 control-label' },
        'Options'
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-sm-8' },
        !editable && _react2.default.createElement(
          _reactBootstrap.Button,
          { className: 'btn btn-warning edit-btn', onClick: this.editInputValues },
          'Edit Info'
        ),
        editable && _react2.default.createElement(
          _reactBootstrap.Button,
          { className: 'btn btn-primary save-btn', onClick: this.handleNewInfo },
          'Save'
        ),
        editable && _react2.default.createElement(
          _reactBootstrap.Button,
          { className: 'btn btn-default cancel-btn', onClick: this.cancelEditInfo },
          'Cancel'
        )
      )
    );
  },
  render: function () {
    const { pathname: pathname } = this.props.location;
    const { currentUser: currentUser, editable: editable } = this.state;
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
            { className: 'form-horizontal' },
            _react2.default.createElement(
              'div',
              { className: 'well personal-info' },
              _react2.default.createElement(
                'h2',
                null,
                'Personal information'
              ),
              this._renderNameGroup(currentUser, editable),
              this._renderUserNameGroup(currentUser, editable),
              this._renderEmailGroup(currentUser, editable),
              this._renderPhoneGroup(currentUser, editable),
              this._renderBirthdayGroup(currentUser, editable),
              this._renderProfessionGroup(currentUser, editable),
              this._renderOptionsGroup(editable)
            )
          )
        )
      )
    );
  }
});

exports.default = UserInfo;
module.exports = exports['default'];
