import React from 'react';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import UserBar from './UserBar';
import { DatePicker } from '../UI';
import { UserActions } from '../../actions';
import { UserStore } from '../../stores';
import { swal } from '../../plugins';

const UserInfo = CreateReactClass({

  displayName: 'UserInfo',

  contextTypes: {
    executeAction: PropTypes.func,
  },

  propTypes: {
    location: PropTypes.object
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore]
  },

  getInitialState() {
    return this.getStatesFromStores();
  },

  getStatesFromStores() {
    const { username } = this.props.params;
    return {
      currentUser: this.getStore(UserStore).getCurrentUser(),
      user: this.getStore(UserStore).getUserByUsername(username),
      isCurrentUser: this.getStore(UserStore).isCurrentUser(username),
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

  onChange(res) {
    if (res.resMsg === 'UPDATE_USER_SUCCESS') {
      // alert(res.resMsg);
    }
    this.setState(this.getStatesFromStores());
  },

  editInputValues() {
    const { currentUser } = this.state;
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

  cancelEditInfo() {
    this.setState(this.getStatesFromStores());
  },

  validateFirstName(firstName) {
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

  validateLastName(lastName) {
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

  validateUsername(username) {
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

  validateEmail(email) {
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

  validatePhone(phone) {
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

  validateProfession(profession) {
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

  validateBirthday(month, day, year) {
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

  handleFirstName(e) {
    this.validateFirstName(e.target.value);
    this.setState({ firstName: e.target.value });
  },

  handleLastName(e) {
    this.validateLastName(e.target.value);
    this.setState({ lastName: e.target.value });
  },

  handleUsername(e) {
    this.validateUsername(e.target.value);
    this.setState({ username: e.target.value });
  },

  handleEmail(e) {
    this.validateEmail(e.target.value);
    this.setState({ email: e.target.value });
  },

  handlePhone(e) {
    this.validatePhone(e.target.value);
    this.setState({ phone: e.target.value });
  },

  handleProfession(e) {
    this.validateProfession(e.target.value);
    this.setState({ profession: e.target.value });
  },

  handleChangeDay(data) {
    if (data.day !== 'Day') {
      this.setState({ day: data.day });
    } else {
      this.setState({ day: '' });
    }
  },

  handleChangeMonth(data) {
    if (data.month !== 'Month') {
      this.setState({ month: data.month });
    } else {
      this.setState({ month: '' });
    }
  },

  handleChangeYear(data) {
    if (data.year !== 'Year') {
      this.setState({ year: data.year });
    } else {
      this.setState({ year: '' });
    }
  },

  handleNewInfo(e) {
    e.preventDefault();
    const {
      year,
      month,
      day,
      profession,
      phone,
      firstName,
      lastName,
      username,
      email
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
      this.executeAction(UserActions.UpdateUserInfo, newUser);
    } else {
      swal.error('Update failed !');
    }
  },

  _renderNameGroup(currentUser, editable) {
    const { firstNameValidate, lastNameValidate, firstName, lastName } = this.state;
    return (
      <div className={`form-group ${firstNameValidate}`}>
        <label className="col-sm-1 control-label" htmlFor="name">Name</label>
        <div className="col-sm-4">
          {editable && <input type="text" className="form-control" value={firstName} onChange={this.handleFirstName} />}
          {!editable && <p>{currentUser.firstName} {currentUser.lastName}</p>}
          {editable && <p className="help-block"> {this.state.firstNameMsg}</p>}
        </div>
        <div className={`col-sm-4 ${lastNameValidate}`}>
          {editable && <input type="text" className="form-control" value={lastName} onChange={this.handleLastName} />}
          {editable && <p className="help-block"> {this.state.lastNameMsg}</p>}
        </div>
      </div>
    );
  },

  _renderUserNameGroup(currentUser, editable) {
    const { username, usernameValidate } = this.state;
    return (
      <div className={`form-group ${usernameValidate}`}>
        <label className="col-sm-1 control-label" htmlFor="username">Username</label>
        <div className="col-sm-8">
          {editable && <input type="text" className="form-control" value={username} onChange={this.handleUsername} />}
          {editable && <p className="help-block"> {this.state.usernameMsg}</p>}
          {!editable && <p>{currentUser.username}</p>}
        </div>
      </div>
    );
  },

  _renderEmailGroup(currentUser, editable) {
    const { email, emailValidate } = this.state;
    return (
      <div className={`form-group ${emailValidate}`}>
        <label className="col-sm-1 control-label" htmlFor="email">Email</label>
        <div className="col-sm-8">
          {editable && <input type="email" className="form-control"value={email} onChange={this.handleEmail} />}
          {editable && <p className="help-block"> {this.state.emailMsg}</p>}
          {!editable && <p><span>{currentUser.email}</span></p>}
        </div>
      </div>
    );
  },

  _renderPhoneGroup(currentUser, editable) {
    const { phone, phoneValidate } = this.state;
    return (
      <div className={`form-group ${phoneValidate}`}>
        <label className="col-sm-1 control-label" htmlFor="phone">Phone</label>
        <div className="col-sm-8">
          {editable && <input type="text" className="form-control" value={phone} onChange={this.handlePhone} />}
          {editable && <p className="help-block"> {this.state.phoneMsg}</p>}
          {!editable && currentUser.phone && <p>{currentUser.phone}</p>}
          {!editable && !currentUser.phone && <p className="info-empty">empty</p>}
        </div>
      </div>
    );
  },

  _renderBirthdayGroup(currentUser, editable) {
    const { birthdayValidate } = this.state;
    return (
      <div className={`form-group ${birthdayValidate}`}>
        <label className="col-sm-1 control-label" htmlFor="birthday">Birthday</label>
        <div className="col-sm-8">
          {editable &&
            <DatePicker
              onChangeDay={this.handleChangeDay}
              onChangeMonth={this.handleChangeMonth}
              onChangeYear={this.handleChangeYear}
            />
          }
          {editable && <p className="help-block"> {this.state.birthdayMsg}</p>}
          {!editable && currentUser.birthday && <p>{currentUser.birthday}</p>}
          {!editable && !currentUser.birthday && <p className="info-empty">empty</p>}
        </div>
      </div>
    );
  },

  _renderProfessionGroup(currentUser, editable) {
    const { profession, professionValidate } = this.state;
    return (
      <div className={`form-group ${professionValidate}`}>
        <label className="col-sm-1 control-label" htmlFor="profession">Profession</label>
        <div className="col-sm-8">
          {editable && <input type="text" className="form-control" value={profession} onChange={this.handleProfession} />}
          {editable && <p className="help-block"> {this.state.professionMsg}</p>}
          {!editable && currentUser.profession && <p>{currentUser.profession}</p>}
          {!editable && !currentUser.profession && <p className="info-empty">empty</p>}
        </div>
      </div>
    );
  },

  _renderOptionsGroup(editable) {
    return (
      <div className="form-group options">
        <label className="col-sm-1 control-label" htmlFor="options">Options</label>
        <div className="col-sm-8">
          {!editable && <button className="btn btn-warning edit-btn" onClick={this.editInputValues} >Edit Info</button>}
          {editable && <button className="btn btn-primary save-btn" onClick={this.handleNewInfo} >Save</button>}
          {editable && <button className="btn btn-default cancel-btn" onClick={this.cancelEditInfo} >Cancel</button>}
        </div>
      </div>
    );
  },

  render() {
    const { pathname } = this.props.location;
    const { currentUser, editable, user, isCurrentUser } = this.state;
    const displayUser = isCurrentUser ? currentUser : user;
    return (
      <div className="user-settings">
        <UserBar path={pathname} user={displayUser} isCurrentUser={true} currentUser={currentUser} />
        <div className="settings-content form-horizontal">
          <div className="well personal-info">
            <h2>Personal information</h2>
            {this._renderNameGroup(displayUser, editable)}
            {this._renderUserNameGroup(displayUser, editable)}
            {this._renderEmailGroup(displayUser, editable)}
            {this._renderPhoneGroup(displayUser, editable)}
            {this._renderBirthdayGroup(displayUser, editable)}
            {this._renderProfessionGroup(displayUser, editable)}
            {isCurrentUser && this._renderOptionsGroup(editable)}
          </div>
        </div>
      </div>
    );
  }
});

export default UserInfo;

