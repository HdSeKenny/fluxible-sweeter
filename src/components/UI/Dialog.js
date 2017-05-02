import React from 'react';
import ReactDOM from 'react-dom';
import classSet from 'classnames';
import _ from 'lodash';
import ClickAwayable from '../../mixins/ClickAwayableMixin';
import WindowListenable from '../../mixins/window-listenable';
import dom from '../../utils/dom';
import KeyCode from '../../utils/key-code';
import Overlay from './Overlay';
import BgIcon from './BgIcon';

var Dialog = React.createClass({


    displayName: 'Dialog',

    mixins: [ClickAwayable, WindowListenable],

    propsTypes: {
        autoDetectWindowHeight: React.PropTypes.bool,
        autoScrollBodyContent: React.PropTypes.bool,
        modal: React.PropTypes.bool,
        close: React.PropTypes.bool,
        showImmediately: React.PropTypes.bool,
        onClickAway: React.PropTypes.func,
        onDismiss: React.PropTypes.func,
        onShow: React.PropTypes.func,
        dialogWindowClassName:React.PropTypes.string
    },
    windowListeners: {
        keyup: '_handleWindowKeyUp',
        resize: '_positionDialog',
    },
    getDefaultProps() {
        return {
            autoDetectWindowHeight: false,
            autoScrollBodyContent: false,
            modal: false
        };
    },
    getInitialState() {
        return {
            open: this.props.showImmediately || false,
        };
    },

    componentWillReceiveProps(newProps){
        this.setState( {
            open: newProps.showImmediately
        })
    },

    componentDidMount() {
        this._positionDialog();
        if (this.props.showImmediately) {
            this.refs.dialogOverlay.preventScrolling();
            if (this.props.onOpen) {
                this.props.onOpen();
            }
        }
    },
    componentDidUpdate() {
        this._positionDialog();
    },
    getClassName: function () {
        return {
            container: classSet({
                'dialog-container': true,
                'dialog-container-show': this.state.open
            }),
            window: classSet({
                'dialog-window': true
            },this.props.dialogWindowClassName),
            content: classSet({
                'dialog-content': true
            }),
            header: classSet({
                'dialog-header': true
            }),
            footer: classSet({
                'dialog-footer': true
            }),
        }
    },
    render(){
        var classNames = this.getClassName();
        return (
            <div className={classNames.container} ref="container">
                <div className={classNames.window} ref='dialogWindow'>
                    {this.props.close && (
                        <BgIcon iconClassName='bg-dialog-close' onClick={this.onClose}/>
                    )}
                    { 
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {
                                ref: child.type.displayName
                            });
                        })
                    }
                </div>
                <Overlay ref='dialogOverlay' show={this.state.open}/>
            </div>
        )
    },

    onClose() {
        this.refs.dialogOverlay.allowScrolling();
        this.setState({open: false}, function () {
            if (this.props.onClose) {
                this.props.onClose();
            }
        });
    },

    onOpen() {
        this.refs.dialogOverlay.preventScrolling();
        this.setState({open: true}, function () {
            if (this.props.onOpen) {
                this.props.onOpen();
            }
        });
    },

    _handleWindowKeyUp(e) {
        if (e.keyCode === KeyCode.ESC && !this.props.modal) {
            this.onClose();
        }
    },

    _positionDialog() {
        if (this.state.open) {
            let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            let container = ReactDOM.findDOMNode(this);
            let dialogWindow = ReactDOM.findDOMNode(this.refs.dialogWindow);
            let dialogContent = ReactDOM.findDOMNode(this.refs.DialogContent);
            let minPaddingTop = 16;
            let contentPadding = 10;

            dialogWindow.style.height = '';
            dialogContent.style.height = '';
            let dialogWindowWidth = dialogWindow.offsetWidth;
            let dialogWindowHeight = dialogWindow.offsetHeight;
            let paddingTop = ((clientHeight - dialogWindowHeight) / 2) - 64;
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
    },
});

Dialog.Header = React.createClass({
    displayName: 'DialogHeader',

    getClassName: function () {
        return {
            header: classSet({
                'dialog-header': true
            }),
        }
    },

    render(){
        var classNames = this.getClassName();
        return (
            <div className={classNames.header}>
                {this.props.children}
            </div>
        )
    },
});

Dialog.Content = React.createClass({
    displayName: 'DialogContent',

    getClassName: function () {
        return {
            content: classSet({
                'dialog-content': true
            }),
        }
    },

    render(){
        var classNames = this.getClassName();
        return (
            <div className={classNames.content}>
                {this.props.children}
            </div>
        )
    },
});

Dialog.Footer = React.createClass({
    displayName: 'DialogFooter',

    getClassName: function () {
        return {
            footer: classSet({
                'dialog-footer': true
            }),
        }
    },

    render(){
        var classNames = this.getClassName();
        return (
            <div className={classNames.footer}>
                {this.props.children}
            </div>
        )
    },
});

module.exports = Dialog;