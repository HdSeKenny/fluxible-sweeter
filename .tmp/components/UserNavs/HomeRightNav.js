'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRouter = require('react-router');

var _Layout = require('../UI/Layout');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HomeRightNav extends _react2.default.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser
    };
  }

  isActive(routes) {
    const path = _utils.jsUtils.splitUrlBySlash(this.props.path, routes.length);
    const isActive = _lodash2.default.isEqual(routes.sort(), path.sort());
    return isActive ? 'on' : '';
  }

  goToThisUserPages(str) {
    const { user: user } = this.props;
    this.context.router.push(`/${user.username}${str}`);
  }

  onSearchBlogs(e) {
    const searchText = e.target.value.toLocaleLowerCase();
    const trimedTextWithoutSpace = searchText ? searchText.trim().replace(/\s/g, '') : '';
    this.props.onSearchBlogs(trimedTextWithoutSpace);
  }

  render() {
    const { isCurrentUser: isCurrentUser, user: user } = this.props;
    const username = user ? user.username : '';
    const isCreateArticlePage = this.isActive(['create', username]);
    const momentClasses = `btn btn-default ${this.isActive([username])}`;
    const mineClasses = `btn btn-default ${this.isActive(['mine', username])}`;
    const createClass = `btn btn-default ${isCreateArticlePage}`;

    return _react2.default.createElement(
      'div',
      { className: 'home-right-nav mb-10' },
      _react2.default.createElement(
        _Layout.Row,
        null,
        _react2.default.createElement(
          _Layout.Col,
          { size: '8 pl-0 home-nav-lis' },
          _react2.default.createElement(
            'button',
            { className: momentClasses, onClick: () => this.goToThisUserPages('') },
            'Moments'
          ),
          isCurrentUser && _react2.default.createElement(
            'div',
            { className: 'current-user-link' },
            _react2.default.createElement(
              'button',
              { className: mineClasses, onClick: () => this.goToThisUserPages('/mine') },
              'Mine'
            ),
            _react2.default.createElement(
              'button',
              { className: createClass, onClick: () => this.goToThisUserPages('/create') },
              'Add article'
            )
          )
        ),
        !isCreateArticlePage && _react2.default.createElement(
          'div',
          { className: '' },
          _react2.default.createElement(
            _Layout.Col,
            { size: '3 pl-0 home-search' },
            _react2.default.createElement('input', { type: 'text', className: 'form-control', onChange: e => this.onSearchBlogs(e) })
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '1 p-0 tar' },
            _react2.default.createElement(
              'select',
              { className: 'home-select form-control' },
              _react2.default.createElement(
                'option',
                null,
                'life'
              )
            )
          )
        )
      )
    );
  }
}
exports.default = HomeRightNav;
HomeRightNav.displayName = 'HomeRightNav';
HomeRightNav.contextTypes = {
  router: _reactRouter.routerShape.isRequired,
  executeAction: _propTypes2.default.func
};
HomeRightNav.propTypes = {
  location: _propTypes2.default.object,
  path: _propTypes2.default.string,
  currentUser: _propTypes2.default.object,
  user: _propTypes2.default.object,
  isCurrentUser: _propTypes2.default.bool,
  onSearchBlogs: _propTypes2.default.func
};
module.exports = exports['default'];
