import React, { Component } from 'react';
import ModalsFactory from './ModalsFactory';
import { Layout, PinItemModal } from '../../UI';
import { Login, signup } from '../../Pages';

const shallowCompare = require('react-addons-shallow-compare');

export default class Modals extends Component {

  static propTypes = {
    selectedPin: React.PropTypes.object
  };

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
    const { selectedPin } = this.props;
    return (
      <Layout.Page>
        <ModalsFactory modalref="loginModal" title="Login to account" ModalComponent={Login} size="modal-md" showHeaderAndFooter={true} />
        <ModalsFactory modalref="signupModal" title="Sign up" ModalComponent={signup} size="modal-md" showHeaderAndFooter={true} />
        <ModalsFactory modalref="pinModal" large={true} pin={selectedPin} ModalComponent={PinItemModal} showHeaderAndFooter={true} />
      </Layout.Page>
    );
  }
}

