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
          <span className="thumb-sm avatar pull-left mr-10" data-balloon="Go user center!" data-balloon-pos="left">
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
    const imageStyle = {
      backgroundImage: `url(${pin.author.background_image_url})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      height: '100px',
      // width: '200px'
    };
    if (isArticle) {
      const imagesUrl = pin.images_url;
      // if (imagesUrl && imagesUrl.length) {
      //   const displayImgUrl = imagesUrl[0];
      // const dimensions = sizeOf(pin.image_url);
      // console.log(dimensions.width, dimensions.height);
        return (
          <Row className="p-0">
            <Col size="3" className="pin-image" onClick={() => this.onViewPinItem()} style={imageStyle}>
            </Col>
            <Col size="9" className="pl-15">
              <div className="">
                <span className="pin-article-title">{pin.title}</span>
              </div>
              <Row className="">
                <Col size="4" className="p-0 pin-footer-user">
                  {this._renderPinFooter(pin)}
                </Col>
                <Col size="8" className="p-0 mt-45">
                  {this._renderPinFooterIcons(pin)}
                </Col>
              </Row>
            </Col>
          </Row>
        );
      // }
      // else {
      //   return this._renderTextPin(pin);
      // }
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
    return (
      <div className="pin-article-user" onClick={() => this.GoToUserCenter(author)}>
        <span className="thumb-sm avatar pull-left mr-5" data-balloon="Go user center!" data-balloon-pos="left">
          <img alt="pin" src={author.image_url} />
        </span>
        <strong className="author-name">{author.firstName} {author.lastName}</strong>
        <p className="text-muted text-xs mt-5">{author.username}</p>
      </div>
    );
  }

  _renderPinFooterIcons(pin) {
    return (
      <div className="pin-footer-icons mb-5">
        <div className="icon-span" onClick={() => this.onViewPinItem()}>
          <i className="fa fa-share" />
          <span className="ml-5">3434</span>
        </div>
        <div className="icon-span" onClick={() => this.onViewPinItem()}>
          <i className="fa fa-comments-o" />
          <span className="ml-5">3434</span>
        </div>
        <div className="icon-span" onClick={() => this.onViewPinItem()}>
          <i className="fa fa-thumbs-o-up" />
          <span className="ml-5">{pin.thumbs}</span>
        </div>
      </div>
    );
  }

  render() {
    const { pin } = this.props;
    const isArticle = pin.type === 'article';
    return (
      <pin className="pin">
        <section className="panel panel-default mb-10">
          <header className="panel-heading text-uc p-0 mb-10">
            {!isArticle && this._renderPinHeader(pin)}
          </header>
          <section className="panel-body p-0">
            {this._renderPinBody(pin, isArticle)}
          </section>
          {!isArticle &&
            <footer className="panel-footer p-0 mt-15">
              {this._renderPinFooterIcons(pin)}
            </footer>
          }
        </section>
      </pin>
    );
  }
}
