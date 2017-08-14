'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _fluxibleAddonsReact = require('fluxible-addons-react');

var _utils = require('../../../utils');

var _plugins = require('../../../plugins');

var _actions = require('../../../actions');

var _stores = require('../../../stores');

var _Layout = require('../../UI/Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ChatBox extends _react2.default.Component {

  constructor(props, context) {
    super(props);

    this.focus = () => {
      this.editor.focus();
    };

    this._onStoreChange = this._onStoreChange.bind(this);
    this.state = {
      currentUser: context.getStore(_stores.UserStore).getCurrentUser()
    };
  }

  componentDidMount() {
    this.context.getStore(_stores.UserStore).addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    this.context.getStore(_stores.UserStore).removeChangeListener(this._onStoreChange);
  }

  _onStoreChange(res) {
    const authMessages = ['USER_LOGIN_SUCCESS', 'LOGOUT_SUCCESS'];
    if (authMessages.includes(res.msg)) {
      this.setState({ currentUser: this.context.getStore(_stores.UserStore).getCurrentUser() });
    }
  }

  render() {
    const { currentUser: currentUser } = this.state;
    // const { pathname } = this.props.location;

    if (!currentUser) return null;

    return _react2.default.createElement(
      'div',
      { className: 'chat-box' },
      _react2.default.createElement(
        'div',
        { className: 'wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'left' },
          _react2.default.createElement(
            'div',
            { className: 'top' },
            _react2.default.createElement('input', { type: 'text' }),
            _react2.default.createElement(
              'button',
              { className: 'btn btn-default btn-sm' },
              '+'
            )
          ),
          _react2.default.createElement(
            'ul',
            { className: 'people' },
            _react2.default.createElement(
              _Layout.Row,
              { className: 'person', 'data-chat': 'person2' },
              _react2.default.createElement(
                _Layout.Col,
                { size: '3 p-0' },
                _react2.default.createElement('img', { src: 'https://s3.postimg.org/yf86x7z1r/img2.jpg', alt: '' })
              ),
              _react2.default.createElement(
                _Layout.Col,
                { size: '9 pr-0 pl-10' },
                _react2.default.createElement(
                  _Layout.Row,
                  { className: 'name' },
                  _react2.default.createElement(
                    'span',
                    null,
                    'Dog Woofson'
                  )
                ),
                _react2.default.createElement(
                  _Layout.Row,
                  { className: 'time' },
                  _react2.default.createElement(
                    'span',
                    null,
                    '1:44 PM'
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'right' },
          _react2.default.createElement(
            'div',
            { className: 'top' },
            _react2.default.createElement(
              'h4',
              { className: 'm-0' },
              _react2.default.createElement(
                'i',
                null,
                'TDog Woofson'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'chat', 'data-chat': 'person2' },
            _react2.default.createElement(
              'div',
              { className: 'conversation-start' },
              _react2.default.createElement(
                'span',
                null,
                'Today, 5:38 PM'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'bubble you' },
              'Hello, can you hear me?'
            ),
            _react2.default.createElement(
              'div',
              { className: 'bubble you' },
              'I\'m in California dreaming'
            ),
            _react2.default.createElement(
              'div',
              { className: 'bubble me' },
              '... about who we used to be.'
            ),
            _react2.default.createElement(
              'div',
              { className: 'bubble me' },
              'Are you serious?'
            ),
            _react2.default.createElement(
              'div',
              { className: 'bubble you' },
              'When we were younger and free...'
            ),
            _react2.default.createElement(
              'div',
              { className: 'bubble you' },
              'I\'ve forgotten how it felt before'
            ),
            _react2.default.createElement(
              'div',
              { className: 'bubble you' },
              'I\'ve forgotten how it felt before'
            ),
            _react2.default.createElement(
              'div',
              { className: 'bubble you' },
              'I\'ve forgotten how it felt before'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'write' },
            _react2.default.createElement(
              _Layout.Row,
              { className: 'icons' },
              _react2.default.createElement(
                'span',
                { className: 'emoji' },
                _react2.default.createElement('i', { className: 'fa fa-smile-o fa-lg', 'aria-hidden': 'true' })
              )
            ),
            _react2.default.createElement('textarea', { rows: '1' })
          )
        )
      )
    );
  }
}
exports.default = ChatBox;
ChatBox.displayName = 'ChatBox';
ChatBox.contextTypes = {
  getStore: _propTypes2.default.func,
  executeAction: _propTypes2.default.func
};
ChatBox.propTypes = {
  currentUser: _propTypes2.default.object,
  user: _propTypes2.default.object,
  query: _propTypes2.default.object,
  isCurrentUser: _propTypes2.default.bool
};
module.exports = exports['default'];
