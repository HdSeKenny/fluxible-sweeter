import React from 'react';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { FluxibleMixin } from 'fluxible-addons-react';
import { Link } from 'react-router';
import { jsUtils } from '../../utils';
import { swal } from '../../plugins';
import { BlogStore, UserStore } from '../../stores';
import { PinItem, ModalsFactory, Layout } from '../UI';
import { Row, Col } from '../UI/Layout';
import { PinItemModal, BlogModal } from '../UserControls';

export default CreateReactClass({

  displayName: 'List',

  contextTypes: {
    executeAction: PropTypes.func,
    getStore: PropTypes.func
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
      blogs: this.context.getStore(BlogStore).getAllBlogs(),
      selectedPin: {},
      showPinModal: false
    };
  },

  onChange(res) {
    const thumbsAndCommentMsgs = [
      'COMMENT_SUCCESS',
      'DELETE_COMMENT_SUCCESS',
      'THUMBS_UP_BLOG_SUCCESS',
      'CANCEL_THUMBS_UP_BLOG_SUCCESS',
    ];

    const blogsMsgs = [
      'DELETE_BLOG_SUCCESS',
      'CREATE_BLOG_SUCCESS'
    ];

    if (thumbsAndCommentMsgs.includes(res.msg)) {
      swal.success(res.msg);
      this.setState({
        selectedPin: res.newBlog,
        blogs: this.context.getStore(BlogStore).getAllBlogs()
      });
    }

    if (blogsMsgs.includes(res.msg)) {
      swal.success(res.msg, () => {
        this.setState({
          blogs: this.context.getStore(BlogStore).getAllBlogs()
        });
      });
    }

    if (['USER_LOGIN_SUCCESS', 'USER_REGISTER_SUCCESS'].includes(res.msg)) {
      const currentUser = this.context.getStore(UserStore).getCurrentUser();
      this.setState({
        currentUser
      });
    }
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

  componentDidMount() {

  },

  hidePinModal() {
    const listDom = $('.list-page');
    if (listDom && listDom.length) {
      this.setState({ selectedPin: {}, showPinModal: false });
    }
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
        {sortedPins.map((pin) =>
          <PinItem key={pin.id_str} onSelect={(id) => this.onViewPinItem(id)} pin={pin} currentUser={currentUser} readMore={false} />
        )}
      </div>
    );
  },

  render() {
    const { currentUser, kenny, blogs, selectedPin, showPinModal } = this.state;
    const displayUser = currentUser || kenny;
    return (
      <article className="list-page">
        <section className="mid">
          <BlogModal currentUser={currentUser} isUserHome={true} />
          {this._renderAllPinItems(blogs, currentUser)}
        </section>
        <section className="right">
          <div className="right-user-card mb-10">
            {this._renderUserCardInfo(displayUser)}
            {this._renderUserCardFooter(displayUser)}
          </div>
          <div className="right-blog-option">
          </div>
        </section>
        <Layout.Page>
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