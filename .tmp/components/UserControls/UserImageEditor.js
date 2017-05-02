'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _UI = require('../UI');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserImageEditor = _react2.default.createClass({

    displayName: 'UserImageEditor',

    propTypes: {
        image: _react.PropTypes.object.isRequired,
        show: _react.PropTypes.bool.isRequired,
        onSave: _react.PropTypes.func,
        onCancel: _react.PropTypes.func,
        isUploaded: _react.PropTypes.bool,
        uniqueValidations: _react.PropTypes.object,
        dialogWindowClassName: _react.PropTypes.string
    },

    getInitialState: function () {
        return {
            image: this.props.image,
            isUploaded: this.props.isUploaded
        };
    },
    componentWillReceiveProps: function (newProps) {
        this.setState({
            image: newProps.image,
            isUploaded: newProps.isUploaded
        });
    },
    onCancelEdit: function () {
        this.props.onCancel();
    },
    onSubmitEdit: function () {
        this.props.onSave(this.state.image);
    },
    handleFile: function (e) {
        const reader = new FileReader();
        const file = e.target.files[0];
        const { image: image } = this.state;
        const newImage = {
            userId: image.userId,
            file: file
        };
        reader.onload = e => {
            $('.user-image-modal').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);

        this.setState({ image: newImage });
    },
    _renderModalBody: function (image) {
        return _react2.default.createElement(
            'div',
            { className: 'modal-body' },
            _react2.default.createElement(
                'div',
                { className: 'upload-image' },
                _react2.default.createElement('input', { type: 'file', className: 'input-file', name: 'userImg', onChange: this.handleFile }),
                _react2.default.createElement('img', { alert: 'user-image', className: 'user-image-modal', src: image.imageUrl })
            )
        );
    },
    render: function () {
        const { image: image } = this.state;
        return _react2.default.createElement(
            _UI.Dialog,
            { showImmediately: this.props.show,
                onClose: this.onCancelEdit,
                close: true,
                modal: true,
                autoDetectWindowHeight: true,
                autoScrollBodyContent: true,
                dialogWindowClassName: this.props.dialogWindowClassName
            },
            _react2.default.createElement(
                _UI.Dialog.Header,
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'modal-header' },
                    _react2.default.createElement(
                        'h4',
                        null,
                        'Change your image'
                    )
                )
            ),
            _react2.default.createElement(
                _UI.Dialog.Content,
                null,
                this._renderModalBody(image)
            ),
            _react2.default.createElement(
                _UI.Dialog.Footer,
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'modal-footer' },
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        { onClick: this.onCancelEdit },
                        'Cancel'
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        { bsStyle: 'primary', onClick: this.onSubmitEdit },
                        'Upload'
                    )
                )
            )
        );
    }
}); /* eslint-disable all */
exports.default = UserImageEditor;
module.exports = exports['default'];
