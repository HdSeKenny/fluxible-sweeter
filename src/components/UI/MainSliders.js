import React, { Component } from 'react';
import ModalsFactory from './ModalsFactory';
import Layout from './Layout';
import { Login, signup } from '../Pages';

export default class MainSliders extends Component {

  openLoginModal() {
    ModalsFactory.show('loginModal');
  }

  openSignupModal() {
    ModalsFactory.show('signupModal');
  }

  render() {
    return (
      <section className="main-sliders tac">
        <p className="welcome">Sweeter here, know what you want !</p>
        <div className="sliders-btns mt-15">
          <button className="btn btn-default mr-10" onClick={this.openLoginModal}>Log in</button>
          <button className="btn btn-default" onClick={this.openSignupModal}>Signup</button>
        </div>
        <Layout.Page>
          <ModalsFactory modalref="loginModal" title="Login to account" ModalComponent={Login} size="modal-md" showHeaderAndFooter={true} />
          <ModalsFactory modalref="signupModal" title="Sign up" ModalComponent={signup} size="modal-md" showHeaderAndFooter={true} />
        </Layout.Page>
      </section>
    );
  }
}
