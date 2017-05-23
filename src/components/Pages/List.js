import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { sweetAlert, jsUtils } from '../../utils';
import { BlogStore, UserStore } from '../../stores';
import { BlogActions } from '../../actions';
import { PinItem, ModalsFactory, Layout } from '../UI';
import { Row, Col } from '../UI/Layout';
import { PinItemModal, BlogModal } from '../UserControls';

const List = CreateReactClass({

  displayName: 'List',

  contextTypes: {
    executeAction: PropTypes.func
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [BlogStore, UserStore]
  },

  getInitialState() {
    return this.getStateFromStores();
  },

  getStateFromStores() {
    return {
      currentUser: this.getStore(UserStore).getCurrentUser(),
      kenny: this.getStore(UserStore).getKennyUser(),
      blogs: this.getStore(BlogStore).getAllBlogs(),
      welcomeText: 'What happened today, Write a blog here !',
      blogText: '',
      selectedPin: {},
      showCreateModal: false,
      showPinModal: false
    };
  },

  onChange(res) {
    const thumbsAndCommentMsgs = [
      'COMMENT_SUCCESS',
      'DELETE_COMMENT_SUCCESS',
      'THUMBS_UP_BLOG_SUCCESS',
      'CANCEL_THUMBS_UP_BLOG_SUCCESS',
      'DELETE_BLOG_SUCCESS',
      'CREATE_BLOG_SUCCESS'
    ];

    if (thumbsAndCommentMsgs.includes(res.msg)) {
      sweetAlert.success(res.msg);
      this.setState({
        blogs: this.getStore(BlogStore).getAllBlogs()
      });
    }

    if (res.msg === 'CREATE_BLOG_SUCCESS') {
      ModalsFactory.hide('createBlogModal');
    }
  },

  handleBlogText(e) {
    this.setState({ blogText: e.target.value });
  },

  handleMicroBlog() {
    const { currentUser } = this.state;
    if (currentUser) {
      const newBlog = {
        content: this.state.blogText,
        created_at: new Date(),
        type: 'microblog',
        author: currentUser._id
      };
      this.executeAction(BlogActions.AddBlog, newBlog);
    } else {
      this.checkCurrentUser();
    }
  },

  onSearchBlog(e) {
    const searchText = e.target.value.toLocaleLowerCase();
    const searchedBlogs = this.getStore(BlogStore).getSearchedBlogs(searchText);
    this.setState({ blogs: searchedBlogs });
  },

  sortByType(e) {
    const sortText = e.target.value.toLocaleLowerCase();
    const sortedBlogs = this.getStore(BlogStore).getSortedBlogs(sortText);
    this.setState({ blogs: sortedBlogs });
  },

  checkCurrentUser() {
    sweetAlert.alertWarningMessage('Login first !');
    this.setState({ blogText: '' });
  },

  changeShowCommentsState() {
    this.setState({ blogs: this.getStore(BlogStore).getAllBlogs() });
  },

  changeBlogThumbsUpState() {
    this.setState(this.getStateFromStores());
  },

  onViewPinItem(id) {
    const { blogs } = this.state;
    const selectedPin = blogs.find(p => p.id_str === id);
    this.setState({ selectedPin, showPinModal: true });

    $('#pinModal').on('hidden.bs.modal', () => {
      if (this.hidePinModal) {
        this.hidePinModal();
      }
    });
    ModalsFactory.show('pinModal');
  },

  hidePinModal() {
    const listDom = $('.list-page');
    if (listDom && listDom.length) {
      this.setState({ selectedPin: {}, showPinModal: false });
    }
  },

  hideCreateModal() {
    this.setState({ showCreateModal: false });
  },

  openCreateBlogModal() {
    if (!this.state.showCreateModal) {
      this.setState({ showCreateModal: true });
    }
    $('#createBlogModal').on('hidden.bs.modal', () => {
      // eslint-disable-next-line
      this.hideCreateModal && this.hideCreateModal();
    });

    ModalsFactory.show('createBlogModal');
  },

  _renderUserCardInfo(displayUser) {
    const { image_url, username, profession, description } = displayUser;
    return (
      <div className="">
        <Row className="card-header">
          <Col size="3">
            <Link to={`/${username}`}><img alt="user" src={image_url} /></Link>
          </Col>
          <Col size="8">
            <h3 className="m-0"><Link to={`/${username}`}>{username}</Link></h3>
            <h5>{profession}</h5>
          </Col>
        </Row>
        <Row className="card-body"><p>{description}</p></Row>
      </div>
    );
  },

  _renderUserCardFooter(displayUser) {
    const focusNumber = displayUser.focuses.length;
    const fansNumber = displayUser.fans.length;
    const blogsNumber = displayUser.blogs.length;
    return (
      <Row className="card-footer">
        <Col size="4" className="tac">
          <h5><span className="mr-5">{focusNumber}</span>Focus</h5>
        </Col>
        <Col size="4" className="tac">
          <h5><span className="mr-5">{fansNumber}</span>Fans </h5>
        </Col>
        <Col size="4" className="tac">
          <h5><span className="mr-5">{blogsNumber}</span>Articles</h5>
        </Col>
      </Row>
    );
  },

  _renderAllPinItems(pins, currentUser) {
    const sortedPins = jsUtils.sortByDate(pins);
    return (
      <div className="">
        {sortedPins.map((pin, index) =>
          <PinItem key={index} onSelect={(id) => this.onViewPinItem(id)} pin={pin} currentUser={currentUser} />
        )}
      </div>
    );
  },

  _renderSearchBlock() {
    return (
      <section className="search-block">
        <div className="search-block-header">
          {this._renderSearchBlockHeader()}
        </div>
        <div className="search-block-body">
          {this._renderSearchBlockBody()}
        </div>
        <div className="search-block-footer">
          {this._renderSearchBlockFooter()}
        </div>
      </section>
    );
  },

  _renderSearchBlockBody() {
    return (
      <Row>
        <form className="search-content" action="#" method="post">
          <div className="iconic-input">
            <i className="fa fa-search"></i>
            <input type="text" className="form-control" name="keyword" placeholder="Search..." />
          </div>
        </form>
      </Row>
    );
  },

  _renderSearchBlockFooter() {
    return (
      <Row>
        <h5 className="hot-searched">Hot searched ：</h5>
      </Row>
    );
  },

  _renderSearchBlockHeader() {
    return (
      <Row>
        <Col size="10" className="p-0">
          <h3 className="search-tip m-0">Todaydasdasdasdasdasdasdasdasdasdasdsaadsadsadaasddsadasdasdadasdasdsdsad</h3>
        </Col>
        <Col size="2" className="pr-0 pl-30">
          <button
            className="btn btn-info btn-block"
            data-balloon="create a sweet!"
            data-balloon-ops="top"
            onClick={this.openCreateBlogModal}>
            <i className="fa fa-pencil"></i> Sweet
          </button>
        </Col>
      </Row>
    );
  },

  render() {
    const { currentUser, kenny, blogs, selectedPin, showCreateModal, showPinModal } = this.state;
    const displayUser = currentUser || kenny;
    return (
      <article className="list-page">
        <section className="mid">
          {this._renderSearchBlock()}
          {this._renderAllPinItems(blogs, currentUser)}
        </section>
        <section className="right">
          <div className="right-user-card">
            {this._renderUserCardInfo(displayUser)}
            {this._renderUserCardFooter(displayUser)}
          </div>
          <div className="right-blog-option">
          </div>
        </section>

        <Layout.Page>
          <ModalsFactory
            modalref="createBlogModal"
            title="Create a sweet !"
            ModalComponent={BlogModal}
            size="modal-md"
            showHeaderAndFooter={false}
            showModal={showCreateModal}
            currentUser={currentUser} />

          <ModalsFactory
            modalref="pinModal"
            large={true}
            pin={selectedPin}
            showModal={showPinModal}
            ModalComponent={PinItemModal}
            showHeaderAndFooter={false}
            currentUser={currentUser} />
        </Layout.Page>
      </article>
    );
  }
});

export default List;
