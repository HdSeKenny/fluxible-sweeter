import React, { PropTypes } from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { routerShape } from 'react-router/lib/PropTypes';
import sweetAlert from '../../utils/sweetAlert';
import { UserActions } from '../../actions';
import { UserStore } from '../../stores';
import { Input, Layout } from '../UI';

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
      userImg: this.getStore(UserStore).getLoginUserloginUserImage()
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

  render() {
    const { errorMessage, userImg } = this.state;
    const imageUrl = userImg || '/images/users/default-user.png';
    return (
      <section className="wrapper-md animated fadeInUp">
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
            <button type="button" onClick={this.handleLogin} className="btn btn-info btn-block w-pad">Login</button>
          </div>
          <div className="form-group">
            <p>{this.state.error}</p>
          </div>
          <div className="text-center">
            <Layout.Row>
              <Layout.Col size="6" className="...">
                <span onClick={this.props.onForgotPassword} className="w-login">Forgot your password?</span>
              </Layout.Col>
              <Layout.Col size="6">
                <span onClick={this.props.onForgotPassword} className="w-login">Forgot your password?</span>
              </Layout.Col>
            </Layout.Row>
          </div>
        </form>
      </section>
    );
  }
});

export default Login;
