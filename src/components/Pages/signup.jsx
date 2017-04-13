import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { Button, Glyphicon } from 'react-bootstrap';
import { routerShape } from 'react-router';
import { UserActions } from '../../actions';
import { UserStore } from '../../stores';
import sweetAlert from '../../utils/sweetAlert';


const Signup = React.createClass({

  displayName: 'Signup',

  contextTypes: {
    router: routerShape.isRequired,
    executeAction: React.PropTypes.func.isRequired
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
    if (res.user) {
      if (res.stat) {
        sweetAlert.alertSuccessMessageWithCallback(res.msg, () => {
          this.context.router.push('/');
        });
      } else {
        this.setState({ emailMsg: `* ${res.msg}`, emailValidate: 'has-error' });
      }
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
      this.executeAction(UserActions.UserRegister, newUser);
    } else {
      sweetAlert.alertErrorMessage('Register failed !');
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
      })
    } else if (username.length < 5 || username.length > 15){
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
    return (
      <article className="register-page">
        <section className="register-section">
          <form role="form" onSubmit={this.handleRegister} >
            <div className="row">
              <div className="col-xs-3"></div>
              <div className="col-xs-6 form-content">
                <h3>Please register </h3>
                <div className="row">
                  <div className="col-xs-12"><hr /></div>
                </div>
                <div className="row">
                  <div className="col-xs-6">
                    <div className={`form-group ${this.state.firstNameValidate}`} >
                      <input type="text" onChange={this.handleFirstName} className="form-control" placeholder="First Name" />
                      <p className="help-block"> {this.state.firstNameMsg}</p>
                    </div>
                  </div>
                  <div className="col-xs-6">
                    <div className={`form-group ${this.state.lastNameValidate}`} >
                      <input type="text" onChange={this.handleLastName} className="form-control" placeholder="Last Name" />
                      <p className="help-block"> {this.state.lastNameMsg}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <div className={`form-group ${this.state.usernameValidate}`} >
                      <input type="text" onChange={this.handleUsername} className="form-control" placeholder="Username" />
                      <p className="help-block"> {this.state.usernameMsg}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <div className={`form-group ${this.state.emailValidate}`} >
                      <input type="email" onChange={this.handleEmail} className="form-control" placeholder="Email Address" />
                      <p className="help-block"> {this.state.emailMsg}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <div className={`form-group ${this.state.passwordValidate}`} >
                      <input type="password" onChange={this.handlePassword} className="form-control" placeholder="Password" />
                      <p className="help-block"> {this.state.passwordMsg}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <div className={`form-group ${this.state.confirmPasswordValidate}`} >
                      <input type="password" onChange={this.handleConfirmPassword} className="form-control" placeholder="Password" />
                      <p className="help-block"> {this.state.confirmPasswordMsg}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12"><hr className="hr-2" /></div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-md-12"><Button type="submit"><Glyphicon glyph="plane"/> Create</Button></div>
                </div>
              </div>
              <div className="col-xs-3"></div>
            </div>
          </form>
        </section>
      </article>
    );
  }
});

export default Signup;
