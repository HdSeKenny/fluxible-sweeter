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

  _renderPinHeader(pin) {
    const { author: author, created_at: created_at } = pin;
    const { image_url: image_url, firstName: firstName, lastName: lastName, username: username } = author;
    const fromNow = _utils.format.fromNow(created_at);
    return _react2.default.createElement(
      'div',
      { className: 'pin-header' },
      _react2.default.createElement(
        'div',
        { className: 'pin-moment-user', onClick: () => this.goToUserCenter(author) },
        _react2.default.createElement(
          'span',
          { className: 'user-img pull-left mr-10' },
          _react2.default.createElement('img', { alt: 'pin', src: image_url })
        ),
        _react2.default.createElement(
          'div',
          { className: 'author' },
          _react2.default.createElement(
            'span',
            { className: 'name' },
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

  _renderArticleRightContent(pin) {
    return _react2.default.createElement(
      'div',
      { className: 'pin-article-right' },
      _react2.default.createElement(
        'p',
        { className: 'pin-article-title' },
        pin.title
      ),
      _react2.default.createElement(
        'div',
        { className: '' },
        this._renderTextPin(pin)
      ),
      _react2.default.createElement(
        _Layout.Row,
        { className: '' },
        _react2.default.createElement(
          _Layout.Col,
          { size: '6', className: 'p-0 body-user' },
          this._renderPinFooter(pin)
        ),
        _react2.default.createElement(
          _Layout.Col,
          { size: '6', className: 'p-0 body-icons tar' },
          this._renderPinFooterIcons(pin)
        )
      )
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
        return _react2.default.createElement(
          _Layout.Row,
          { className: 'p-0' },
          _react2.default.createElement(_Layout.Col, { size: '4 p-0', className: 'pin-image', onClick: () => this.goToArticlePage(pin), style: imageStyle }),
          _react2.default.createElement(
            _Layout.Col,
            { size: '8 p-0', className: 'pl-15' },
            this._renderArticleRightContent(pin)
          )
        );
      } else {
        return this._renderArticleRightContent(pin);
      }
    } else {
      return this._renderTextPin(pin);
    }
  }

  _renderTextPin(pin) {
    const displayText = _utils.jsUtils.shorten(pin.text, 70);
    const { disabledClick: disabledClick } = this.props;
    return _react2.default.createElement(
      'div',
      { className: 'pin-body-text mt-5', onClick: () => this.pinTextActions(pin) },
      disabledClick ? _react2.default.createElement(
        'p',
        null,
        pin.text
      ) : _react2.default.createElement(
        'p',
        null,
        displayText
      )
    );
  }

  _renderPinFooter(pin) {
    const { author: author, created_at: created_at } = pin;
    const fromNow = _utils.format.fromNow(created_at);

    return _react2.default.createElement(
      'div',
      { className: 'pin-article-user', onClick: () => this.goToUserCenter(author) },
      _react2.default.createElement(
        'span',
        { className: 'user-img pull-left mr-10', 'data-balloon': 'Go user center!', 'data-balloon-pos': 'top' },
        _react2.default.createElement('img', { alt: 'pin', src: author.image_url })
      ),
      _react2.default.createElement(
        'div',
        { className: 'author' },
        _react2.default.createElement(
          'span',
          { className: 'name' },
          author.firstName,
          ' ',
          author.lastName
        )
      ),
      _react2.default.createElement(
        'p',
        { className: 'text-muted text-xs mt-5' },
        fromNow
      )
    );
  }

  _renderPinFooterIcons(pin) {
    const { currentUser: currentUser } = this.state;
    const { likers: likers, comments: comments } = pin;
    const isThumbedUp = currentUser ? likers.includes(currentUser.id_str) : false;
    const faThumbsIcon = isThumbedUp ? 'fa fa-thumbs-up' : 'fa fa-thumbs-o-up';
    const thumbsUpBallon = isThumbedUp ? 'cancel this?' : 'thumbs up!';
    return _react2.default.createElement(
      'div',
      { className: 'pin-footer-icons' },
      _react2.default.createElement(
        'div',
        {
          className: 'icon-span'
          // onClick={() => this.onViewPinItem()}
          , 'data-balloon': 'share!',
          'data-balloon-pos': 'top' },
        _react2.default.createElement('i', { className: 'fa fa-share-square-o' }),
        _react2.default.createElement(
          'span',
          { className: 'ml-5' },
          '3434'
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
    );
  }

  render() {
    const { pin: pin, specialClass: specialClass } = this.props;
    const isArticle = pin.type === 'article';

    return _react2.default.createElement(
      'div',
      { className: `pin ${specialClass}` },
      !isArticle && _react2.default.createElement(
        'div',
        { className: 'pin-heading text-uc p-0' },
        this._renderPinHeader(pin)
      ),
      _react2.default.createElement(
        'div',
        { className: 'pin-body p-0' },
        this._renderPinBody(pin, isArticle)
      ),
      !isArticle && _react2.default.createElement(
        'div',
        { className: 'pin-footer p-0 tal' },
        this._renderPinFooterIcons(pin)
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
  specialClass: _propTypes2.default.string
};
PinItem.statics = {
  storeListeners: [_stores.UserStore, _stores.BlogStore]
};
module.exports = exports['default'];
