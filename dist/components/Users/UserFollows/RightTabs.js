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

var _stores = require('../../../stores');

var _actions = require('../../../actions');

var _plugins = require('../../../plugins');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RightTabs extends _react2.default.Component {

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
    if (res.msg === 'CANCEL_FOLLOW_USER_SUCCESS') {
      // this.setState({});
    }
  }

  convertTabTitle(group, query) {
    let title = group.display_title;
    if (query.tab) {
      const tabName = group.tabs.find(tab => tab.tag === query.tab).value;
      if (tabName) {
        title += ` / ${tabName}`;
      }
    }

    return title;
  }

  isFollowedThisUser(currentUser, user) {
    let isFollowed = false;
    if (currentUser && user) {
      const fIdx = currentUser.focuses.findIndex(f => f.id_str === user.id_str);
      isFollowed = fIdx >= 0;
    }

    return isFollowed;
  }

  followThisUser(currentUser, user) {
    if (!currentUser) {
      return _plugins.swal.warning('Login first please!');
    }

    const followObj = {
      thisUserId: user.id_str,
      currentUserId: currentUser.id_str
    };

    this.context.executeAction(_actions.UserActions.FollowThisUser, followObj);
  }

  unfollowThisUser(currentUser, user) {
    if (!currentUser) {
      return _plugins.swal.warning('Login first please!');
    }

    _plugins.swal.confirm('Are you sure', 'Yes, cancel follow!', () => {
      this.context.executeAction(_actions.UserActions.CancelFollowThisUser, {
        thisUserId: user.id_str,
        currentUserId: currentUser.id_str
      });
    });
  }

  convertTabRows(user, group, query) {
    let personArr = user[group.default_source] || [];
    if (query.tab) {
      personArr = user[query.title] ? user[query.title][query.tab] : [];
    }

    if (personArr.length) {
      personArr.forEach((p, index) => {
        if (typeof p === 'string') {
          personArr[index] = this.context.getStore(_stores.UserStore).getUserById(p);
        }
      });
    }
    return personArr;
  }

  getGroupSourceNumber(user, group) {
    const { query: query } = this.props;
    let num = 0;
    if (query.tab) {
      num = user[query.title] ? user[query.title][query.tab].length : 0;
    } else {
      num = user[group.default_source] ? user[group.default_source].length : 0;
    }

    return num;
  }

  isActive(title) {
    const { query: query } = this.props;
    // eslint-disable-next-line
    return query.title ? query.title === title ? 'active' : '' : '';
  }

  onClickTabTitle(pathname, title) {
    _reactRouter.browserHistory.push({
      pathname: pathname,
      query: {
        title: title
      }
    });
  }

  moveToOtherGroup() {}

  _renderUserFollowsInfo(p) {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _reactRouter.Link,
        { to: `/${p.username}` },
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

  _renderUserRowBtns(displayUser, p) {
    const isFollowed = this.isFollowedThisUser(displayUser, p);
    const { query: query, isCurrentUser: isCurrentUser } = this.props;
    return _react2.default.createElement(
      'div',
      { className: 'row-btns' },
      isFollowed ? _react2.default.createElement(
        'button',
        {
          className: 'btn btn-success',
          'data-balloon': 'Click to unfollow user!',
          'data-balloon-pos': 'top',
          onClick: () => this.unfollowThisUser(displayUser, p) },
        _react2.default.createElement('i', { className: 'fa fa-check mr-5', 'aria-hidden': 'true' }),
        'Followed'
      ) : _react2.default.createElement(
        'button',
        {
          className: 'btn btn-info',
          'data-balloon': 'Follow this user!',
          'data-balloon-pos': 'top',
          onClick: () => this.followThisUser(displayUser, p) },
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

  _renderUserRows(user, currentUser, rows) {
    if (rows.length) {
      return rows.map((p, index) => _react2.default.createElement(
        _Layout.Row,
        { key: index, className: 'tab-row mb-15' },
        _react2.default.createElement(
          _Layout.Col,
          { size: '1 u-img pl-0 mb-10 mt-5' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: `/${p.username}` },
            _react2.default.createElement('img', { alt: 'user', src: p.image_url })
          )
        ),
        _react2.default.createElement(
          _Layout.Col,
          { size: '7' },
          this._renderUserFollowsInfo(p)
        ),
        _react2.default.createElement(
          _Layout.Col,
          { size: '4 tar pr-0' },
          currentUser.id_str !== p.id_str && this._renderUserRowBtns(user, p)
        )
      ));
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

  render() {
    const { currentUser: currentUser, query: query, isCurrentUser: isCurrentUser, user: user, pathname: pathname } = this.props;

    const navGroups = _schema2.default.navGroups;
    const group = navGroups[query.title];
    const displayUser = isCurrentUser ? currentUser : user;
    const rows = this.convertTabRows(displayUser, group, query);
    const tabValue = this.getGroupSourceNumber(displayUser, group);
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
          { className: `col-xs-2 tac mr-10 ${this.isActive('focuses_list')}`, onClick: () => this.onClickTabTitle(pathname, 'focuses_list') },
          _react2.default.createElement(
            'h5',
            null,
            'His Focuses'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: `col-xs-2 tac ${this.isActive('fans_list')}`, onClick: () => this.onClickTabTitle(pathname, 'fans_list') },
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
}
exports.default = RightTabs;
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
module.exports = exports['default'];
