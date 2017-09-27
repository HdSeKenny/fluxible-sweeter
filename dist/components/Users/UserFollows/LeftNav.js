'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _Layout = require('../../UI/Layout');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeftNav = function (_React$Component) {
  _inherits(LeftNav, _React$Component);

  function LeftNav() {
    _classCallCheck(this, LeftNav);

    return _possibleConstructorReturn(this, (LeftNav.__proto__ || Object.getPrototypeOf(LeftNav)).apply(this, arguments));
  }

  _createClass(LeftNav, [{
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

      var navGroupsKeys = Object.keys(_schema2.default.navGroups);
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