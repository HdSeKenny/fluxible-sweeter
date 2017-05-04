'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _reactRouter = require('react-router');

var _reactBootstrap = require('react-bootstrap');

var _sweetAlert = require('../../utils/sweetAlert');

var _sweetAlert2 = _interopRequireDefault(_sweetAlert);

var _stores = require('../../stores');

var _actions = require('../../actions');

var _UI = require('../UI');

var _Layout = require('../UI/Layout');

var _UserControls = require('../UserControls');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Home = _react2.default.createClass({

  displayName: 'Home',

  contextTypes: {
    executeAction: _react2.default.PropTypes.func
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.BlogStore, _stores.UserStore]
  },

  getInitialState: function () {
    return this.getStateFromStores();
  },
  getStateFromStores: function () {
    return {
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      kenny: this.getStore(_stores.UserStore).getKennyUser(),
      blogs: this.getStore(_stores.BlogStore).getAllBlogs(),
      welcomeText: 'What happened today, Write a blog here !',
      blogText: '',
      selectedPin: {}
    };
  },
  onChange: function (res) {
    if (res.resMsg === 'COMMENT_SUCCESS' || res.resMsg === 'DELETE_COMMENT_SUCCESS') {
      _sweetAlert2.default.alertSuccessMessage(res.resMsg);
      this.setState(this.getStateFromStores());
    }

    if (res.resMsg === 'CREATE_BLOG_SUCCESS') {
      _sweetAlert2.default.alertSuccessMessage(res.resMsg);
      this.setState({
        blogText: '',
        blogs: this.getStore(_stores.BlogStore).getAllBlogs()
      });
    }

    if (res.resMsg === 'LOGOUT_SUCCESS') {
      // this.setState(this.getStateFromStores());
    }

    if (res.resMsg === 'DELETE_BLOG_SUCCESS') {
      this.setState({ blogs: this.getStore(_stores.BlogStore).getAllBlogs() });
    }
  },
  handleBlogText: function (e) {
    this.setState({ blogText: e.target.value });
  },
  handleMicroBlog: function () {
    const { currentUser: currentUser } = this.state;
    if (currentUser) {
      const newBlog = {
        content: this.state.blogText,
        created_at: new Date(),
        type: 'microblog',
        author: currentUser._id
      };
      this.executeAction(_actions.BlogActions.AddBlog, newBlog);
    } else {
      this.checkCurrentUser();
    }
  },
  onSearchBlog: function (e) {
    const searchText = e.target.value.toLocaleLowerCase();
    const searchedBlogs = this.getStore(_stores.BlogStore).getSearchedBlogs(searchText);
    this.setState({ blogs: searchedBlogs });
  },
  sortByType: function (e) {
    const sortText = e.target.value.toLocaleLowerCase();
    const sortedBlogs = this.getStore(_stores.BlogStore).getSortedBlogs(sortText);
    this.setState({ blogs: sortedBlogs });
  },
  checkCurrentUser: function () {
    _sweetAlert2.default.alertWarningMessage('Login first !');
    this.setState({ blogText: '' });
  },
  changeShowCommentsState: function () {
    this.setState({ blogs: this.getStore(_stores.BlogStore).getAllBlogs() });
  },
  changeBlogThumbsUpState: function () {
    this.setState(this.getStateFromStores());
  },
  onViewPinItem: function (id) {
    const { blogs: blogs } = this.state;
    this.setState({ selectedPin: blogs.find(p => p.id_str === id) });
    _UI.ModalsFactory.show('pinModal');
  },


  // _renderCreateBtns(isDisabled) {
  //   const { currentUser } = this.state;
  //   return (
  //     <div className="row btn-row">
  //       <Button disabled={isDisabled} onClick={this.handleMicroBlog} className="btn-primary create-btn">
  //         <Glyphicon glyph="send" />Create
  //       </Button>
  //       {currentUser &&
  //         <Link to={`/user-blogs/${currentUser.strId}/add`}>
  //           <Button className="btn-info create-btn">
  //             <Glyphicon glyph="pencil" />Articles
  //           </Button>
  //         </Link>
  //       }
  //       {!currentUser &&
  //         <Link to="">
  //           <Button className="btn-info create-btn" onClick={this.checkCurrentUser}>
  //             <Glyphicon glyph="pencil" />Articles
  //           </Button>
  //         </Link>
  //       }
  //     </div>
  //   );
  // },

  // _renderCreateWell() {
  //   const { blogText, welcomeText } = this.state;
  //   const length = blogText.length;
  //   const isDisabled = length > 140 || length === 0;
  //   return (
  //     <div className="well create-well">
  //       <div className="row">
  //         <div className="col-xs-7 col-md-7">
  //           <p>{welcomeText}</p>
  //         </div>
  //         <div className="col-xs-5 col-md-5">
  //           {length < 141 &&
  //             <p>You can still write <span className="len-span">{140 - length}</span> words</p> }
  //           {length > 140 &&
  //             <p>Words can't be more than <span className="len-span-red">140</span> words</p>}
  //         </div>
  //       </div>
  //       <div className="row textarea-row">
  //         <textarea type="text" rows="3" value={blogText} onChange={this.handleBlogText} />
  //       </div>
  //       {this._renderCreateBtns(isDisabled)}
  //     </div>
  //   );
  // },

  // _renderBlogSearch() {
  //   return (
  //     <div className="well blog">
  //       <div className="row">
  //         <div className="col-xs-9 search-query">
  //           <input type="text" className="form-control" placeholder="Search" onChange={this.onSearchBlog} />
  //         </div>
  //         <div className="col-xs-3 sort-by">
  //           <select className="form-control" onChange={this.sortByType}>
  //             <option>All blogs</option>
  //             <option>Microblog</option>
  //             <option>Article</option>
  //           </select>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // },

  _renderPinItems: function (pins) {
    const articles = pins.filter(pin => pin.type === 'article');
    const moments = pins.filter(pin => pin.type === 'moment');
    return _react2.default.createElement(
      'article',
      { className: 'classification' },
      _react2.default.createElement(
        'section',
        { className: 'new-monments' },
        _react2.default.createElement(
          'p',
          { className: 'home-tag' },
          'New sweets > ',
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/list', className: 'view-all' },
            '.view all'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'pins-block' },
          moments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((pin, index) => _react2.default.createElement(_UI.PinItem, { key: index, onSelect: id => this.onViewPinItem(id), pin: pin, type: pin.type }))
        )
      ),
      _react2.default.createElement(
        'section',
        { className: 'articles' },
        _react2.default.createElement(
          'p',
          { className: 'home-tag' },
          'New articles > ',
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/list', className: 'view-all' },
            '.view all'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'pins-block' },
          articles.map((article, index) => _react2.default.createElement(_UI.PinItem, { key: index, onSelect: id => this.onViewPinItem(id), pin: article, type: article.type }))
        )
      ),
      _react2.default.createElement(
        'section',
        { className: 'hot-blogs' },
        _react2.default.createElement(
          'p',
          { className: 'home-tag' },
          'Hot sweets > ',
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/list', className: 'view-all' },
            '.view all'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'pins-block' },
          pins.sort((a, b) => b.likers.length - a.likers.length).map((pin, index) => _react2.default.createElement(_UI.PinItem, { key: index, onSelect: id => this.onViewPinItem(id), pin: pin, type: pin.type }))
        )
      )
    );
  },
  render: function () {
    const { currentUser: currentUser, kenny: kenny, blogs: blogs } = this.state;
    const displayUser = currentUser || kenny;
    return _react2.default.createElement(
      'div',
      { className: 'home-page' },
      _react2.default.createElement(_UI.MainSliders, null),
      _react2.default.createElement(
        'div',
        { className: 'main' },
        this._renderPinItems(blogs)
      ),
      _react2.default.createElement(
        _Layout.Page,
        null,
        _react2.default.createElement(_UI.ModalsFactory, {
          modalref: 'pinModal',
          large: true,
          title: this.state.selectedPin.title,
          pin: this.state.selectedPin,
          ModalComponent: _UserControls.ViewPin,
          showHeaderAndFooter: true
        })
      )
    );
  }
});

exports.default = Home;

/*
  <div className="blog-left">
    {this._renderCreateWell()}
    {this._renderBlogSearch()}
    <BlogsWell
      displayBlogs={blogs}
      changeShowCommentsState={this.changeShowCommentsState}
      changeBlogThumbsUpState={this.changeBlogThumbsUpState}
    />
  </div>
  <div className="blog-right" >
    {this._renderUserCard(displayUser)}
    <div className="well right-second">
      <HotBlogsTabs />
    </div>
  </div>
 */

module.exports = exports['default'];
