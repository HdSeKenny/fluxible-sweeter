'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BlogEditor = (0, _createReactClass2.default)({

  displayName: 'BlogEditor',

  propTypes: {
    blog: _propTypes2.default.object,
    show: _propTypes2.default.bool,
    onSave: _propTypes2.default.func,
    onCancel: _propTypes2.default.func,
    isUpdated: _propTypes2.default.bool,
    uniqueValidations: _propTypes2.default.object,
    dialogWindowClassName: _propTypes2.default.string
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
    return _react2.default.createElement('div', null);
  }
});

exports.default = BlogEditor;
module.exports = exports['default'];
