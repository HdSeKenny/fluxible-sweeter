/* eslint-disable all, camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { routerShape } from 'react-router';
import { sweetAlert, format, jsUtils } from '../../utils';
import { Row, Col } from './Layout';
import { BlogActions } from '../../actions';
import { UserStore, BlogStore } from '../../stores';

export default class PinItem extends React.Component {

  static displayName = 'PinItem';

  static contextTypes = {
    router: routerShape.isRequired,
    executeAction: PropTypes.func
  };

  static propTypes = {
    pin: PropTypes.object,
    index: PropTypes.number,
    onSelect: PropTypes.func,
    currentUser: PropTypes.object,
    disabledClick: PropTypes.bool,
    specialClass: PropTypes.string
  };

  static statics = {
    storeListeners: [UserStore, BlogStore]
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser
    };
  }

  goToUserCenter(author) {
    $('#pinModal').modal('hide');
    this.context.router.push(`/${author.username}`);
  }

  goToArticlePage(pin) {
    this.context.router.push(`/${pin.id_str}/details`);
  }

  onViewPinItem() {
    const { pin } = this.props;
    this.props.onSelect(pin.id_str);
  }

  pinTextActions(pin) {
    const isMoment = pin.type !== 'article';
    if (this.props.disabledClick) {
      return;
    }

    if (isMoment) {
      this.onViewPinItem();
    }
    else {
      this.goToArticlePage(pin);
    }
  }

  checkCurrentUser() {
    sweetAlert.alertWarningMessage('Login first !');
  }

  cancelThumbsUpBlog(currentUserId, blogId) {
    this.context.executeAction(BlogActions.CancelThumbsUpBlog, { currentUserId, blogId });
  }

  thumbsUpBlog(currentUserId, blogId) {
    this.context.executeAction(BlogActions.ThumbsUpBlog, { currentUserId, blogId });
  }

  onAddAndCancelThumbs(currentUser, blog, isThumbedUp) {
    if (!currentUser) {
      this.checkCurrentUser();
      return;
    }
    if (isThumbedUp) {
      this.cancelThumbsUpBlog(currentUser.id_str, blog.id_str);
    }
    else {
      this.thumbsUpBlog(currentUser.id_str, blog.id_str);
    }
  }

  _renderPinHeader(pin) {
    const { author, created_at } = pin;
    const { image_url, firstName, lastName, username } = author;
    const fromNow = format.fromNow(created_at);
    return (
      <div className="pin-header">
        <div className="pin-moment-user" onClick={() => this.goToUserCenter(author)}>
          <span className="user-img pull-left mr-10"><img alt="pin" src={image_url} /></span>
          <div className="author">
            <span className="name">{firstName} {lastName}</span>
            <small className="from-now fr">{fromNow}</small>
          </div>
          <p className="text-muted text-xs mt-5">{username}</p>
        </div>
      </div>
    );
  }

  _renderArticleRightContent(pin) {
    return (
      <div className="pin-article-right">
        <p className="pin-article-title">{pin.title}</p>
        <div className="">{this._renderTextPin(pin)}</div>
        <Row className="">
          <Col size="6" className="p-0 body-user">{this._renderPinFooter(pin)}</Col>
          <Col size="6" className="p-0 body-icons tar">{this._renderPinFooterIcons(pin)}</Col>
        </Row>
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
            <Col size="4 p-0" className="pin-image" onClick={() => this.goToArticlePage(pin)} style={imageStyle} />
            <Col size="8 p-0" className="pl-15">{this._renderArticleRightContent(pin)}</Col>
          </Row>
        );
      }
      else {
        return this._renderArticleRightContent(pin);
      }
    }
    else {
      return this._renderTextPin(pin);
    }
  }

  _renderTextPin(pin) {
    const displayText = jsUtils.shorten(pin.text, 70);
    const { disabledClick } = this.props;
    return (
      <div className="pin-body-text mt-5" onClick={() => this.pinTextActions(pin)}>
        {disabledClick ? <p>{pin.text}</p> : <p>{displayText}</p>}
      </div>
    );
  }

  _renderPinFooter(pin) {
    const { author, created_at } = pin;
    const fromNow = format.fromNow(created_at);

    return (
      <div className="pin-article-user" onClick={() => this.goToUserCenter(author)}>
        <span className="user-img pull-left mr-10" data-balloon="Go user center!" data-balloon-pos="top">
          <img alt="pin" src={author.image_url} />
        </span>
        <div className="author">
          <span className="name">{author.firstName} {author.lastName}</span>
        </div>
        <p className="text-muted text-xs mt-5">{fromNow}</p>
      </div>
    );
  }

  _renderPinFooterIcons(pin) {
    const { currentUser } = this.state;
    const { likers, comments } = pin;
    const isThumbedUp = currentUser ? likers.includes(currentUser.id_str) : false;
    const faThumbsIcon = isThumbedUp ? 'fa fa-thumbs-up' : 'fa fa-thumbs-o-up';
    const thumbsUpBallon = isThumbedUp ? 'cancel this?' : 'thumbs up!';
    return (
      <div className="pin-footer-icons">
        <div
          className="icon-span"
          // onClick={() => this.onViewPinItem()}
          data-balloon="share!"
          data-balloon-pos="top">
          <i className="fa fa-share-square-o" />
          <span className="ml-5">3434</span>
        </div>
        <div
          className="icon-span"
          onClick={() => this.pinTextActions(pin)}
          data-balloon="add comment!"
          data-balloon-pos="top">
          <i className="fa fa-comments-o" />
          <span className="ml-5">{comments.length}</span>
        </div>
        <div
          className="icon-span"
          onClick={() => this.onAddAndCancelThumbs(currentUser, pin, isThumbedUp)}
          data-balloon={thumbsUpBallon}
          data-balloon-pos="top">
          <i className={faThumbsIcon} />
          <span className="ml-5">{likers.length}</span>
        </div>
      </div>
    );
  }

  render() {
    const { pin, specialClass } = this.props;
    const isArticle = pin.type === 'article';

    return (
      <div className={`pin ${specialClass}`}>
        {!isArticle && <div className="pin-heading text-uc p-0">{this._renderPinHeader(pin)}</div>}
        <div className="pin-body p-0">{this._renderPinBody(pin, isArticle)}</div>
        {!isArticle && <div className="pin-footer p-0 tal">{this._renderPinFooterIcons(pin)}</div>}
      </div>
    );
  }
}
