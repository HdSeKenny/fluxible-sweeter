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

var _UI = require('../UI');

var _UserControls = require('../UserControls');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HomeRightNav extends _react2.default.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      showCreateModal: false
    };
  }

  isActive(routes) {
    const path = _utils.jsUtils.splitUrlBySlash(this.props.path, routes.length);
    const isActive = _lodash2.default.isEqual(routes.sort(), path.sort());
    return isActive ? 'on' : '';
  }

  hideCreateModal() {
    this.setState({ showCreateModal: false });
  }

  openCreateBlogModal() {
    if (!this.state.showCreateModal) {
      this.setState({ showCreateModal: true });
    }
    $('#createBlogModal').on('hidden.bs.modal', () => {
      // eslint-disable-next-line
      this.hideCreateModal && this.hideCreateModal();
    });

    _UI.ModalsFactory.show('createBlogModal');
  }

  goToThisUserPages(str) {
    const { currentUser: currentUser } = this.state;
    this.context.router.push(`/${currentUser.username}${str}`);
  }

  render() {
    const { currentUser: currentUser, showCreateModal: showCreateModal } = this.state;
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
          { size: '6 pl-0 home-nav-lis' },
          _react2.default.createElement(
            'button',
            { className: momentClasses, onClick: () => this.goToThisUserPages('') },
            'Moments'
          ),
          isCurrentUser && _react2.default.createElement(
            'button',
            { className: mineClasses, onClick: () => this.goToThisUserPages('/mine') },
            'Mine'
          ),
          isCurrentUser && _react2.default.createElement(
            'button',
            { className: createClass, onClick: () => this.goToThisUserPages('/create') },
            'Add article'
          )
        ),
        _react2.default.createElement(
          _Layout.Col,
          { size: '3 pl-0 home-search' },
          _react2.default.createElement('input', { type: 'text', className: 'form-control' })
        ),
        _react2.default.createElement(
          _Layout.Col,
          { size: '3 pr-0 tar' },
          _react2.default.createElement(
            'button',
            { className: 'btn btn-info sweet-btn', onClick: () => this.openCreateBlogModal() },
            'Sweet'
          ),
          !isCreateArticlePage && _react2.default.createElement(
            'button',
            { className: 'btn btn-primary sweet-btn ml-10', onClick: () => this.goToThisUserPages('/create') },
            'Article'
          )
        )
      ),
      _react2.default.createElement(
        _Layout.Page,
        null,
        _react2.default.createElement(_UI.ModalsFactory, {
          modalref: 'createBlogModal',
          title: 'Create a sweet !',
          ModalComponent: _UserControls.BlogModal,
          size: 'modal-md',
          showHeaderAndFooter: false,
          showModal: showCreateModal,
          currentUser: currentUser })
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
  currentUser: _propTypes2.default.object
};
module.exports = exports['default'];
