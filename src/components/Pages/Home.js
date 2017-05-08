import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { Link } from 'react-router';
import sweetAlert from '../../utils/sweetAlert';
import { BlogStore, UserStore } from '../../stores';
import { BlogActions } from '../../actions';
import { MainSliders, PinItem, ModalsFactory } from '../UI';
import { Page } from '../UI/Layout';
import { PinItemModal } from '../UserControls';

const Home = React.createClass({

  displayName: 'Home',

  contextTypes: {
    executeAction: React.PropTypes.func
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
      showPinModal: true
    };
  },

  onChange(res) {
    if (res.resMsg === 'COMMENT_SUCCESS' || res.resMsg === 'DELETE_COMMENT_SUCCESS') {
      sweetAlert.alertSuccessMessage(res.resMsg);
      this.setState(this.getStateFromStores());
    }

    if (res.resMsg === 'CREATE_BLOG_SUCCESS') {
      sweetAlert.alertSuccessMessage(res.resMsg);
      this.setState({
        blogText: '',
        blogs: this.getStore(BlogStore).getAllBlogs()
      });
    }

    if (res.resMsg === 'LOGOUT_SUCCESS') {
      // this.setState(this.getStateFromStores());
    }

    if (res.resMsg === 'DELETE_BLOG_SUCCESS') {
      this.setState({ blogs: this.getStore(BlogStore).getAllBlogs() });
    }
  },

  componentDidMount() {

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

  onViewPinItem(id) {
    const { blogs } = this.state;
    const selectedPin = blogs.find(p => p.id_str === id);
    this.setState({ selectedPin });

    $('#pinModal').on('hidden.bs.modal', () => {
      this.hidePinModal();
    });

    ModalsFactory.show('pinModal');
  },

  hidePinModal() {
    this.setState({ selectedPin: {} });
  },

  _renderPinItems(pins) {
    const articles = pins.filter(pin => pin.type === 'article');
    const moments = pins.filter(pin => pin.type === 'moment');
    return (
      <article className="classification">
        <section className="new-monments">
          <p className="home-tag">New sweets > <Link to="/list" className="view-all">.view all</Link></p>
          <div className="pins-block">
            {moments.sort((a, b) => (new Date(b.created_at) - new Date(a.created_at)))
              .map((pin, index) =>
                <PinItem key={index} onSelect={(id) => this.onViewPinItem(id)} pin={pin} type={pin.type} />
              )
            }
          </div>
        </section>
        <section className="articles">
          <p className="home-tag">New articles > <Link to="/list" className="view-all">.view all</Link></p>
          <div className="pins-block">
            {articles.map((article, index) =>
              <PinItem key={index} onSelect={(id) => this.onViewPinItem(id)} pin={article} type={article.type} />
            )}
          </div>
        </section>
        <section className="hot-blogs">
          <p className="home-tag">Hot sweets > <Link to="/list" className="view-all">.view all</Link></p>
          <div className="pins-block">
            {pins.sort((a, b) => (b.likers.length - a.likers.length))
              .map((pin, index) =>
                <PinItem key={index} onSelect={(id) => this.onViewPinItem(id)} pin={pin} type={pin.type} />
              )
            }
          </div>
        </section>
      </article>
    );
  },

  render() {
    const { blogs, selectedPin } = this.state;
    // const displayUser = currentUser || kenny;
    return (
      <div className="home-page">
        <MainSliders />
        <div className="main">
          {this._renderPinItems(blogs)}
        </div>
        <Page>
          <ModalsFactory
            modalref="pinModal"
            hidePinModal={this.hidePinModal}
            pin={selectedPin}
            ModalComponent={PinItemModal}
            showHeaderAndFooter={false}
          />
        </Page>
      </div>
    );
  }
});

export default Home;
