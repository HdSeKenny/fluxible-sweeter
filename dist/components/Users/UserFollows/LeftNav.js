'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _Layout = require('../../UI/Layout');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LeftNav = function (_React$Component) {
  (0, _inherits3.default)(LeftNav, _React$Component);

  function LeftNav() {
    (0, _classCallCheck3.default)(this, LeftNav);
    return (0, _possibleConstructorReturn3.default)(this, (LeftNav.__proto__ || (0, _getPrototypeOf2.default)(LeftNav)).apply(this, arguments));
  }

  (0, _createClass3.default)(LeftNav, [{
    key: 'isActive',
    value: function isActive(title, tab) {
      var query = this.props.query;

      var isActive = false;
      if (tab || query.tab) {
        isActive = query.title === query.title && query.tab === tab;
      } else {
        isActive = query.title === title;
      }
      return isActive ? 'active' : '';
    }
  }, {
    key: 'onChooseFollowsNavTitle',
    value: function onChooseFollowsNavTitle(title) {
      var pathname = this.props.pathname;

      _reactRouter.browserHistory.push({
        pathname: pathname,
        query: {
          title: title
        }
      });
    }
  }, {
    key: 'getGroupSourceNumber',
    value: function getGroupSourceNumber(isCurrentUser, group) {
      var _props = this.props,
          currentUser = _props.currentUser,
          user = _props.user;

      var displayUser = isCurrentUser ? currentUser : user;
      return displayUser[group.default_source] ? displayUser[group.default_source].length : 0;
    }
  }, {
    key: 'getTabSourceNumber',
    value: function getTabSourceNumber(currentUser, default_source, tab) {
      return currentUser[default_source] ? currentUser[default_source][tab].length : 0;
    }
  }, {
    key: 'isFollowedThisUser',
    value: function isFollowedThisUser(currentUser, user) {
      var isFollowed = false;
      if (currentUser && user) {
        currentUser.focuses.forEach(function (focus) {
          if (focus.strId === user.strId) {
            isFollowed = true;
          }
        });
      }
      return isFollowed;
    }
  }, {
    key: '_renderNavGroups',
    value: function _renderNavGroups(currentUser, user, isCurrentUser) {
      var _this2 = this;

      var navGroupsKeys = (0, _keys2.default)(_schema2.default.navGroups);
      var pathname = this.props.pathname;
      return navGroupsKeys.map(function (key, index) {
        var group = _schema2.default.navGroups[key];
        var groupNumber = _this2.getGroupSourceNumber(isCurrentUser, group);
        return _react2.default.createElement(
          _Layout.Row,
          { className: 'nav-group', key: index },
          _react2.default.createElement(
            'h5',
            { className: 'nav-title ' + _this2.isActive(key), onClick: function onClick() {
                return _this2.onChooseFollowsNavTitle(key);
              } },
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
            group.tabs.map(function (tab, tIdex) {
              var url = { pathname: pathname, query: { title: key, tab: tab.tag } };
              var tabNum = _this2.getTabSourceNumber(currentUser, key, tab.tag);
              return _react2.default.createElement(
                'li',
                { className: _this2.isActive(key, tab.tag), key: tIdex },
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
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          currentUser = _props2.currentUser,
          user = _props2.user,
          isCurrentUser = _props2.isCurrentUser;

      return _react2.default.createElement(
        'div',
        { className: 'follows-navs' },
        this._renderNavGroups(currentUser, user, isCurrentUser)
      );
    }
  }]);
  return LeftNav;
}(_react2.default.Component);

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
exports.default = LeftNav;
module.exports = exports['default'];