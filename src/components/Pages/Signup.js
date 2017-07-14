import React from 'react';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { FluxibleMixin } from 'fluxible-addons-react';
import { routerShape } from 'react-router';
import { UserActions } from '../../actions';
import { UserStore } from '../../stores';
import { swal } from '../../plugins';
import { Row, Col } from '../UI/Layout';
import { ModalsFactory } from '../UI';

const Signup = CreateReactClass({

  displayName: 'Signup',

  contextTypes: {
    router: routerShape.isRequired,
    executeAction: PropTypes.func
  },

  propTypes: {
    switchOpenModal: PropTypes.func
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore]
  },

  getInitialState() {
    return {
      firstNameValidate: '',
      lastNameValidate: '',
      usernameValidate: '',
      emailValidate: '',
      passwordValidate: ''
    };
  },

  onChange(res) {
    if (res.msg === 'USER_REGISTER_SUCCESS') {
      swal.success(res.stat);
      ModalsFactory.hide('signupModal');
      this.context.router.push('/list');
    }

    if (res.msg === 'USER_REGISTER_FAIL') {
      this.setState({ emailMsg: `* ${res.stat}`, emailValidate: 'has-error' });
    }
  },

  handleRegister(e) {
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
      this.context.executeAction(UserActions.UserRegister, newUser);
    } else {
      swal.error('Register failed !');
    }
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
      this.setState({
        firstNameMsg: '',
        firstNameValidate: 'has-success'
      });
      flag = true;
    }
    return flag;
  },

  validateLastName(lastName) {
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

  validateUsername(username) {
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

  validateEmail(email) {
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

  validatePassword(password) {
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

  validateConfirmPassword(confirmPassword) {
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

  openLoginModal() {
    this.props.switchOpenModal('loginModal');
    ModalsFactory.hide('signupModal');
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

  handlePassword(e) {
    this.validatePassword(e.target.value);
    this.setState({ password: e.target.value });
  },

  handleConfirmPassword(e) {
    this.validateConfirmPassword(e.target.value);
    this.setState({ confirmPassword: e.target.value });
  },

  render() {
    const {
      firstNameValidate,
      firstNameMsg,
      lastNameValidate,
      lastNameMsg,
      usernameValidate,
      usernameMsg,
      emailValidate,
      emailMsg,
      passwordValidate,
      passwordMsg,
      confirmPasswordValidate,
      confirmPasswordMsg
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
    return (
      <article className="register-page">
        <section className="register-section">
          <form role="form" onSubmit={this.handleRegister} className="mt-20">
            <Row>
              <Col size="6">
                <div className={`form-group ${firstNameValidate}`} >
                  <input type="text" onChange={this.handleFirstName} className="form-control" placeholder="First Name" />
                  <p className="help-block"> {firstNameMsg}</p>
                </div>
              </Col>
              <Col size="6">
                <div className={`form-group ${lastNameValidate}`} >
                  <input type="text" onChange={this.handleLastName} className="form-control" placeholder="Last Name" />
                  <p className="help-block"> {lastNameMsg}</p>
                </div>
              </Col>
            </Row>
            {Object.keys(formGroups).map((key, index) => {
              const formGroup = formGroups[key];
              const { valid, holder, handleEvent, msg } = formGroup;
              let inputType = 'text';
              if (['password', 'confirmPassword'].includes(key)) {
                inputType = 'password';
              }

              if (key === 'email') {
                inputType = 'email';
              }

              return (
                <Row key={index}>
                  <Col size="12">
                    <div className={`form-group ${valid}`} >
                      <input type={inputType} onChange={handleEvent} className="form-control" placeholder={holder} />
                      <p className="help-block"> {msg}</p>
                    </div>
                  </Col>
                </Row>
              );
            })}
            <Row>
              <Col size="6" />
              <Col size="3 tar pr-5">
                <button type="submit" className="btn btn-info btn-block">Create</button>
              </Col>
              <Col size="3 tar pl-5">
                <span onClick={this.openLoginModal} className="btn btn-info btn-block">Login</span>
              </Col>
            </Row>
          </form>
        </section>
      </article>
    );
  }
});

export default Signup;
