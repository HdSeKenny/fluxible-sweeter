'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _stores = require('../../stores');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Footer = _react2.default.createClass({

  displayName: 'Footer',

  mixins: [_FluxibleMixin2.default],

  contextTypes: {
    config: _react2.default.PropTypes.object
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
      { className: 'footer' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement('div', { className: 'col-xs-8' }),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-4' },
          _react2.default.createElement(
            'h5',
            null,
            '.'
          ),
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
