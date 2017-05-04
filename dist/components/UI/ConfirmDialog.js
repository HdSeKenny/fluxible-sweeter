'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfirmDialog = _react2.default.createClass({

    displayName: 'ConfirmDialog',

    propsTypes: {
        title: _react2.default.PropTypes.string,
        confirmMessage: _react2.default.PropTypes.string,
        modal: _react2.default.PropTypes.bool,
        close: _react2.default.PropTypes.bool,
        showImmediately: _react2.default.PropTypes.bool,
        onCancel: _react2.default.PropTypes.func,
        onConfirm: _react2.default.PropTypes.func,
        dialogWindowClassName: _react2.default.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            title: 'Confirmation Dialog',
            confirmMessage: 'Are you sure that you want to delete this record?'
        };
    },
    render: function () {
        return _react2.default.createElement(
            _.Dialog,
            {
                onClose: this.props.onCancel,
                showImmediately: this.props.showImmediately,
                dialogWindowClassName: this.props.dialogWindowClassName,
                modal: this.props.modal,
                close: this.props.close
            },
            _react2.default.createElement(
                _.Dialog.Header,
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'modal-header' },
                    _react2.default.createElement(
                        'b',
                        null,
                        this.props.title
                    )
                )
            ),
            _react2.default.createElement(
                _.Dialog.Content,
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'modal-body' },
                    this.props.confirmMessage || this.props.children
                )
            ),
            _react2.default.createElement(
                _.Dialog.Footer,
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'modal-footer' },
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        { onClick: this.props.onCancel },
                        'Cancel'
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        { bsStyle: 'primary', onClick: this.props.onConfirm },
                        'Confirm'
                    )
                )
            )
        );
    }
});

module.exports = ConfirmDialog;
