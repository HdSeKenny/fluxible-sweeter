'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Layout = require('./Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ModalsFactory extends _react2.default.Component {

  _renderModalHeader(title) {
    return _react2.default.createElement(
      'div',
      { className: 'modal-header' },
      _react2.default.createElement(
        'h3',
        { className: 'modal-title ml-15 mr-15' },
        title,
        ' ',
        _react2.default.createElement(
          'button',
          { type: 'button', className: 'text-muted close', 'data-dismiss': 'modal', 'aria-hidden': 'true' },
          '\xD7'
        )
      )
    );
  }

  _renderModalFooter() {
    return _react2.default.createElement('div', { className: 'modal-footer mb-10' });
  }

  _renderModalBody(ModalComponent) {
    return _react2.default.createElement(
      _Layout.Row,
      null,
      _react2.default.createElement(
        _Layout.Col,
        { size: '12' },
        _react2.default.createElement(
          'div',
          { className: 'modal-body' },
          _react2.default.createElement(ModalComponent, this.props)
        )
      )
    );
  }
  render() {
    const { size: size, modalref: modalref, title: title, ModalComponent: ModalComponent, showHeaderAndFooter: showHeaderAndFooter, showModal: showModal } = this.props;
    return _react2.default.createElement(
      'div',
      { className: 'modal fade', id: modalref, tabIndex: '-1', 'aria-labelledby': 'myModalLabel', 'aria-hidden': 'true' },
      _react2.default.createElement(
        'div',
        { className: `modal-dialog mt-80 ${size}` },
        showModal && _react2.default.createElement(
          'div',
          { className: 'modal-content' },
          showHeaderAndFooter && this._renderModalHeader(title),
          this._renderModalBody(ModalComponent),
          showHeaderAndFooter && this._renderModalFooter()
        )
      )
    );
  }
}
exports.default = ModalsFactory;
ModalsFactory.displayName = 'ModalsFactory';
ModalsFactory.propTypes = {
  size: _propTypes2.default.string,
  factory: _propTypes2.default.func,
  modalref: _propTypes2.default.string,
  title: _propTypes2.default.string,
  showHeaderAndFooter: _propTypes2.default.bool,
  ModalComponent: _propTypes2.default.func,
  hidePinModal: _propTypes2.default.func,
  showModal: _propTypes2.default.bool
};

ModalsFactory.show = modalRef => {
  $(`#${modalRef}`).modal('show');
  $(`#${modalRef}`).find('.modal-dialog').css({ 'height': 'auto', 'max-height': '100%' });
};

ModalsFactory.hide = modalRef => {
  $(`#${modalRef}`).modal('hide');
};

module.exports = exports['default'];
