import React from 'react';
import {Button} from 'react-bootstrap';
import {Dialog} from './';

var ConfirmDialog = React.createClass({

    displayName: 'ConfirmDialog',

    propsTypes: {
        title: React.PropTypes.string,
        confirmMessage: React.PropTypes.string,
        modal: React.PropTypes.bool,
        close: React.PropTypes.bool,
        showImmediately: React.PropTypes.bool,
        onCancel: React.PropTypes.func,
        onConfirm: React.PropTypes.func,
        dialogWindowClassName: React.PropTypes.string
    },

    getDefaultProps(){
        return {
            title: 'Confirmation Dialog',
            confirmMessage: 'Are you sure that you want to delete this record?'
        };
    },

    render() {
        return (
            <Dialog
                onClose={this.props.onCancel}
                showImmediately={this.props.showImmediately}
                dialogWindowClassName={this.props.dialogWindowClassName}
                modal={this.props.modal}
                close={this.props.close}
                >
                <Dialog.Header>
                    <div className='modal-header'>
                        <b>{this.props.title}</b>
                    </div>
                </Dialog.Header>

                <Dialog.Content>
                    <div className='modal-body'>
                        {this.props.confirmMessage || this.props.children}
                    </div>
                </Dialog.Content>

                <Dialog.Footer>
                    <div className='modal-footer'>
                        <Button onClick={this.props.onCancel}>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.props.onConfirm}>Confirm</Button>
                    </div>
                </Dialog.Footer>
            </Dialog>
        );
    }
});

module.exports = ConfirmDialog;
