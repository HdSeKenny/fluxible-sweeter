import React, { PropTypes } from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { Button } from 'react-bootstrap';
import { routerShape } from 'react-router/lib/PropTypes';
import sweetAlert from '../../utils/sweetAlert';
import { UserActions } from '../../actions';
import { UserStore } from '../../stores';

const Login = React.createClass({

  displayName: 'Login',

  contextTypes: {
    router: routerShape.isRequired,
    config: PropTypes.object,
    executeAction: React.PropTypes.func.isRequired
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

  onEmailChange(e) {
    this.setState({ email: e.target.value });
  },

  onPasswordChange(e) {
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
      <div className="login-page">
        <form>
          <div className="form-content">
            <div className="form-group">
              <img alt="" src={imageUrl} />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                onChange={this.onEmailChange}
                onBlur={this.getLoginUserImage}
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={this.onPasswordChange}
                autoComplete="off"
                required
              />
              <div className="help-block"> {errorMessage} </div>
            </div>
            <div className="form-group">
              <label><input type="checkbox" value="remember-me" /> Remember me</label>
            </div>
            <div className="form-group">
              <Button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.onLoginSubmit} >Sign in</Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

export default Login;
