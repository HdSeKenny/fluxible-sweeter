import React from 'react';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { FluxibleMixin } from 'fluxible-addons-react';
import { Link } from 'react-router';
import { BlogStore, UserStore } from '../../stores';
import { UserActions, BlogActions } from '../../actions';
import { ModalsFactory, MainSliders, Swal } from '../UI';
import { Page } from '../UI/Layout';
import { Login, Signup } from '../Pages';
import { UserCard } from '../Snippets';
import { BlogModal } from '../UserControls';
import { BlogSection, BlogNews } from '../Blogs';

const Home = CreateReactClass({

  displayName: 'Home',

  contextTypes: {
    executeAction: PropTypes.func
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [BlogStore, UserStore],
    fetchData: (context, params, query, done) => {
      Promise.all([
        context.executeAction(UserActions.LoadUsers, params),
        context.executeAction(BlogActions.LoadBlogs, params)
      ]).then(() => {
        done();
      });
    }
  },

  getInitialState() {
    return this.getStateFromStores();
  },

  getStateFromStores() {
    const { username } = this.props.params;
    const userStore = this.getStore(UserStore);
    const blogStore = this.getStore(BlogStore);
    return {
      currentUser: userStore.getCurrentUser(),
      user: userStore.getUserByUsername(username),
      kenny: userStore.getKennyUser(),
      blogs: blogStore.getAllBlogs(),
      welcomeText: 'What happened today, Write a blog here !',
      blogText: '',
      blogTags: [
        'News',
        'Hots',
        'Stars',
        'Funny',
        'social',
        'Fashion',
        'Funny',
        'Funny',
        'Funny',
        'Funny',
        'Funny',
        'Funny',
        'Funny'
      ]
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

    const authMessages = [
      'USER_LOGIN_SUCCESS',
      'LOGOUT_SUCCESS'
    ];

    if (res.msg === 'BEFORE_LOGGED_IN') {
      this.showLoading();
    }

    if (res.msg === 'AFTER_LOGGED_IN') {
      this.showLoading();
    }

    if (blogMessages.includes(res.msg)) {
      Swal.success(res.msg, '', false, () => {
        this.setState({
          blogs: this.getStore(BlogStore).getAllBlogs()
        });
      });
    }

    if (authMessages.includes(res.msg)) {
      this.setState({
        currentUser: this.getStore(UserStore).getCurrentUser()
      });
    }
  },

  componentDidMount() {
    // Make blog image height adjust the parent content
    const pinBodyRight = document.querySelectorAll('.pin-right');
    const pinBodyLeft = document.querySelectorAll('.pin-left .pin-image img');
    for (let i = 0; i < pinBodyRight.length; i++) {
      pinBodyLeft[i].style.height = `${pinBodyRight[i].scrollHeight}px`;
    }
  },

  componentDidUpdate() {
    setImmediate(() => {
      this.hideLoading();
    });
  },

  showLoading() {
    $('.loading').removeClass('hide');
  },

  hideLoading() {
    $('.loading').addClass('hide');
  },

  getTagClassName(query, tag) {
    return query.tag === tag ? 'active' : '';
  },

  openSignupModal() {
    ModalsFactory.show('signupModal');
  },

  getLinkParams(tag, index, pathname, query) {
    const lowcaseTag = tag.toLocaleLowerCase();
    const url = { pathname, query: { tag: lowcaseTag } };
    let classname = this.getTagClassName(query, lowcaseTag);
    if (!query.tag && index === 0) {
      classname = 'active';
    }

    return {
      classname,
      url
    };
  },

  _renderHomeLeftTags(tags, pathname, query) {
    return (
      <ul className="blog-tags">
        {tags.map((tag, index) => {
          const { classname, url } = this.getLinkParams(tag, index, pathname, query);
          return <li className={classname} key={index}><Link to={url}>{tag}</Link></li>;
        })}
      </ul>
    );
  },

  _renderHomeRightContent(blogs, currentUser, user, pathname) {
    const articles = blogs.filter(b => b.type === 'article');
    return (
      <div className="">
        <div className={`right-login mb-10 ${currentUser ? 'current-user' : ''}`}>
          {!currentUser && <Login isModalLogin={false} openSignupModal={() => this.openSignupModal()} />}
          {currentUser && <UserCard user={currentUser} />}
        </div>

        <BlogNews blogs={blogs} currentUser={currentUser} />
      </div>
    );
  },

  render() {
    const { blogs, currentUser, blogTags } = this.state;
    const { pathname, query } = this.props.location;
    const showSliders = query.tag === 'news' || typeof query.tag === 'undefined';
    return (
      <div className="home-page">
        <div className="left">
          {this._renderHomeLeftTags(blogTags, pathname, query)}
        </div>
        <div className="main">
          {!currentUser && <MainSliders show={showSliders} />}
          <BlogModal currentUser={currentUser} isUserHome={true} />
          <BlogSection blogs={blogs} currentUser={currentUser} />
        </div>
        <div className="right">
          <div className={`right-login mb-10 ${currentUser ? 'current-user' : ''}`}>
            {!currentUser && <Login isModalLogin={false} openSignupModal={() => this.openSignupModal()} />}
            {currentUser && <UserCard user={currentUser} />}
          </div>

          <BlogNews blogs={blogs} currentUser={currentUser} />
        </div>
        <Page>
          <ModalsFactory
            modalref="signupModal"
            title="Create an account"
            ModalComponent={Signup}
            size="modal-md"
            showHeaderAndFooter={true}
          />
        </Page>
      </div>
    );
  }
});

export default Home;
