/* eslint-disable all, camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '../UI/Layout';

export default class BlogNews extends React.Component {

  static displayName = 'BlogNews';

  static propTypes = {
    blogs: PropTypes.array,
    currentUser: PropTypes.object
  };

  render() {
    const { blogs, currentUser } = this.props;
    return (
      <section className="blog-news">
        <h3 className="title">Blog News</h3>
        {blogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((blog, index) => {
            const { id_str, title, created_at, images } = blog;
            return (
              <Row key={id_str} className="blog">
                <Col size="7 p-0">
                  <h4>{title || 'hello world'}</h4>
                  <small>{created_at}</small>
                </Col>
                <Col size="5 p-0">
                  <img src={images[0]} alt="blog-image" />
                </Col>
              </Row>
            );
          })}
      </section>
    );
  }
}
