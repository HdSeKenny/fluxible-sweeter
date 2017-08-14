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

var _ChatBox = require('./ChatBox');

var _ChatBox2 = _interopRequireDefault(_ChatBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Messages extends _react2.default.Component {

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
      { className: 'messages' },
      _react2.default.createElement(_ChatBox2.default, null)
    );
  }
}
exports.default = Messages;
Messages.displayName = 'Messages';
Messages.contextTypes = {
  getStore: _propTypes2.default.func,
  executeAction: _propTypes2.default.func
};
Messages.propTypes = {
  currentUser: _propTypes2.default.object,
  user: _propTypes2.default.object,
  query: _propTypes2.default.object,
  isCurrentUser: _propTypes2.default.bool
};
module.exports = exports['default'];
