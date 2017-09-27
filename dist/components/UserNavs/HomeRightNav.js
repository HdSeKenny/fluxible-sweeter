'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomeRightNav = function (_React$Component) {
  _inherits(HomeRightNav, _React$Component);

  function HomeRightNav(props) {
    _classCallCheck(this, HomeRightNav);

    var _this = _possibleConstructorReturn(this, (HomeRightNav.__proto__ || Object.getPrototypeOf(HomeRightNav)).call(this, props));

    _this.state = {
      currentUser: props.currentUser
    };
    return _this;
  }

  _createClass(HomeRightNav, [{
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