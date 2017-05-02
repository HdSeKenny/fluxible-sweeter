'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactBootstrap = require('react-bootstrap');

var _UI = require('../UI');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BlogEditor = _react2.default.createClass({

  displayName: 'BlogEditor',

  propTypes: {
    blog: _react.PropTypes.object.isRequired,
    show: _react.PropTypes.bool.isRequired,
    onSave: _react.PropTypes.func,
    onCancel: _react.PropTypes.func,
    isUpdated: _react.PropTypes.bool,
    uniqueValidations: _react.PropTypes.object,
    dialogWindowClassName: _react.PropTypes.string
  },

  mixins: [_FluxibleMixin2.default],

  getInitialState: function () {
    const { title: title } = this.props.blog;
    const blogTitle = title.substring(3, title.length - 3);
    return {
      blog: this.props.blog,
      blogTitle: blogTitle,
      blogContent: this.props.blog.content,
      isUpdated: this.props.isUpdated
    };
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({
      blog: newProps.blog,
      isUpdated: newProps.isUpdated
    });
  },
  onCancelEdit: function () {
    this.props.onCancel();
  },
  onSubmitEdit: function () {
    this.props.onSave({
      _id: this.state.blog._id,
      title: this.state.blogTitle,
      content: this.state.blogContent,
      created_at: new Date()
    });
  },
  handleUpdateTitle: function (e) {
    this.setState({ blogTitle: e.target.value });
  },
  handleUpdateContent: function (e) {
    this.setState({ blogContent: e.target.value });
  },
  _renderModalBody: function (blogTitle, blogContent) {
    return _react2.default.createElement(
      'div',
      { className: 'modal-body' },
      _react2.default.createElement(
        'form',
        { className: 'form-horizontal' },
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-xs-3' },
              _react2.default.createElement(
                'select',
                { className: 'form-control' },
                _react2.default.createElement(
                  'option',
                  null,
                  'IT'
                ),
                _react2.default.createElement(
                  'option',
                  null,
                  'Sport'
                ),
                _react2.default.createElement(
                  'option',
                  null,
                  'Life'
                ),
                _react2.default.createElement(
                  'option',
                  null,
                  'Story'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-xs-9' },
              _react2.default.createElement('input', { type: 'text', ref: 'blogTitle', onChange: this.handleUpdateTitle,
                className: 'form-control', placeholder: 'Write title here..',
                value: blogTitle, autoFocus: true })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement('textarea', { type: 'text', ref: 'blogContent', onChange: this.handleUpdateContent,
            className: 'form-control', rows: '20', placeholder: 'Write content here..',
            value: blogContent, autoFocus: true })
        )
      )
    );
  },
  render: function () {
    const { blogTitle: blogTitle, blogContent: blogContent } = this.state;
    return _react2.default.createElement(
      _UI.Dialog,
      {
        showImmediately: this.props.show,
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
            'h3',
            null,
            'Update this blog'
          )
        )
      ),
      _react2.default.createElement(
        _UI.Dialog.Content,
        null,
        this._renderModalBody(blogTitle, blogContent)
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
            'Save'
          )
        )
      )
    );
  }
});

exports.default = BlogEditor;
module.exports = exports['default'];
