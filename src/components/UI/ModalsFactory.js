import React, { Component } from 'react';
import { Row, Col } from './Layout';

const shallowCompare = require('react-addons-shallow-compare');

export default class ModalsFactory extends Component {

  static displayName = 'ModalsFactory';

  static propTypes = {
    size: React.PropTypes.string,
    factory: React.PropTypes.func,
    modalref: React.PropTypes.string,
    title: React.PropTypes.string,
    showHeaderAndFooter: React.PropTypes.bool,
    ModalComponent: React.PropTypes.func,
    hidePinModal: React.PropTypes.func,
    showModal: React.PropTypes.bool
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

  _renderModalHeader(title) {
    return (
      <div className="modal-header">
        <h3 className="modal-title ml-15 mr-15">
          {title} <button type="button" className="text-muted close" data-dismiss="modal" aria-hidden="true">×</button>
        </h3>
      </div>
    );
  }

  _renderModalFooter() {

    return (
      <div className="modal-footer mb-10">
      </div>
    );
  }

  _renderModalBody(ModalComponent) {
    return (
      <Row>
        <Col size="12">
          <div className="modal-body">
            <ModalComponent {...this.props} />
          </div>
        </Col>
      </Row>
    );
  }
  render() {
    const { size, modalref, title, ModalComponent, showHeaderAndFooter, showModal } = this.props;
    const notPinItemModals = ['loginModal', 'signupModal', 'createBlogModal', 'uploadModal'];
    const isNotPinItemModal = notPinItemModals.includes(modalref);
    const show = isNotPinItemModal ? showModal : true;
    return (
      <div className="modal fade" id={modalref} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className={`modal-dialog mt-80 ${size}`}>
          {show &&
            <div className="modal-content">
              {showHeaderAndFooter && this._renderModalHeader(title)}
              {this._renderModalBody(ModalComponent)}
              {showHeaderAndFooter && this._renderModalFooter()}
            </div>
          }
        </div>
      </div>
    );
  }
}
