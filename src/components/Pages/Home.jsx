import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { Link } from 'react-router';
import { Button, Glyphicon } from 'react-bootstrap';
import sweetAlert from '../../utils/sweetAlert';
import { BlogStore, UserStore } from '../../stores';
import { BlogActions } from '../../actions';
import { BlogsWell, HotBlogsTabs, MainSliders, PinItem, ModalsFactory } from '../UI';
import { Row, Col, Page } from '../UI/Layout';
// import data from '../../../../../filesDownloader/sweets.json';
import data from '../../utils/data';
import { ViewPin } from '../UserControls';

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
      selectedPin: {}
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
    this.setState({ selectedPin: data.find(p => p._id === id) });
    ModalsFactory.show('pinModal');
  },

  _renderCreateBtns(isDisabled) {
    const { currentUser } = this.state;
    return (
      <div className="row btn-row">
        <Button disabled={isDisabled} onClick={this.handleMicroBlog} className="btn-primary create-btn">
          <Glyphicon glyph="send" />Create
        </Button>
        {currentUser &&
          <Link to={`/user-blogs/${currentUser.strId}/add`}>
            <Button className="btn-info create-btn">
              <Glyphicon glyph="pencil" />Articles
            </Button>
          </Link>
        }
        {!currentUser &&
          <Link to="">
            <Button className="btn-info create-btn" onClick={this.checkCurrentUser}>
              <Glyphicon glyph="pencil" />Articles
            </Button>
          </Link>
        }
      </div>
    );
  },

  _renderCreateWell() {
    const { blogText, welcomeText } = this.state;
    const length = blogText.length;
    const isDisabled = length > 140 || length === 0;
    return (
      <div className="well create-well">
        <div className="row">
          <div className="col-xs-7 col-md-7">
            <p>{welcomeText}</p>
          </div>
          <div className="col-xs-5 col-md-5">
            {length < 141 &&
              <p>You can still write <span className="len-span">{140 - length}</span> words</p> }
            {length > 140 &&
              <p>Words can't be more than <span className="len-span-red">140</span> words</p>}
          </div>
        </div>
        <div className="row textarea-row">
          <textarea type="text" rows="3" value={blogText} onChange={this.handleBlogText} />
        </div>
        {this._renderCreateBtns(isDisabled)}
      </div>
    );
  },

  _renderBlogSearch() {
    return (
      <div className="well blog">
        <div className="row">
          <div className="col-xs-9 search-query">
            <input type="text" className="form-control" placeholder="Search" onChange={this.onSearchBlog} />
          </div>
          <div className="col-xs-3 sort-by">
            <select className="form-control" onChange={this.sortByType}>
              <option>All blogs</option>
              <option>Microblog</option>
              <option>Article</option>
            </select>
          </div>
        </div>
      </div>
    );
  },

  _renderUserCard(displayUser) {
    return (
      <div className="well right-first">
        <div className="rf-body">
          <div className="rf-img">
            <Link to={`/user-home/${displayUser._id}/home`}>
              <img alt="" src={displayUser.image_url} />
            </Link>
          </div>
          <div className="rf-info">
            <h3>
              <Link to={`/user-home/${displayUser._id}/home`}>
                {displayUser.username}
              </Link>
            </h3>
            <p>{displayUser.profession}</p>
          </div>
        </div>
        <div className="row rf-footer">
          <div className="col-xs-4">
            <Link to={`/user-blogs/${displayUser._id}/list`}>
              {displayUser.blogs.length} Blogs
            </Link>
          </div>
          <div className="rf-border"></div>
          <div className="col-xs-4">
            <Link to={`/user-follows/${displayUser._id}`}>
              {displayUser.fans.length} Fans
            </Link>
          </div>
          <div className="rf-border"></div>
          <div className="col-xs-4">
            <Link to={`/user-follows/${displayUser._id}`}>
              {displayUser.focuses.length} Focuses
            </Link>
          </div>
        </div>
      </div>
    );
  },

  _renderPinItems(pins) {
    const articles = pins.filter(pin => pin.type === 'article');
    const moments = pins.filter(pin => pin.type === 'moment');
    return (
      <article className="classification">
        <section className="new-monments">
          <p className="home-tag">New monments > <Link to="/list" className="view-all">.view all</Link></p>
          <Row className="mason_row">
            {moments.sort((a, b) => (new Date(b.created_at) - new Date(a.created_at)))
              .map((pin, index) =>
                <PinItem key={index} onSelect={(id) => this.onViewPinItem(id)} pin={pin} type={pin.type} />
              )
            }
          </Row>
        </section>
        <section className="articles">
          <p className="home-tag">Articles > <Link to="/list" className="view-all">.view all</Link></p>
          <Row className="mason_row">
            {articles.map((article, index) =>
              <PinItem key={index} onSelect={(id) => this.onViewPinItem(id)} pin={article} type={article.type} />
            )}
          </Row>
        </section>
        <section className="hot-blogs">
          <p className="home-tag">Hot Sweets > <Link to="/list" className="view-all">.view all</Link></p>
          <Row className="mason_row">
            {pins.sort((a, b) => (b.thumbs - a.thumbs))
              .map((pin, index) =>
                <PinItem key={index} onSelect={(id) => this.onViewPinItem(id)} pin={pin} type={pin.type} />
              )
            }
          </Row>
        </section>
      </article>
    );
  },

  render() {
    const { currentUser, kenny, blogs } = this.state;
    const displayUser = currentUser || kenny;
    return (
      <div className="home-page">
        <MainSliders />
        <div className="main">
          {this._renderPinItems(data)}
        </div>
        <Page>
          <ModalsFactory
            modalref="pinModal"
            large={true}
            title={this.state.selectedPin.title}
            pin={this.state.selectedPin}
            ModalComponent={ViewPin}
            showHeaderAndFooter={true}
          />
        </Page>
      </div>
    );
  }
});

export default Home;


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
