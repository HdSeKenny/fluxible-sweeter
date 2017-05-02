import React, { Component } from 'react';
import $ from 'jquery';
import ModalsFactory from './ModalsFactory';
import Layout from './Layout';
import { Login, signup } from '../Pages';

const shallowCompare = require('react-addons-shallow-compare');

export default class Modals extends Component {

  static show = (modalRef) => {
    $(`#${modalRef}`).modal('show');
    $(`#${modalRef}`).find('.modal-dialog').css({ 'height': 'auto', 'max-height': '100%' });
  };

  static hide = (modalRef) => {
    $(`#${modalRef}`).modal('hide');
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <Layout.Page>
        <ModalsFactory modalref="loginModal" title="Login to account" factory={Login} size="modal-md" />
        <ModalsFactory modalref="signupModal" title="Sign up" factory={signup} size="modal-md" />
        <ModalsFactory modalref="signupModal" title="Sign up" factory={signup} size="modal-md" />
      </Layout.Page>
    );
  }
}

