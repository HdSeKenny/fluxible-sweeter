'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _utils = require('../../utils');

var _Layout = require('./Layout');

var _actions = require('../../actions');

var _stores = require('../../stores');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PinItem extends _react2.default.Component {

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
    const { pin: pin } = this.props;
    this.props.onSelect(pin.id_str);
  }

  pinTextActions(pin) {
    const isMoment = pin.type !== 'article';
    if (this.props.disabledClick) {
      return;
    }

    if (isMoment) {
      this.onViewPinItem();
    } else {
      this.goToArticlePage(pin);
    }
  }

  checkCurrentUser() {
    _utils.sweetAlert.alertWarningMessage('Login first !');
  }

  cancelThumbsUpBlog(currentUserId, blogId) {
    this.context.executeAction(_actions.BlogActions.CancelThumbsUpBlog, { currentUserId: currentUserId, blogId: blogId });
  }

  thumbsUpBlog(currentUserId, blogId) {
    this.context.executeAction(_actions.BlogActions.ThumbsUpBlog, { currentUserId: currentUserId, blogId: blogId });
  }

  onAddAndCancelThumbs(currentUser, blog, isThumbedUp) {
    if (!currentUser) {
      this.checkCurrentUser();
      return;
    }
    if (isThumbedUp) {
      this.cancelThumbsUpBlog(currentUser.id_str, blog.id_str);
    } else {
      this.thumbsUpBlog(currentUser.id_str, blog.id_str);
    }
  }

  preloadPintemImage(url) {
    // eslint-disable-next-line
    const newImage = new Image();
    newImage.src = url;
  }

  _renderPinitemImage(pin) {
    const imageUrls = pin.images;
    const displayImgUrl = imageUrls[0];
    if (_utils.env.is_client) this.preloadPintemImage(displayImgUrl);
    return _react2.default.createElement(
      'div',
      { className: 'pin-image', onClick: () => this.pinTextActions(pin) },
      _react2.default.createElement('img', { src: displayImgUrl, alt: 'pin-bc' })
    );
  }

  _renderPinUserInfo(pin) {
    const { author: author, created_at: created_at } = pin;
    const { image_url: image_url, firstName: firstName, lastName: lastName, username: username } = author;
    const fromNow = _utils.format.fromNow(created_at);
    return _react2.default.createElement(
      'div',
      { className: 'pin-header' },
      _react2.default.createElement(
        'div',
        { className: 'pin-moment-user' },
        _react2.default.createElement(
          'span',
          { className: 'user-img pull-left mr-10', onClick: () => this.goToUserCenter(author) },
          _react2.default.createElement('img', { alt: 'pin', src: image_url })
        ),
        _react2.default.createElement(
          'div',
          { className: 'author' },
          _react2.default.createElement(
            'span',
            { className: 'name', onClick: () => this.goToUserCenter(author) },
            firstName,
            ' ',
            lastName
          ),
          _react2.default.createElement(
            'small',
            { className: 'from-now fr' },
            fromNow
          )
        ),
        _react2.default.createElement(
          'p',
          { className: 'text-muted text-xs mt-5' },
          username
        )
      )
    );
  }

  _renderTextPin(pin, readMore) {
    const isArticle = pin.type === 'article';
    return _react2.default.createElement(
      'div',
      { className: 'pin-body-text mt-5', onClick: () => this.pinTextActions(pin) },
      isArticle && _react2.default.createElement(
        'h3',
        { className: 'pin-article-title m-0 mb-5' },
        pin.title
      ),
      this._renderDisplayNumberText(pin, readMore, isArticle)
    );
  }

  _renderDisplayNumberText(pin, readMore, isArticle) {
    const display40Text = _utils.jsUtils.shorten(pin.text, 40);
    const display70Text = _utils.jsUtils.shorten(pin.text, 70);
    if (isArticle) {
      if (readMore) {
        return _react2.default.createElement(
          'p',
          { className: 'article' },
          display40Text
        );
      } else {
        return _react2.default.createElement(
          'p',
          { className: 'moment' },
          display70Text
        );
      }
    } else if (readMore) {
      return _react2.default.createElement(
        'p',
        { className: 'moment' },
        display70Text
      );
    } else {
      return _react2.default.createElement(
        'p',
        { className: 'moment' },
        pin.text
      );
    }
  }

  _renderPinFooterIcons(pin) {
    const { currentUser: currentUser } = this.state;
    const { likers: likers, comments: comments } = pin;
    const isThumbedUp = currentUser ? likers.includes(currentUser.id_str) : false;
    const faThumbsIcon = isThumbedUp ? 'fa fa-thumbs-up' : 'fa fa-thumbs-o-up';
    const thumbsUpBallon = isThumbedUp ? 'cancel this?' : 'thumbs up!';
    return _react2.default.createElement(
      _Layout.Row,
      { className: 'pin-footer-icons' },
      _react2.default.createElement(_Layout.Col, { size: '3 p-0' }),
      _react2.default.createElement(
        _Layout.Col,
        { size: '9 p-0 tar' },
        _react2.default.createElement(
          'div',
          {
            className: 'icon-span',
            'data-balloon': 'share!',
            'data-balloon-pos': 'top' },
          _react2.default.createElement('i', { className: 'fa fa-share-square-o' }),
          _react2.default.createElement(
            'span',
            { className: 'ml-5' },
            '0'
          )
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'icon-span',
            onClick: () => this.pinTextActions(pin),
            'data-balloon': 'add comment!',
            'data-balloon-pos': 'top' },
          _react2.default.createElement('i', { className: 'fa fa-comments-o' }),
          _react2.default.createElement(
            'span',
            { className: 'ml-5' },
            comments.length
          )
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'icon-span',
            onClick: () => this.onAddAndCancelThumbs(currentUser, pin, isThumbedUp),
            'data-balloon': thumbsUpBallon,
            'data-balloon-pos': 'top' },
          _react2.default.createElement('i', { className: faThumbsIcon }),
          _react2.default.createElement(
            'span',
            { className: 'ml-5' },
            likers.length
          )
        )
      )
    );
  }

  _renderPinitemContent(pin, showImage, readMore) {
    return _react2.default.createElement(
      'div',
      { className: '' },
      showImage && _react2.default.createElement(
        _Layout.Row,
        { className: 'mb-15' },
        this._renderPinitemImage(pin)
      ),
      _react2.default.createElement(
        _Layout.Row,
        { className: 'mb-10' },
        this._renderPinUserInfo(pin)
      ),
      _react2.default.createElement(
        _Layout.Row,
        { className: 'mb-10' },
        this._renderTextPin(pin, readMore)
      ),
      _react2.default.createElement(
        _Layout.Row,
        { className: '' },
        this._renderPinFooterIcons(pin)
      )
    );
  }

  render() {
    const { pin: pin, showImage: showImage, specialClass: specialClass, readMore: readMore } = this.props;
    const pinStyle = specialClass ? `pin ${specialClass}` : 'pin';
    return _react2.default.createElement(
      'div',
      { className: `${pinStyle}${readMore ? ' mb-20' : ' mb-10'}` },
      _react2.default.createElement(
        'div',
        { className: 'pin-body p-0' },
        this._renderPinitemContent(pin, showImage, readMore)
      )
    );
  }
}
exports.default = PinItem; /* eslint-disable all, camelcase */

PinItem.displayName = 'PinItem';
PinItem.contextTypes = {
  router: _reactRouter.routerShape.isRequired,
  executeAction: _propTypes2.default.func
};
PinItem.propTypes = {
  pin: _propTypes2.default.object,
  index: _propTypes2.default.number,
  onSelect: _propTypes2.default.func,
  currentUser: _propTypes2.default.object,
  disabledClick: _propTypes2.default.bool,
  specialClass: _propTypes2.default.string,
  showImage: _propTypes2.default.bool,
  readMore: _propTypes2.default.bool
};
PinItem.statics = {
  storeListeners: [_stores.UserStore, _stores.BlogStore]
};
module.exports = exports['default'];
