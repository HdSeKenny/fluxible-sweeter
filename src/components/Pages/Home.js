import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { mediaSize } from '../../utils';
import { swal } from '../../plugins';
import { BlogStore, UserStore } from '../../stores';
import { BlogActions } from '../../actions';
import { PinItem, ModalsFactory } from '../UI';
import { Page } from '../UI/Layout';
import { PinItemModal } from '../UserControls';

const Home = CreateReactClass({

  displayName: 'Home',

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
    const isMedium = mediaSize.getBrowserMediaInfo(true).media === 'medium';
    const isSmall = mediaSize.getBrowserMediaInfo(true).media === 'small';
    return {
      currentUser: this.getStore(UserStore).getCurrentUser(),
      kenny: this.getStore(UserStore).getKennyUser(),
      blogs: this.getStore(BlogStore).getAllBlogs(),
      welcomeText: 'What happened today, Write a blog here !',
      blogText: '',
      selectedPin: {},
      showPinModal: false,
      isMedium,
      isSmall
    };
  },

  onChange(res) {
    const blogMessages = [
      'CREATE_BLOG_SUCCESS',
      'DELETE_BLOG_SUCCESS',
      'THUMBS_UP_BLOG_SUCCESS',
      'CANCEL_THUMBS_UP_BLOG_SUCCESS',
      'COMMENT_SUCCESS',
      'DELETE_COMMENT_SUCCESS'
    ];

    if (blogMessages.includes(res.msg)) {
      swal.success(res.msg, () => {
        this.setState({ blogs: this.getStore(BlogStore).getAllBlogs() });
      });
    }
  },

  getBrowserScreenInfo() {
    const isMedium = mediaSize.getBrowserMediaInfo(true).media === 'medium';
    const isSmall = mediaSize.getBrowserMediaInfo(true).media === 'small';
    this.setState({ isMedium, isSmall });
  },

  componentWillMount() {
    this.getBrowserScreenInfo();
  },

  componentDidMount() {
    window.addEventListener('resize', this.getBrowserScreenInfo);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.getBrowserScreenInfo);
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
    swal.warning('Login first !');
    this.setState({ blogText: '' });
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
    const homePage = $('.home-page');
    if (homePage && homePage.length) {
      this.setState({ selectedPin: {}, showPinModal: false });
    }
  },

  _renderPinSection(sectionTitle, typedPins) {
    const { currentUser, isMedium, isSmall } = this.state;
    const marginRightIndex = isMedium || isSmall ? 2 : 3;

    return (
      <section className="pins-section">
        <p className="home-tag">
          {sectionTitle} > <Link to="/list" className="view-all">.view more</Link>
        </p>
        <div className="pins-block">
          {typedPins.map((pin, index) => {
            const specialClass = (index + 1) % marginRightIndex === 0 ? 'mr-0' : '';
            return (
              <PinItem
                key={index}
                onSelect={(id) => this.onViewPinItem(id)}
                pin={pin}
                type={pin.type}
                currentUser={currentUser}
                specialClass={specialClass}
                showImage={true}
                readMore={true}
              />
            );
          })}
        </div>
      </section>
    );
  },

  _renderPinItems(pins) {
    const articles = pins.filter(pin => pin.type === 'article');
    const thumbedSortedArticles = articles.sort((a, b) => b.likers.length - a.likers.length);
    const moments = pins.filter(pin => pin.type === 'moment');
    const thumbedSortedMoments = moments.sort((a, b) => b.likers.length - a.likers.length);
    const dateSortedPins = pins.sort((a, b) => (new Date(b.created_at) - new Date(a.created_at)));
    return (
      <article className="classification">
        {this._renderPinSection('It\'s new', dateSortedPins)}
        {this._renderPinSection('Hot articles', thumbedSortedArticles)}
        {this._renderPinSection('Good sweets', thumbedSortedMoments)}
      </article>
    );
  },

  render() {
    const { blogs, selectedPin, currentUser, showPinModal } = this.state;
    return (
      <div className="home-page">
        <div className="left">

        </div>
        <div className="main">{this._renderPinItems(blogs)}</div>
        <div className="right">

        </div>
        <Page>
          <ModalsFactory
            modalref="pinModal"
            pin={selectedPin}
            showModal={showPinModal}
            currentUser={currentUser}
            ModalComponent={PinItemModal}
            showHeaderAndFooter={false} />
        </Page>
      </div>
    );
  }
});

export default Home;
