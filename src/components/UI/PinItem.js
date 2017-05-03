import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import moment from 'moment';
// import sizeOf from 'image-size';
// import { Row, Col } from './Layout';

export default class PinItem extends Component {

  static displayName = 'PinItem';

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

  _renderPinHeader(pin, isArticle) {
    const isMoment = pin.type === 'moment';
    const { author } = pin;
    const fromNow = moment(pin.created_at).fromNow();
    return (
      <div className="pin-header">
        {isMoment &&
          <div className="pin-moment">
            <span className="thumb-sm avatar pull-left mr-10">
              <img alt="pin" className="img-thumbnail p-0" src={author.image_url || ''} />
            </span>
            <strong className="author-name">
              {author.firstName} {author.lastName}
              <small className="from-now fr">{fromNow}</small>
            </strong>
            <span className="text-muted text-xs">
              {author.username}
            </span>
          </div>
        }
        {isArticle && <span className="pin-title">{pin.title}</span>}
      </div>
    );
  }

  _renderPinBody(pin, isArticle) {
    if (isArticle) {
      const imagesUrl = pin.images_url;
      // if (imagesUrl && imagesUrl.length) {
      //   const displayImgUrl = imagesUrl[0];
      // const dimensions = sizeOf(pin.image_url);
      // console.log(dimensions.width, dimensions.height);
        return (
          <span className="pin-image" onClick={() => this.onViewPinItem()}>
            <img alt="pin" src={pin.image_url} />
          </span>
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
      <div className="pin-body-text" onClick={() => this.onViewPinItem()}>
        <p>das dasd dasdadas  dasdadsa  dasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsa</p>
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
          <span className="ml-5">{pin.thumbs}dsadsa</span>
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
            {this._renderPinHeader(pin, isArticle)}
          </header>
          <section className="panel-body p-0 mb-15">
            {this._renderPinBody(pin, isArticle)}
          </section>
          <footer className="panel-footer p-0">
            {isArticle && this._renderPinFooter(pin)}
            {this._renderPinFooterIcons(pin)}
          </footer>
        </section>
      </pin>
    );
  }
}
