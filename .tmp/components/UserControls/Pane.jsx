'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _reactRouter = require('react-router');

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Pane = _react2.default.createClass({

    displayName: 'Pane',

    render: function () {
        return _react2.default.createElement(
            'div',
            { className: 'user-pane' },
            this.props.children
        );
    }
});

exports.default = Pane;
module.exports = exports['default'];
