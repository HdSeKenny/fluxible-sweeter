/* eslint-disable all, camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { routerShape } from "react-router";
import { Row, Col } from '../UI/Layout';
import { format } from '../../utils';

export default class BlogNews extends React.Component {

  static displayName = 'BlogNews';

  static contextTypes = {
    router: routerShape.isRequired
  };

  static propTypes = {
    blogs: PropTypes.array,
    currentUser: PropTypes.object
  };

  showDetails(id) {
    this.context.router.push(`${id}/details`);
  }

  render() {
    const { blogs } = this.props;
    if (!blogs) return <section className="blog-news" />;
    return (
      <section className="blog-news">
        <h3 className="title">Blog News</h3>
        {blogs.sort((a, b) =>
          new Date(b.created_at) - new Date(a.created_at)
        )
        .map((blog, index) => {
          const { id_str, title, created_at, images } = blog;
          const fromNow = format.fromNow(created_at);
          return (
            <Row key={id_str} className="blog" onClick={() => this.showDetails(id_str)}>
              <Col size="7 p-0">
                <h4 className="b-title">{title}</h4>
                <small className="date">{fromNow}</small>
              </Col>
              <Col size="5 p-0"><img src={images[0]} alt="blog-image" /></Col>
            </Row>
          );
        })}
      </section>
    );
  }
}
