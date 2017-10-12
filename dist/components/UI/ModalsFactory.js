'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Layout = require('./Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalsFactory = function (_React$Component) {
  (0, _inherits3.default)(ModalsFactory, _React$Component);

  function ModalsFactory() {
    (0, _classCallCheck3.default)(this, ModalsFactory);
    return (0, _possibleConstructorReturn3.default)(this, (ModalsFactory.__proto__ || (0, _getPrototypeOf2.default)(ModalsFactory)).apply(this, arguments));
  }

  (0, _createClass3.default)(ModalsFactory, [{
    key: '_renderModalHeader',
    value: function _renderModalHeader(title) {
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
  }, {
    key: '_renderModalFooter',
    value: function _renderModalFooter() {
      return _react2.default.createElement('div', { className: 'modal-footer mb-10' });
    }
  }, {
    key: '_renderModalBody',
    value: function _renderModalBody(ModalComponent) {
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
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          size = _props.size,
          modalref = _props.modalref,
          title = _props.title,
          ModalComponent = _props.ModalComponent,
          showHeaderAndFooter = _props.showHeaderAndFooter,
          showModal = _props.showModal;

      return _react2.default.createElement(
        'div',
        { className: 'modal fade', id: modalref, tabIndex: '-1', 'aria-labelledby': 'myModalLabel', 'aria-hidden': 'true' },
        _react2.default.createElement(
          'div',
          { className: 'modal-dialog mt-80 ' + size },
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
  }]);
  return ModalsFactory;
}(_react2.default.Component);

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

ModalsFactory.show = function (modalRef) {
  $('#' + modalRef).modal('show');
  $('#' + modalRef).find('.modal-dialog').css({ 'height': 'auto', 'max-height': '100%' });
};

ModalsFactory.hide = function (modalRef) {
  $('#' + modalRef).modal('hide');
};

exports.default = ModalsFactory;
module.exports = exports['default'];