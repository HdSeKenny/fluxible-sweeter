import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from './Layout';

export default class ModalsFactory extends React.Component {

  static displayName = 'ModalsFactory';

  static propTypes = {
    size: PropTypes.string,
    factory: PropTypes.func,
    modalref: PropTypes.string,
    title: PropTypes.string,
    showHeaderAndFooter: PropTypes.bool,
    ModalComponent: PropTypes.func,
    hidePinModal: PropTypes.func,
    showModal: PropTypes.bool
  };

  static show = (modalRef) => {
    $(`#${modalRef}`).modal('show');
    $(`#${modalRef}`).find('.modal-dialog').css({ 'height': 'auto', 'max-height': '100%' });
  };

  static hide = (modalRef) => {
    $(`#${modalRef}`).modal('hide');
  };

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
    return (
      <div className="modal fade" id={modalref} tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className={`modal-dialog mt-80 ${size}`}>
          {showModal &&
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
