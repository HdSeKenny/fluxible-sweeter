import React, { Component } from 'react';
import { routerShape } from 'react-router';
import moment from 'moment';
import sweetAlert from '../../utils/sweetAlert';
import { Row, Col } from './Layout';
import { BlogActions } from '../../actions';
import { UserStore, BlogStore } from '../../stores';

export default class PinItem extends Component {

  static displayName = 'PinItem';

  static contextTypes = {
    router: routerShape.isRequired,
    executeAction: React.PropTypes.func
  };

  static propTypes = {
    pin: React.PropTypes.object,
    index: React.PropTypes.number,
    onSelect: React.PropTypes.func,
    currentUser: React.PropTypes.object
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

  onChange(res) {
    console.log(res);
  }


  componentDidMount() {

  }


  GoToUserCenter(author) {
    $('#pinModal').modal('hide');
    this.context.router.push(`/${author.username}/home`);
  }

  onViewPinItem() {
    const { pin } = this.props;
    this.props.onSelect(pin.id_str);
  }

  checkCurrentUser() {
    sweetAlert.alertWarningMessage('Login first !');
  }

  cancelThumbsUpBlog(currentUser, blogId) {
    if (currentUser) {
      this.context.executeAction(BlogActions.CancelThumbsUpBlog, {
        currentUserId: currentUser.id_str,
        blogId
      }).then((res) => {
        console.log(res);
      });
    }
    else {
      this.checkCurrentUser();
    }
  }

  thumbsUpBlog(currentUser, blogId) {
    if (currentUser) {
      this.context.executeAction(BlogActions.ThumbsUpBlog, {
        currentUserId: currentUser.id_str,
        blogId
      });
    }
    else {
      this.checkCurrentUser();
    }
  }

  _renderPinHeader(pin) {
    const { author } = pin;
    const fromNow = moment(pin.created_at).fromNow();
    return (
      <div className="pin-header">
        <div className="pin-moment-user" onClick={() => this.GoToUserCenter(author)}>
          <span className="user-img pull-left mr-10">
            <img alt="pin" className="" src={author.image_url || ''} />
          </span>
          <div className="author-name">
            {author.firstName} {author.lastName}
            <small className="from-now fr">{fromNow}</small>
          </div>
          <p className="text-muted text-xs mt-5">
            {author.username}
          </p>
        </div>
      </div>
    );
  }

  _renderArticleRightContent(pin) {
    return (
      <div className="pin-article-right">
        <p className="pin-article-title">{pin.title}</p>
        <div className="">
          {this._renderTextPin(pin)}
        </div>
        <Row className="">
          <Col size="5" className="p-0 body-user">
            {this._renderPinFooter(pin)}
          </Col>
          <Col size="7" className="p-0 body-icons tar">
            {this._renderPinFooterIcons(pin)}
          </Col>
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
            <Col size="4 p-0" className="pin-image" onClick={() => this.onViewPinItem()} style={imageStyle} />
            <Col size="8 p-0" className="pl-15">
              {this._renderArticleRightContent(pin)}
            </Col>
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
    return (
      <div className="pin-body-text mt-15" onClick={() => this.onViewPinItem()}>
        <p>{pin.text}</p>
      </div>
    );
  }

  _renderPinFooter(pin) {
    const { author } = pin;
    const fromNow = moment(pin.created_at).fromNow();

    return (
      <div className="pin-article-user" onClick={() => this.GoToUserCenter(author)}>
        <span className="user-img pull-left mr-10" data-balloon="Go user center!" data-balloon-pos="left">
          <img alt="pin" src={author.image_url} />
        </span>
        <div className="author-name">{author.firstName} {author.lastName}</div>
        <p className="text-muted text-xs mt-5">{fromNow}</p>
      </div>
    );
  }

  _renderPinFooterIcons(pin) {
    const { currentUser } = this.state;
    return (
      <div className="pin-footer-icons">
        <div className="icon-span" onClick={() => this.onViewPinItem()}>
          <i className="fa fa-share-square-o" />
          <span className="ml-5">3434</span>
        </div>
        <div className="icon-span" onClick={() => this.onViewPinItem()}>
          <i className="fa fa-comments-o" />
          <span className="ml-5">{pin.comments.length}</span>
        </div>
        <div className="icon-span" onClick={() => this.thumbsUpBlog(currentUser, pin.id_str)} data-balloon="thumbs up!" data-balloon-pos="top">
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
        {!isArticle &&
          <div className="pin-heading text-uc p-0">
            {this._renderPinHeader(pin)}
          </div>
        }
        <div className="pin-body p-0">
          {this._renderPinBody(pin, isArticle)}
        </div>
        {!isArticle &&
          <div className="pin-footer p-0 tar">
            {this._renderPinFooterIcons(pin)}
          </div>
        }
      </div>
    );
  }
}
