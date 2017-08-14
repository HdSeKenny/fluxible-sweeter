'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _Layout = require('../../UI/Layout');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LeftNav extends _react2.default.Component {

  isActive(title, tab) {
    const { query: query } = this.props;
    let isActive = false;
    if (tab || query.tab) {
      isActive = query.title === query.title && query.tab === tab;
    } else {
      isActive = query.title === title;
    }
    return isActive ? 'active' : '';
  }

  onChooseFollowsNavTitle(title) {
    const { pathname: pathname } = this.props;
    _reactRouter.browserHistory.push({
      pathname: pathname,
      query: {
        title: title
      }
    });
  }

  getGroupSourceNumber(isCurrentUser, group) {
    const { currentUser: currentUser, user: user } = this.props;
    const displayUser = isCurrentUser ? currentUser : user;
    return displayUser[group.default_source] ? displayUser[group.default_source].length : 0;
  }

  getTabSourceNumber(currentUser, default_source, tab) {
    return currentUser[default_source] ? currentUser[default_source][tab].length : 0;
  }

  isFollowedThisUser(currentUser, user) {
    let isFollowed = false;
    if (currentUser && user) {
      currentUser.focuses.forEach(focus => {
        if (focus.strId === user.strId) {
          isFollowed = true;
        }
      });
    }
    return isFollowed;
  }

  _renderNavGroups(currentUser, user, isCurrentUser) {
    const navGroupsKeys = Object.keys(_schema2.default.navGroups);
    const pathname = this.props.pathname;
    return navGroupsKeys.map((key, index) => {
      const group = _schema2.default.navGroups[key];
      const groupNumber = this.getGroupSourceNumber(isCurrentUser, group);
      return _react2.default.createElement(
        _Layout.Row,
        { className: 'nav-group', key: index },
        _react2.default.createElement(
          'h5',
          { className: `nav-title ${this.isActive(key)}`, onClick: () => this.onChooseFollowsNavTitle(key) },
          _react2.default.createElement('i', { className: group.icon }),
          group.value,
          _react2.default.createElement(
            'span',
            { className: 'ml-5' },
            groupNumber
          )
        ),
        group.tabs.length > 0 && isCurrentUser && _react2.default.createElement(
          'div',
          { className: 'nav-list' },
          group.tabs.map((tab, tIdex) => {
            const url = { pathname: pathname, query: { title: key, tab: tab.tag } };
            const tabNum = this.getTabSourceNumber(currentUser, key, tab.tag);
            return _react2.default.createElement(
              'li',
              { className: this.isActive(key, tab.tag), key: tIdex },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: url },
                tab.value,
                ' ',
                tabNum
              )
            );
          })
        )
      );
    });
  }

  render() {
    const { currentUser: currentUser, user: user, isCurrentUser: isCurrentUser } = this.props;
    return _react2.default.createElement(
      'div',
      { className: 'follows-navs' },
      this._renderNavGroups(currentUser, user, isCurrentUser)
    );
  }
}
exports.default = LeftNav;
LeftNav.displayName = 'LeftNav';
LeftNav.contextTypes = {
  executeAction: _propTypes2.default.func
};
LeftNav.propTypes = {
  currentUser: _propTypes2.default.object,
  user: _propTypes2.default.object,
  query: _propTypes2.default.object,
  pathname: _propTypes2.default.string,
  isCurrentUser: _propTypes2.default.bool
};
module.exports = exports['default'];
