import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col } from './Layout';

export default class PinItem extends Component {

  static displayName = 'PinItem';

  static propTypes = {
    pin: React.PropTypes.object,
    index: React.PropTypes.number,
    onSelect: React.PropTypes.func
  };

  onViewPinItem() {
    const { pin } = this.props;
    this.props.onSelect(pin._id);
  }

  _renderPinHeader(pin, isArticle) {
    const isMoment = pin.type === 'moment';
    const { author } = pin;
    const fromNow = moment(pin.dateCreated).fromNow();
    return (
      <div className="pin-header">
        {isMoment &&
          <div className="pin-moment">
            <span className="thumb-sm avatar pull-left mr-5">
              <img alt="pin" src={author.avatar || ''} />
            </span>
            <strong className="author-name pt-5">{author.name}</strong>
            <span className="text-muted text-xs">
              {author.username} <small className="fr mt-2">{fromNow}</small>
            </span>
          </div>
        }
        {isArticle && <span className="pin-title">{pin.title}</span>}
        {isArticle && <hr />}
      </div>
    );
  }

  _renderPinFooter(pin) {
    const { author } = pin;
    return (
      <div className="pin-article-user">
        <span className="thumb-sm avatar pull-left mr-5">
          <img alt="pin" src={author.avatar || ''} />
        </span>
        <strong className="author-name pt-5">{author.name}</strong>
        <span className="text-muted text-xs">{author.username}</span>
      </div>
    );
  }

  _renderPinFooterIcons(pin) {
    return (
      <Row>
        <Col size="3" />
        <Col size="3" className="tar p-0">
          <i className="fa fa-share" />
          <span className="ml-10">3434</span>
        </Col>
        <Col size="3" className="tar p-0">
          <i className="fa fa-comments-o" />
          <span className="ml-10">3434</span>
        </Col>
        <Col size="3" className="tar p-0">
          <i className="fa fa-thumbs-o-up" />
          <span className="ml-10">{pin.thumbs}</span>
        </Col>
      </Row>
    );
  }

  render() {
    const { pin } = this.props;
    const isArticle = pin.type === 'article';
    return (
      <div className="pin">
        <section className="panel panel-default mb-20">
          <header className="panel-heading text-uc p-r">
            {this._renderPinHeader(pin, isArticle)}
          </header>
          <section className="panel-body">
            <span className="pin-image" onClick={() => this.onViewPinItem()}>
              <img alt="pin" src={pin.image_url} />
            </span>
          </section>
          <footer className="panel-footer">
            {isArticle && this._renderPinFooter(pin)}
            <div className="panel-footer-icon pt-20">
              {this._renderPinFooterIcons(pin)}
            </div>
          </footer>
        </section>
      </div>
    );
  }
}
