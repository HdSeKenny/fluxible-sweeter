'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ClickAwayableMixin = require('../../mixins/ClickAwayableMixin');

var _ClickAwayableMixin2 = _interopRequireDefault(_ClickAwayableMixin);

var _windowListenable = require('../../mixins/window-listenable');

var _windowListenable2 = _interopRequireDefault(_windowListenable);

var _dom = require('../../utils/dom');

var _dom2 = _interopRequireDefault(_dom);

var _keyCode = require('../../utils/key-code');

var _keyCode2 = _interopRequireDefault(_keyCode);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _BgIcon = require('./BgIcon');

var _BgIcon2 = _interopRequireDefault(_BgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dialog = _react2.default.createClass({

    displayName: 'Dialog',

    mixins: [_ClickAwayableMixin2.default, _windowListenable2.default],

    propsTypes: {
        autoDetectWindowHeight: _react2.default.PropTypes.bool,
        autoScrollBodyContent: _react2.default.PropTypes.bool,
        modal: _react2.default.PropTypes.bool,
        close: _react2.default.PropTypes.bool,
        showImmediately: _react2.default.PropTypes.bool,
        onClickAway: _react2.default.PropTypes.func,
        onDismiss: _react2.default.PropTypes.func,
        onShow: _react2.default.PropTypes.func,
        dialogWindowClassName: _react2.default.PropTypes.string
    },
    windowListeners: {
        keyup: '_handleWindowKeyUp',
        resize: '_positionDialog'
    },
    getDefaultProps: function () {
        return {
            autoDetectWindowHeight: false,
            autoScrollBodyContent: false,
            modal: false
        };
    },
    getInitialState: function () {
        return {
            open: this.props.showImmediately || false
        };
    },
    componentWillReceiveProps: function (newProps) {
        this.setState({
            open: newProps.showImmediately
        });
    },
    componentDidMount: function () {
        this._positionDialog();
        if (this.props.showImmediately) {
            this.refs.dialogOverlay.preventScrolling();
            if (this.props.onOpen) {
                this.props.onOpen();
            }
        }
    },
    componentDidUpdate: function () {
        this._positionDialog();
    },

    getClassName: function () {
        return {
            container: (0, _classnames2.default)({
                'dialog-container': true,
                'dialog-container-show': this.state.open
            }),
            window: (0, _classnames2.default)({
                'dialog-window': true
            }, this.props.dialogWindowClassName),
            content: (0, _classnames2.default)({
                'dialog-content': true
            }),
            header: (0, _classnames2.default)({
                'dialog-header': true
            }),
            footer: (0, _classnames2.default)({
                'dialog-footer': true
            })
        };
    },
    render: function () {
        var classNames = this.getClassName();
        return _react2.default.createElement(
            'div',
            { className: classNames.container, ref: 'container' },
            _react2.default.createElement(
                'div',
                { className: classNames.window, ref: 'dialogWindow' },
                this.props.close && _react2.default.createElement(_BgIcon2.default, { iconClassName: 'bg-dialog-close', onClick: this.onClose }),
                _react2.default.Children.map(this.props.children, child => {
                    return _react2.default.cloneElement(child, {
                        ref: child.type.displayName
                    });
                })
            ),
            _react2.default.createElement(_Overlay2.default, { ref: 'dialogOverlay', show: this.state.open })
        );
    },
    onClose: function () {
        this.refs.dialogOverlay.allowScrolling();
        this.setState({ open: false }, function () {
            if (this.props.onClose) {
                this.props.onClose();
            }
        });
    },
    onOpen: function () {
        this.refs.dialogOverlay.preventScrolling();
        this.setState({ open: true }, function () {
            if (this.props.onOpen) {
                this.props.onOpen();
            }
        });
    },
    _handleWindowKeyUp: function (e) {
        if (e.keyCode === _keyCode2.default.ESC && !this.props.modal) {
            this.onClose();
        }
    },
    _positionDialog: function () {
        if (this.state.open) {
            let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            let container = _reactDom2.default.findDOMNode(this);
            let dialogWindow = _reactDom2.default.findDOMNode(this.refs.dialogWindow);
            let dialogContent = _reactDom2.default.findDOMNode(this.refs.DialogContent);
            let minPaddingTop = 16;
            let contentPadding = 10;

            dialogWindow.style.height = '';
            dialogContent.style.height = '';
            let dialogWindowWidth = dialogWindow.offsetWidth;
            let dialogWindowHeight = dialogWindow.offsetHeight;
            let paddingTop = (clientHeight - dialogWindowHeight) / 2 - 64;
            if (paddingTop < minPaddingTop) paddingTop = minPaddingTop;

            dialogWindow.style.width = dialogWindowWidth;

            container.style.paddingTop = paddingTop + 'px';
            // Force a height if the dialog is taller than clientHeight
            if (this.props.autoDetectWindowHeight || this.props.autoScrollBodyContent) {
                let maxDialogContentHeight = clientHeight - 5 * 64;
                dialogContent.style.maxHeight = maxDialogContentHeight + 'px';
                dialogContent.style.overflow = 'auto';
                container.style.paddingTop = 64 + 'px';
            } else {
                dialogContent.style.overflow = '';
            }
        }
    }
});

Dialog.Header = _react2.default.createClass({
    displayName: 'DialogHeader',

    getClassName: function () {
        return {
            header: (0, _classnames2.default)({
                'dialog-header': true
            })
        };
    },

    render: function () {
        var classNames = this.getClassName();
        return _react2.default.createElement(
            'div',
            { className: classNames.header },
            this.props.children
        );
    }
});

Dialog.Content = _react2.default.createClass({
    displayName: 'DialogContent',

    getClassName: function () {
        return {
            content: (0, _classnames2.default)({
                'dialog-content': true
            })
        };
    },

    render: function () {
        var classNames = this.getClassName();
        return _react2.default.createElement(
            'div',
            { className: classNames.content },
            this.props.children
        );
    }
});

Dialog.Footer = _react2.default.createClass({
    displayName: 'DialogFooter',

    getClassName: function () {
        return {
            footer: (0, _classnames2.default)({
                'dialog-footer': true
            })
        };
    },

    render: function () {
        var classNames = this.getClassName();
        return _react2.default.createElement(
            'div',
            { className: classNames.footer },
            this.props.children
        );
    }
});

module.exports = Dialog;
