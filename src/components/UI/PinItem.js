import React, { Component } from 'react';
import { routerShape } from 'react-router';
import moment from 'moment';
import { Row, Col } from './Layout';

export default class PinItem extends Component {

  static displayName = 'PinItem';

  static contextTypes = {
    router: routerShape.isRequired
  };

  static propTypes = {
    pin: React.PropTypes.object,
    index: React.PropTypes.number,
    onSelect: React.PropTypes.func
  };

  onViewPinItem() {
    const { pin } = this.props;
    this.props.onSelect(pin.id_str);
  }

  componentDidMount() {

  }

  GoToUserCenter(author) {
    this.context.router.push(`/${author.username}/home`);
  }

  _renderPinHeader(pin) {
    const { author } = pin;
    const fromNow = moment(pin.created_at).fromNow();
    return (
      <div className="pin-header">
        <div className="pin-moment-user" onClick={() => this.GoToUserCenter(author)}>
          <span className="thumb-sm avatar pull-left mr-10">
            <img alt="pin" className="" src={author.image_url || ''} />
          </span>
          <strong className="author-name">
            {author.firstName} {author.lastName}
            <small className="from-now fr">{fromNow}</small>
          </strong>
          <p className="text-muted text-xs mt-5">
            {author.username}
          </p>
        </div>
      </div>
    );
  }

  _renderPinBody(pin, isArticle) {
    if (isArticle) {
      const imageUrls = pin.images;
      if (imageUrls && imageUrls.length) {
        const displayImgUrl = imageUrls[0];
        const imageStyle = {
          backgroundImage: `url(${displayImgUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          height: '100px'
        };
        return (
          <Row className="p-0">
            <Col size="4 p-0" className="pin-image" onClick={() => this.onViewPinItem()} style={imageStyle} />
            <Col size="8 p-0" className="pl-15">
              <Row className="">
                <span className="pin-article-title">{pin.title}</span>
              </Row>
              <Row className="">
                <Col size="5" className="p-0 pin-footer-user">
                  {this._renderPinFooter(pin)}
                </Col>
                <Col size="7" className="p-0 mt-53 tar">
                  {this._renderPinFooterIcons(pin)}
                </Col>
              </Row>
            </Col>
          </Row>
        );
      }
      else {
        return (
          <div className="">
            <div className="">
              <span className="pin-article-title">{pin.title}</span>
            </div>
            <Row className="">
              <Col size="5" className="p-0 pin-footer-user">
                {this._renderPinFooter(pin)}
              </Col>
              <Col size="7" className="p-0 mt-53 tar">
                {this._renderPinFooterIcons(pin)}
              </Col>
            </Row>
          </div>
        );
      }
    }
    else {
      return this._renderTextPin(pin);
    }
  }

  _renderTextPin(pin) {
    return (
      <div className="pin-body-text mt-10 mb-10" onClick={() => this.onViewPinItem()}>
        <p>{pin.text}</p>
      </div>
    );
  }

  _renderPinFooter(pin) {
    const { author } = pin;
    const fromNow = moment(pin.created_at).fromNow();

    return (
      <div className="pin-article-user" onClick={() => this.GoToUserCenter(author)}>
        <span className="thumb-sm avatar pull-left" data-balloon="Go user center!" data-balloon-pos="left">
          <img alt="pin" src={author.image_url} />
        </span>
        <strong className="author-name">{author.firstName} {author.lastName}</strong>
        <p className="text-muted text-xs">{fromNow}</p>
      </div>
    );
  }

  _renderPinFooterIcons(pin) {
    return (
      <div className="pin-footer-icons">
        <div className="icon-span" onClick={() => this.onViewPinItem()}>
          <i className="fa fa-share" />
          <span className="ml-5">3434</span>
        </div>
        <div className="icon-span" onClick={() => this.onViewPinItem()}>
          <i className="fa fa-comments-o" />
          <span className="ml-5">{pin.comments.length}</span>
        </div>
        <div
          className="icon-span"
          onClick={() => this.onViewPinItem()}
          data-balloon="thumbs up!"
          data-balloon-pos="top"
        >
          <i className="fa fa-thumbs-o-up" />
          <span className="ml-5">{pin.likers.length}</span>
        </div>
      </div>
    );
  }

  render() {
    const { pin } = this.props;
    const isArticle = pin.type === 'article';
    return (
      <div className="pin">
        <div className="panel panel-default">
          {!isArticle &&
            <div className="panel-heading text-uc p-0">
              {this._renderPinHeader(pin)}
            </div>
          }
          <div className="panel-body p-0">
            {this._renderPinBody(pin, isArticle)}
          </div>
          {!isArticle &&
            <div className="panel-footer p-0 tar">
              {this._renderPinFooterIcons(pin)}
            </div>
          }
        </div>
      </div>
    );
  }
}
