'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fluxibleAddonsReact = require('fluxible-addons-react');

var _stores = require('../../stores');

var _Layout = require('../UI/Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Footer = (0, _createReactClass2.default)({

  displayName: 'Footer',

  mixins: [_fluxibleAddonsReact.FluxibleMixin],

  contextTypes: {
    config: _propTypes2.default.object
  },

  statics: {
    storeListeners: [_stores.UserStore]
  },

  getInitialState: function () {
    return this.getStatesFromStores();
  },
  getStatesFromStores: function () {
    return {
      kenny: this.getStore(_stores.UserStore).getKennyUser()
    };
  },
  onChange: function () {
    this.setState(this.getStatesFromStores());
  },
  render: function () {
    const { kenny: kenny } = this.state;
    return _react2.default.createElement(
      'div',
      { className: 'footer-wrapper' },
      _react2.default.createElement(
        _Layout.Row,
        { className: 'footer-content' },
        _react2.default.createElement(_Layout.Col, { size: '8 p-0' }),
        _react2.default.createElement(
          _Layout.Col,
          { size: '4 tar p-0' },
          _react2.default.createElement(
            'h5',
            null,
            '\xA9 2016 ',
            _react2.default.createElement(
              'span',
              null,
              kenny.firstName,
              ' ',
              kenny.lastName
            )
          )
        )
      )
    );
  }
});

exports.default = Footer;
module.exports = exports['default'];
