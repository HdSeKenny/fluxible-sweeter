'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Layout = require('../UI/Layout');

var _UI = require('../UI');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BlogModal extends _react.Component {

  constructor(props) {
    super(props);
    this.state = {
      welcomeText: "What's happening now ?",
      blogText: ''
    };
  }

  closeCreateBlogModal() {
    _UI.ModalsFactory.hide('createBlogModal');
  }

  onChangeBlogText(e) {
    this.setState({ blogText: e.target.value });
  }

  _renderCreateBtns(isDisabled) {
    return _react2.default.createElement(
      'div',
      { className: 'row btn-row' },
      _react2.default.createElement(
        'button',
        { type: 'button', disabled: isDisabled, className: 'btn btn-info', onClick: this.handleMicroBlog },
        'Create'
      ),
      _react2.default.createElement(
        'button',
        { type: 'button', disabled: false, className: 'btn btn-primary', onClick: this.closeCreateBlogModal },
        'Cancel'
      )
    );
  }

  render() {
    const { welcomeText: welcomeText, blogText: blogText } = this.state;
    const isDisabled = blogText.length > 140 || blogText.length === 0;
    return _react2.default.createElement(
      'div',
      { className: 'create-well' },
      _react2.default.createElement(
        _Layout.Row,
        null,
        _react2.default.createElement(
          _Layout.Col,
          { size: '12', className: 'p-0' },
          _react2.default.createElement(
            'p',
            { className: 'welcomeText' },
            welcomeText
          ),
          blogText.length < 141 && _react2.default.createElement(
            'p',
            { className: 'create-tip mt-5' },
            'You can still write ',
            _react2.default.createElement(
              'span',
              { className: 'len-span' },
              140 - blogText.length
            ),
            ' words'
          ),
          blogText.length > 140 && _react2.default.createElement(
            'p',
            { className: 'create-tip mt-5' },
            'Words can\'t be more than ',
            _react2.default.createElement(
              'span',
              { className: 'len-span-red' },
              '140'
            ),
            ' words'
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row textarea-row' },
        _react2.default.createElement('textarea', { type: 'text', rows: '4', value: blogText, onChange: e => this.onChangeBlogText(e) })
      ),
      this._renderCreateBtns(isDisabled)
    );
  }
}
exports.default = BlogModal;
BlogModal.displayName = 'App';
BlogModal.propTypes = {
  location: _react.PropTypes.object,
  children: _react.PropTypes.object
};
module.exports = exports['default'];
