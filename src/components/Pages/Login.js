import React, { PropTypes } from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { routerShape } from 'react-router/lib/PropTypes';
import sweetAlert from '../../utils/sweetAlert';
import { UserActions } from '../../actions';
import { UserStore } from '../../stores';
import { Input, Switch, ModalsFactory } from '../UI';
import { Row, Col } from '../UI/Layout';

const Login = React.createClass({

  displayName: 'Login',

  contextTypes: {
    router: routerShape.isRequired,
    config: PropTypes.object,
    executeAction: PropTypes.func.isRequired
  },

  propTypes: {
    onForgotPassword: PropTypes.func,
    openNavbarModals: PropTypes.func,
    hideNavbarModals: PropTypes.func,
    switchOpenModal: PropTypes.func
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
      switchOn: false
    };
  },

  onChange(res) {
    if (res.msg === 'USER_LOGIN_SUCCESS') {
      sweetAlert.success(res.msg);
      ModalsFactory.hide('loginModal');
      this.context.router.push('/list');
    }

    if (res.msg === 'USER_LOGIN_FAIL') {
      this.setState({ errorMessage: res.errorMsg });
    }

    if (res.msg === 'LOGOUT_SUCCESS') {
      sweetAlert.success(res.msg);
      this.context.router.push('/');
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

  onEmailChange(e) {
    this.setState({ email: e.target.value });
  },

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  },

  openSignupModal() {
    this.props.switchOpenModal('signupModal');

    ModalsFactory.hide('loginModal');


    // this.props.hideNavbarModals('loginModal');

    // Click signup in login modal, it should hide login modal
    // then open signup modal, but the 'modal-open' class will
    // be deleted by login modal hide event
    // setTimeout(() => {
    //   $('body').addClass('modal-open');
    // }, 500);
  },

  _renderEmailInput(email) {
    return (
      <Input
        ref="emailRef"
        autoComplete={'off'}
        format="email"
        icon="fa fa-user"
        required={true}
        errorMessage="Please verify your email"
        placeholder="email"
        value={email}
        onFieldChange={this.onEmailChange}
      />
    );
  },

  _renderPasswordInput(password) {
    return (
      <Input
        ref="loginRef"
        autoComplete={'off'}
        format="password"
        icon="fa fa-lock"
        required={true}
        errorMessage="Password is required"
        placeholder="password"
        value={password}
        onFieldChange={this.onPasswordChange}
      />
    );
  },

  _renderForgotPassword() {
    return (
      <Row>
        <Col size="6" className="pl-0">
          <Switch after="Remember me" />
        </Col>
        <Col size="6" className="pr-0 tar">
          <span className="forgot-pw">
            Forgot your password ?
          </span>
        </Col>
      </Row>
    );
  },

  _renderLoginBtns() {
    return (
      <Row>
        <Col size="6" className="pl-0">
          <button type="submit" className="btn btn-info btn-login">Login</button>
        </Col>
        <Col size="6" className="pr-0 tar">
          <span onClick={this.openSignupModal} className="btn btn-primary btn-signup">signup</span>
        </Col>
      </Row>
    );
  },

  _renderOtherAuths() {
    const twitterImg = '/styles/images/svg/twitter.svg';
    const googleImg = '/styles/images/google+.png';
    const githubImg = '/styles/images/github.png';
    return (
      <div className="">
        <Row>
          <Col size="4" className="p-0"><hr /></Col>
          <Col size="4"><h5 className="tac">or login with</h5></Col>
          <Col size="4" className="p-0 tar"><hr /></Col>
        </Row>
        <Row className="other-auths">
          <Col size="4" className="tac"><img alt="twitter" src={twitterImg} /></Col>
          <Col size="4" className="tac"><img alt="google+" src={googleImg} /></Col>
          <Col size="4" className="tac"><img alt="github" src={githubImg} /></Col>
        </Row>
      </div>
    );
  },

  render() {
    const { errorMessage, password, email } = this.state;
    return (
      <section className="login-section mt-15 mr-15 ml-15">
        <div className="wrapper-md animated fadeInUp">
          <form role="form" onSubmit={this.onLoginSubmit}>
            <div className="form-group">
              <p className="help-block text-left">{errorMessage}</p>
            </div>
            <div className="form-group">{this._renderEmailInput(email)}</div>
            <div className="form-group">{this._renderPasswordInput(password)}</div>
            <div className="form-group">{this._renderForgotPassword()}</div>
            <div className="form-group pt-10">{this._renderLoginBtns()}</div>
          </form>
          <div className="">{this._renderOtherAuths()}</div>
        </div>
      </section>
    );
  }
});

export default Login;
