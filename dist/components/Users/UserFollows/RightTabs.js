'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _stores = require('../../../stores');

var _actions = require('../../../actions');

var _plugins = require('../../../plugins');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RightTabs = function (_React$Component) {
  (0, _inherits3.default)(RightTabs, _React$Component);

  function RightTabs(props, context) {
    (0, _classCallCheck3.default)(this, RightTabs);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RightTabs.__proto__ || (0, _getPrototypeOf2.default)(RightTabs)).call(this, props));

    _this.focus = function () {
      _this.editor.focus();
    };

    _this._onStoreChange = _this._onStoreChange.bind(_this);
    _this.state = {
      currentUser: context.getStore(_stores.UserStore).getCurrentUser()
    };
    return _this;
  }

  (0, _createClass3.default)(RightTabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.context.getStore(_stores.UserStore).addChangeListener(this._onStoreChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.getStore(_stores.UserStore).removeChangeListener(this._onStoreChange);
    }
  }, {
    key: '_onStoreChange',
    value: function _onStoreChange(res) {
      if (res.msg === 'CANCEL_FOLLOW_USER_SUCCESS') {
        // this.setState({});
      }
    }
  }, {
    key: 'convertTabTitle',
    value: function convertTabTitle(group, query) {
      var title = group.display_title;
      if (query.tab) {
        var tabName = group.tabs.find(function (tab) {
          return tab.tag === query.tab;
        }).value;
        if (tabName) {
          title += ' / ' + tabName;
        }
      }

      return title;
    }
  }, {
    key: 'isFollowedThisUser',
    value: function isFollowedThisUser(currentUser, user) {
      var isFollowed = false;
      if (currentUser && user) {
        var fIdx = currentUser.focuses.findIndex(function (f) {
          return f.id_str === user.id_str;
        });
        isFollowed = fIdx >= 0;
      }

      return isFollowed;
    }
  }, {
    key: 'followThisUser',
    value: function followThisUser(currentUser, user) {
      if (!currentUser) {
        return _plugins.swal.warning('Login first please!');
      }

      var followObj = {
        thisUserId: user.id_str,
        currentUserId: currentUser.id_str
      };

      this.context.executeAction(_actions.UserActions.FollowThisUser, followObj);
    }
  }, {
    key: 'unfollowThisUser',
    value: function unfollowThisUser(currentUser, user) {
      var _this2 = this;

      if (!currentUser) {
        return _plugins.swal.warning('Login first please!');
      }

      _plugins.swal.confirm('Are you sure', 'Yes, cancel follow!', function () {
        _this2.context.executeAction(_actions.UserActions.CancelFollowThisUser, {
          thisUserId: user.id_str,
          currentUserId: currentUser.id_str
        });
      });
    }
  }, {
    key: 'convertTabRows',
    value: function convertTabRows(user, group, query) {
      var _this3 = this;

      var personArr = user[group.default_source] || [];
      if (query.tab) {
        personArr = user[query.title] ? user[query.title][query.tab] : [];
      }

      if (personArr.length) {
        personArr.forEach(function (p, index) {
          if (typeof p === 'string') {
            personArr[index] = _this3.context.getStore(_stores.UserStore).getUserById(p);
          }
        });
      }
      return personArr;
    }
  }, {
    key: 'getGroupSourceNumber',
    value: function getGroupSourceNumber(user, group) {
      var query = this.props.query;

      var num = 0;
      if (query.tab) {
        num = user[query.title] ? user[query.title][query.tab].length : 0;
      } else {
        num = user[group.default_source] ? user[group.default_source].length : 0;
      }

      return num;
    }
  }, {
    key: 'isActive',
    value: function isActive(title) {
      var query = this.props.query;
      // eslint-disable-next-line

      return query.title ? query.title === title ? 'active' : '' : '';
    }
  }, {
    key: 'onClickTabTitle',
    value: function onClickTabTitle(pathname, title) {
      _reactRouter.browserHistory.push({
        pathname: pathname,
        query: {
          title: title
        }
      });
    }
  }, {
    key: 'moveToOtherGroup',
    value: function moveToOtherGroup() {}
  }, {
    key: '_renderUserFollowsInfo',
    value: function _renderUserFollowsInfo(p) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '/' + p.username },
          _react2.default.createElement(
            'h4',
            { className: 'm-0 mb-5' },
            _react2.default.createElement(
              'strong',
              null,
              p.username
            )
          )
        ),
        _react2.default.createElement(
          _Layout.Row,
          null,
          _react2.default.createElement(
            _Layout.Col,
            { size: '4 p-0' },
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'strong',
                null,
                'Focuses'
              ),
              _react2.default.createElement(
                'span',
                { className: 'f-value' },
                p.focuses.length
              )
            )
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '4 p-0' },
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'strong',
                null,
                'Fans'
              ),
              _react2.default.createElement(
                'span',
                { className: 'f-value' },
                p.fans.length
              )
            )
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '4 p-0' },
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'strong',
                null,
                'Blogs'
              ),
              _react2.default.createElement(
                'span',
                { className: 'f-value' },
                p.blogs.length
              )
            )
          )
        ),
        _react2.default.createElement(
          _Layout.Row,
          null,
          _react2.default.createElement(
            'strong',
            null,
            'Signature:'
          ),
          ' ',
          p.signature
        ),
        _react2.default.createElement(
          _Layout.Row,
          null,
          _react2.default.createElement(
            'strong',
            null,
            'Profession:'
          ),
          ' ',
          p.profession
        )
      );
    }
  }, {
    key: '_renderUserRowBtns',
    value: function _renderUserRowBtns(displayUser, p) {
      var _this4 = this;

      var isFollowed = this.isFollowedThisUser(displayUser, p);
      var _props = this.props,
          query = _props.query,
          isCurrentUser = _props.isCurrentUser;

      return _react2.default.createElement(
        'div',
        { className: 'row-btns' },
        isFollowed ? _react2.default.createElement(
          'button',
          {
            className: 'btn btn-success',
            'data-balloon': 'Click to unfollow user!',
            'data-balloon-pos': 'top',
            onClick: function onClick() {
              return _this4.unfollowThisUser(displayUser, p);
            } },
          _react2.default.createElement('i', { className: 'fa fa-check mr-5', 'aria-hidden': 'true' }),
          'Followed'
        ) : _react2.default.createElement(
          'button',
          {
            className: 'btn btn-info',
            'data-balloon': 'Follow this user!',
            'data-balloon-pos': 'top',
            onClick: function onClick() {
              return _this4.followThisUser(displayUser, p);
            } },
          _react2.default.createElement('i', { className: 'fa fa-plus mr-5', 'aria-hidden': 'true' }),
          'Follow'
        ),
        _react2.default.createElement(
          'button',
          {
            className: 'btn btn-warning ml-5 options',
            'data-toggle': 'dropdown',
            'data-balloon': 'Options',
            'data-balloon-pos': 'top' },
          _react2.default.createElement('i', { className: 'fa fa-cog mr-5', 'aria-hidden': 'true' }),
          'Options'
        ),
        _react2.default.createElement(
          'ul',
          { className: 'dropdown-menu', role: 'menu', 'aria-labelledby': 'dLabel' },
          query.title !== 'fans_list' && isCurrentUser && _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              { href: 'javascript:void(0)', onClick: this.moveToOtherGroup },
              'Move to'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              { href: 'javascript:void(0)' },
              'Message'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              { href: 'javascript:void(0)' },
              'Report'
            )
          )
        )
      );
    }
  }, {
    key: '_renderUserRows',
    value: function _renderUserRows(user, currentUser, rows) {
      var _this5 = this;

      if (rows.length) {
        return rows.map(function (p, index) {
          return _react2.default.createElement(
            _Layout.Row,
            { key: index, className: 'tab-row mb-15' },
            _react2.default.createElement(
              _Layout.Col,
              { size: '1 u-img pl-0 mb-10 mt-5' },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/' + p.username },
                _react2.default.createElement('img', { alt: 'user', src: p.image_url })
              )
            ),
            _react2.default.createElement(
              _Layout.Col,
              { size: '7' },
              _this5._renderUserFollowsInfo(p)
            ),
            _react2.default.createElement(
              _Layout.Col,
              { size: '4 tar pr-0' },
              currentUser.id_str !== p.id_str && _this5._renderUserRowBtns(user, p)
            )
          );
        });
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'tac pt-30' },
          _react2.default.createElement(
            'h3',
            null,
            'Not data here ...'
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _props2 = this.props,
          currentUser = _props2.currentUser,
          query = _props2.query,
          isCurrentUser = _props2.isCurrentUser,
          user = _props2.user,
          pathname = _props2.pathname;


      var navGroups = _schema2.default.navGroups;
      var group = navGroups[query.title];
      var displayUser = isCurrentUser ? currentUser : user;
      var rows = this.convertTabRows(displayUser, group, query);
      var tabValue = this.getGroupSourceNumber(displayUser, group);
      return _react2.default.createElement(
        'div',
        { className: 'right-tabs' },
        isCurrentUser ? _react2.default.createElement(
          'h5',
          { className: 'tab-value pb-10' },
          _react2.default.createElement(
            'strong',
            null,
            this.convertTabTitle(group, query),
            ' ',
            tabValue
          )
        ) : _react2.default.createElement(
          _Layout.Row,
          { className: 'tab-choose mb-20' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-2 tac mr-10 ' + this.isActive('focuses_list'), onClick: function onClick() {
                return _this6.onClickTabTitle(pathname, 'focuses_list');
              } },
            _react2.default.createElement(
              'h5',
              null,
              'His Focuses'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-2 tac ' + this.isActive('fans_list'), onClick: function onClick() {
                return _this6.onClickTabTitle(pathname, 'fans_list');
              } },
            _react2.default.createElement(
              'h5',
              null,
              'His Fans'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'tab-rows' },
          this._renderUserRows(displayUser, currentUser, rows)
        )
      );
    }
  }]);
  return RightTabs;
}(_react2.default.Component);

RightTabs.displayName = 'RightTabs';
RightTabs.contextTypes = {
  getStore: _propTypes2.default.func,
  executeAction: _propTypes2.default.func
};
RightTabs.propTypes = {
  currentUser: _propTypes2.default.object,
  user: _propTypes2.default.object,
  query: _propTypes2.default.object,
  isCurrentUser: _propTypes2.default.bool
};
exports.default = RightTabs;
module.exports = exports['default'];