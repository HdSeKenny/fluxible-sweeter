import React, { Component } from 'react';

export default class ModalsFactory extends Component {

  static displayName = 'ModalsFactory';

  static propTypes = {
    size: React.PropTypes.string,
    factory: React.PropTypes.func,
    modalref: React.PropTypes.string,
    title: React.PropTypes.string
  };

  render() {
    const { size, modalref, title, factory } = this.props;
    const ModalComponent = factory;
    return (
      <div className="modal fade" id={modalref} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className={`modal-dialog ${size}`}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="text-muted close" data-dismiss="modal" aria-hidden="true">×</button>
              <h4 className="modal-title">{title}</h4>
            </div>
            <div className="modal-body">
              <ModalComponent {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
