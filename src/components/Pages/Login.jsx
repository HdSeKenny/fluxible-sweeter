import React, { PropTypes } from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { routerShape } from 'react-router/lib/PropTypes';
import sweetAlert from '../../utils/sweetAlert';
import { UserActions } from '../../actions';
import { UserStore } from '../../stores';
import { Input, ModalsFactory, Switch } from '../UI';
import { Row, Col } from '../UI/Layout';

// var update = require('react-addons-update');

const Login = React.createClass({

  displayName: 'Login',

  contextTypes: {
    router: routerShape.isRequired,
    config: PropTypes.object,
    executeAction: PropTypes.func.isRequired,
  },

  propTypes: {
    onForgotPassword: PropTypes.func
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore]
  },

  getInitialState() {
    return this.getStateFromStores();
  },

  getStateFromStores() {
    return {
      userImg: this.getStore(UserStore).getLoginUserloginUserImage(),
      switchOn: false
    };
  },

  onChange(res) {
    if (res.resMsg === 'USER_LOGIN_SUCCESS') {
      sweetAlert.alertSuccessMessageWithCallback('Login success !', () => {
        this.context.router.push('/');
      });
    }

    if (res.resMsg === 'USER_LOGIN_FAIL') {
      this.setState({ errorMessage: res.errorMsg });
    }

    if (res.resMsg === 'LOAD_LOGIN_USER_IMAGE_SUCCESS') {
      this.setState({ userImg: this.getStore(UserStore).getLoginUserloginUserImage() });
    }
  },

  onLoginSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const creds = { email, password };
    const validateInfo = this.validateForm(creds);
    if (validateInfo) {
      this.setState({ errorMessage: validateInfo });
    } else {
      this.executeAction(UserActions.Login, creds);
    }
  },

  validateForm(creds) {
    if (!creds.email) {
      return 'Username is required';
    } else if (!creds.password) {
      return 'Password is required';
    }
  },

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  },

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  },

  getLoginUserImage() {
    const { email } = this.state;
    this.executeAction(UserActions.GetLoginUserImage, { email });
  },

  openSignupModal(e) {
    e.preventDefault();
    ModalsFactory.hide('loginModal');
    ModalsFactory.show('signupModal');
  },

  render() {
    const { errorMessage } = this.state;

    return (
      <section className="login-section mt-20">
        <div className="wrapper-md animated fadeInUp">
          <form role="form">
            <div className="form-group">
              <Input
                ref="emailRef"
                autoComplete={'off'}
                format="email"
                icon="fa fa-user"
                required={true}
                errorMessage="Please verify your email"
                placeholder="email"
                value={this.state.email}
                onFieldChange={this.handleEmailChange}
              />
            </div>
            <div className="form-group">
              <Input
                ref="loginRef"
                autoComplete={'off'}
                format="password"
                icon="fa fa-lock"
                required={true}
                errorMessage="Password is required"
                placeholder="password"
                value={this.state.password}
                onFieldChange={(e) => this.handlePasswordChange(e)}
              />
            </div>
            <p className="help-block">{errorMessage || ''}</p>
            <div className="form-group">
              <Row>
                <Col size="6" className="pl-0">
                  <Switch after="Remember me" />
                </Col>
                <Col size="6" className="pr-0 tar">
                  <a href="#">Forgot your password ?</a>
                </Col>
              </Row>
            </div>
            <div className="form-group pt-10">
              <Row>
                <Col size="6" className="pl-0">
                  <button onClick={this.handleLogin} className="btn btn-info btn-block btn-login">Login</button>
                </Col>
                <Col size="6" className="pr-0 tar">
                  <button onClick={(e) => this.openSignupModal(e)} className="btn btn-primary btn-block btn-signup">signup</button>
                </Col>
              </Row>
            </div>
            <div className="form-group">
              <p>{this.state.error}</p>
            </div>

            <Row>
              <Col size="4" className="p-0">
                <hr />
              </Col>
              <Col size="4">
                <h5 className="tac">or login with</h5>
              </Col>
              <Col size="4" className="p-0 tar">
                <hr />
              </Col>
            </Row>

            <Row className="other-auths">
              <Col size="4" className="tac">
                <img alt="twitter" className="" src="styles/images/svg/twitter.svg" />
              </Col>
              <Col size="4" className="tac">
                <img alt="google+" className="" src="styles/images/google+.png" />
              </Col>
              <Col size="4" className="tac">
                <img alt="github" className="" src="styles/images/github.png" />
              </Col>
            </Row>

          </form>
        </div>
      </section>

    );
  }
});

export default Login;
