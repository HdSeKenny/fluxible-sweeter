'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _UserBar = require('./UserBar');

var _UserBar2 = _interopRequireDefault(_UserBar);

var _stores = require('../../stores');

var _UserNavs = require('../UserNavs');

var _UI = require('../UI');

var _UserControls = require('../UserControls');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserHome = _react2.default.createClass({

  displayName: 'UserHome',

  contextTypes: {
    executeAction: _react2.default.PropTypes.func
  },

  propTypes: {
    params: _react2.default.PropTypes.object,
    location: _react2.default.PropTypes.object
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.UserStore, _stores.BlogStore]
  },

  getInitialState: function () {
    return this.getStatesFromStores();
  },
  getStatesFromStores: function () {
    const { username: username } = this.props.params;
    return {
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      user: this.getStore(_stores.UserStore).getUserByUsername(username),
      displayBlogs: this.getStore(_stores.UserStore).getDisplayBlogsByUsername(username),
      selectedPin: {},
      singleUserBlogs: null,
      welcomeText: 'What happened today, Write a blog here !',
      showCreateModal: false
    };
  },
  onChange: function (res) {
    const { user: user, displayBlogs: displayBlogs } = this.state;
    const { username: username } = this.props.params;
    if (res.msg === 'CREATE_BLOG_SUCCESS') {
      _utils.sweetAlert.success(res.msg);
      displayBlogs.push(res.newBlog);
      this.setState({ displayBlogs: displayBlogs });
      _UI.ModalsFactory.hide('createBlogModal');
    }

    if (res.msg === 'COMMENT_SUCCESS' || res.msg === 'DELETE_COMMENT_SUCCESS') {
      _utils.sweetAlert.success(res.msg);
      // const singleUserBlogs = this.getStore(BlogStore).getUserBlogsWithFocuses(isCurrentUser, user);
      // this.setState({ singleUserBlogs });
    }

    // if(res.msg === 'FOLLOW_USER_SUCCESS' || res.msg === 'CANCEL_FOLLOW_USER_SUCCESS'){
    //   this.setState({
    //     currentUser: this.getStore(UserStore).getCurrentUser(),
    //     user: this.getStore(UserStore).getUserById(userId),
    //     isCurrentUser: this.getStore(UserStore).isCurrentUser(userId)
    //   })
    // }

    // this.setState({
    //   currentUser: this.getStore(UserStore).getCurrentUser(),
    //   user: this.getStore(UserStore).getUserByUsername(username)
    // });
  },


  // handleBlogText(e) {
  //   this.setState({ blogText: e.target.value });
  // },

  // handleMicroBlog() {
  //   const newBlog = {
  //     text: this.state.blogText,
  //     created_at: new Date(),
  //     type: 'microblog',
  //     author: this.state.currentUser._id
  //   };

  //   this.executeAction(BlogActions.AddBlog, newBlog);
  // },

  // getUserBlogsWithFocuses(isCurrentUser, user, singleUserBlogs) {
  //   let displayBlogs = singleUserBlogs;
  //   if (!displayBlogs) {
  //     displayBlogs = this.getStore(BlogStore).getUserBlogsWithFocuses(isCurrentUser, user);
  //   }
  //   return displayBlogs;
  // },

  // changeShowCommentsState(displayBlogs) {
  //   this.setState({ singleUserBlogs: displayBlogs });
  // },

  // changeBlogThumbsUpState() {
  //   const { user, isCurrentUser } = this.state;
  //   this.setState({
  //     singleUserBlogs: this.getStore(BlogStore).getUserBlogsWithFocuses(isCurrentUser, user)
  //   });
  // },

  onViewPinItem: function (id) {
    const { displayBlogs: displayBlogs } = this.state;
    const selectedPin = displayBlogs.find(b => b.id_str === id);
    this.setState({ selectedPin: selectedPin });

    $('#pinModal').on('hidden.bs.modal', () => {
      if (this.hidePinModal) {
        this.hidePinModal();
      }
    });

    _UI.ModalsFactory.show('pinModal');
  },
  hidePinModal: function () {
    const userHomeDom = $('.user-home');
    if (userHomeDom && userHomeDom.length) {
      this.setState({ selectedPin: {} });
    }
  },
  render: function () {
    const { currentUser: currentUser, user: user, displayBlogs: displayBlogs, selectedPin: selectedPin } = this.state;
    const { pathname: pathname } = this.props.location;
    const sortedBlogs = _utils.jsUtils.sortByDate(displayBlogs);
    return _react2.default.createElement(
      'div',
      { className: 'user-home' },
      _react2.default.createElement(_UserBar2.default, { path: pathname, user: user, currentUser: currentUser }),
      _react2.default.createElement(
        'div',
        { className: 'home-content' },
        _react2.default.createElement(
          'div',
          { className: 'home-left' },
          _react2.default.createElement(_UserNavs.UserHomeNav, { path: pathname, user: user, currentUser: currentUser, displayBlogs: displayBlogs })
        ),
        _react2.default.createElement(
          'div',
          { className: 'home-right' },
          _react2.default.createElement(_UserNavs.HomeRightNav, { path: pathname, currentUser: currentUser }),
          _react2.default.createElement(
            'div',
            { className: 'home-blogs' },
            sortedBlogs.map((blog, index) => _react2.default.createElement(_UI.PinItem, { key: index, onSelect: id => this.onViewPinItem(id), pin: blog, currentUser: currentUser }))
          ),
          _react2.default.createElement(
            _UI.Layout.Page,
            null,
            _react2.default.createElement(_UI.ModalsFactory, { modalref: 'pinModal', pin: selectedPin, ModalComponent: _UserControls.PinItemModal, showHeaderAndFooter: false })
          )
        )
      )
    );
  }
});
// import { BlogActions } from '../../actions';
exports.default = UserHome;
module.exports = exports['default'];
