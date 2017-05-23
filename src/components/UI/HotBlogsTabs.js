import React from 'react';
import _ from 'lodash';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { UserStore, BlogStore } from '../../stores';
import { Tabs, Pane } from '../UserControls';

const HotBlogsTabs = CreateReactClass({

  displayName: 'HotBlogsTabs',

  contextTypes: {
    executeAction: PropTypes.func
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore, BlogStore]
  },

  getInitialState() {
    return this.getStatesFromStores();
  },

  getStatesFromStores() {
    return {
      currentUser: this.getStore(UserStore).getCurrentUser(),
      blogs: this.getStore(BlogStore).getAllBlogs()
    };
  },

  onChange() {
    // this.setState(this.getStatesFromStores());
  },

  onDisplayEllipsis(hotBlog){
    const hotBlogTitle = hotBlog.title.split(' ');
    let blogTitle = '';
    if (hotBlogTitle.length > 8) {
       hotBlogTitle.forEach((word, index)=> {
        if (index < 9) {
          blogTitle = `${blogTitle} ${word}`;
        }
      })
       blogTitle = `${blogTitle}...`;
    }else{
      blogTitle = hotBlog.title;
    }
    return blogTitle;
  },

_renderHotBlogs(tabsBlogs) {
  return (
    <div className="hot-blogs">
      {tabsBlogs.sort((a, b) => {
        return (b.likers.length - a.likers.length);
      }).map(hotBlog => {
        if (hotBlog.type === 'article') {
          const blogTitle = this.onDisplayEllipsis(hotBlog);
          return (
            <div key={hotBlog._id} className="row hot-blog-row">
              <div className="col-xs-9">
                <p><Link to={`/blog-details/${hotBlog._id}`}>{blogTitle}</Link></p>
              </div>
              <div className="col-xs-3">
                <i className="fa fa-heart-o"></i> {hotBlog.likers.length}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
},

  render(){
    const {currentUser, blogs} = this.state;
    const tabsBlogs = _.cloneDeep(blogs);
    return (
      <Tabs>
        <Pane label="Hot Blogs">
          {this._renderHotBlogs(tabsBlogs)}
        </Pane>
        <Pane label="Q & A">
          <div>Question and Answer, kenny didn't finish this.</div>
        </Pane>
        <Pane label="Classify">
          <div>Classify, kenny didn't finish this.</div>
        </Pane>
      </Tabs>
    )
  }
})

export default HotBlogsTabs;
