'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Layout = require('./Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalsFactory = function (_React$Component) {
  _inherits(ModalsFactory, _React$Component);

  function ModalsFactory() {
    _classCallCheck(this, ModalsFactory);

    return _possibleConstructorReturn(this, (ModalsFactory.__proto__ || Object.getPrototypeOf(ModalsFactory)).apply(this, arguments));
  }

  _createClass(ModalsFactory, [{
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