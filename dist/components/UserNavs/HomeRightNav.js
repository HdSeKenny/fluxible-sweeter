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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRouter = require('react-router');

var _Layout = require('../UI/Layout');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomeRightNav = function (_React$Component) {
  (0, _inherits3.default)(HomeRightNav, _React$Component);

  function HomeRightNav(props) {
    (0, _classCallCheck3.default)(this, HomeRightNav);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HomeRightNav.__proto__ || (0, _getPrototypeOf2.default)(HomeRightNav)).call(this, props));

    _this.state = {
      currentUser: props.currentUser
    };
    return _this;
  }

  (0, _createClass3.default)(HomeRightNav, [{
    key: 'isActive',
    value: function isActive(routes) {
      var path = _utils.jsUtils.splitUrlBySlash(this.props.path, routes.length);
      var isActive = _lodash2.default.isEqual(routes.sort(), path.sort());
      return isActive ? 'on' : '';
    }
  }, {
    key: 'goToThisUserPages',
    value: function goToThisUserPages(str) {
      var user = this.props.user;

      this.context.router.push('/' + user.username + str);
    }
  }, {
    key: 'onSearchBlogs',
    value: function onSearchBlogs(e) {
      var searchText = e.target.value.toLocaleLowerCase();
      var trimedTextWithoutSpace = searchText ? searchText.trim().replace(/\s/g, '') : '';
      this.props.onSearchBlogs(trimedTextWithoutSpace);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          isCurrentUser = _props.isCurrentUser,
          user = _props.user;

      var username = user ? user.username : '';
      var isCreateArticlePage = this.isActive(['create', username]);
      var momentClasses = 'btn btn-default ' + this.isActive([username]);
      var mineClasses = 'btn btn-default ' + this.isActive(['mine', username]);
      var createClass = 'btn btn-default ' + isCreateArticlePage;

      return _react2.default.createElement(
        'div',
        { className: 'home-right-nav mb-10' },
        _react2.default.createElement(
          _Layout.Row,
          null,
          _react2.default.createElement(
            _Layout.Col,
            { size: '9 pl-0 home-nav-lis' },
            _react2.default.createElement(
              'button',
              { className: momentClasses, onClick: function onClick() {
                  return _this2.goToThisUserPages('');
                } },
              'Moments'
            ),
            isCurrentUser && _react2.default.createElement(
              'div',
              { className: 'current-user-link' },
              _react2.default.createElement(
                'button',
                { className: mineClasses, onClick: function onClick() {
                    return _this2.goToThisUserPages('/mine');
                  } },
                'Mine'
              ),
              _react2.default.createElement(
                'button',
                { className: createClass, onClick: function onClick() {
                    return _this2.goToThisUserPages('/create');
                  } },
                'Add article'
              )
            )
          ),
          !isCreateArticlePage && _react2.default.createElement(
            'div',
            { className: '' },
            _react2.default.createElement(
              _Layout.Col,
              { size: '3 p-0 home-search' },
              _react2.default.createElement('input', { type: 'text', className: 'form-control', onChange: function onChange(e) {
                  return _this2.onSearchBlogs(e);
                } })
            ),
            false && _react2.default.createElement(
              _Layout.Col,
              { size: '2 p-0 tar' },
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
  }]);
  return HomeRightNav;
}(_react2.default.Component);

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
exports.default = HomeRightNav;
module.exports = exports['default'];