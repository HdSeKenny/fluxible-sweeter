'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _utils = require('../../utils');

var _plugins = require('../../plugins');

var _Layout = require('./Layout');

var _actions = require('../../actions');

var _stores = require('../../stores');

var _configs = require('../../configs');

var _Draft = require('../../plugins/Draft');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable all, camelcase */


var PinItem = function (_React$Component) {
  _inherits(PinItem, _React$Component);

  function PinItem() {
    _classCallCheck(this, PinItem);

    return _possibleConstructorReturn(this, (PinItem.__proto__ || Object.getPrototypeOf(PinItem)).apply(this, arguments));
  }

  _createClass(PinItem, [{
    key: 'goToUserCenter',
    value: function goToUserCenter(author) {
      $('#pinModal').modal('hide');
      this.context.router.push('/' + author.username);
    }
  }, {
    key: 'goToArticlePage',
    value: function goToArticlePage(pin) {
      this.context.router.push('/' + pin.id_str + '/details');
    }
  }, {
    key: 'onViewPinItem',
    value: function onViewPinItem() {
      var pin = this.props.pin;

      this.props.onSelect(pin.id_str);
    }
  }, {
    key: 'pinTextActions',
    value: function pinTextActions(pin, disabled) {
      if (this.props.disabledClick || disabled) {
        return;
      }

      if (pin.type !== 'article') {
        this.onViewPinItem();
      } else {
        this.goToArticlePage(pin);
      }
    }
  }, {
    key: 'cancelThumbsUpBlog',
    value: function cancelThumbsUpBlog(currentUserId, blogId) {
      this.context.executeAction(_actions.BlogActions.CancelThumbsUpBlog, { currentUserId: currentUserId, blogId: blogId });
    }
  }, {
    key: 'thumbsUpBlog',
    value: function thumbsUpBlog(currentUserId, blogId) {
      this.context.executeAction(_actions.BlogActions.ThumbsUpBlog, { currentUserId: currentUserId, blogId: blogId });
    }
  }, {
    key: 'onAddAndCancelThumbs',
    value: function onAddAndCancelThumbs(currentUser, blog, isThumbedUp) {
      if (!currentUser) {
        return _plugins.swal.warning('Login first !');
      }
      if (isThumbedUp) {
        this.cancelThumbsUpBlog(currentUser.id_str, blog.id_str);
      } else {
        this.thumbsUpBlog(currentUser.id_str, blog.id_str);
      }
    }
  }, {
    key: 'preloadPintemImage',
    value: function preloadPintemImage(url) {
      // eslint-disable-next-line
      var newImage = new Image();
      newImage.src = url;
    }
  }, {
    key: 'onHoverPinUserImg',
    value: function onHoverPinUserImg(pin, hovered) {
      if (hovered) {
        $('#' + pin.id_str).stop().css('opacity', '1');
      } else {
        $('#' + pin.id_str).stop().css('opacity', '1');
        $('#' + pin.id_str).fadeIn();
      }
    }
  }, {
    key: 'onLeavePinUserImg',
    value: function onLeavePinUserImg(pin) {
      $('#' + pin.id_str).stop();
      $('#' + pin.id_str).fadeOut();
    }
  }, {
    key: '_renderPinitemImage',
    value: function _renderPinitemImage(pin) {
      var _this2 = this;

      var imageUrls = pin.images;
      var displayImgUrl = imageUrls[0];
      if (_utils.env.is_client) this.preloadPintemImage(displayImgUrl);
      return _react2.default.createElement(
        'div',
        { className: 'pin-image', onClick: function onClick() {
            return _this2.pinTextActions(pin);
          } },
        _react2.default.createElement('img', { src: displayImgUrl, alt: 'pin-bc' })
      );
    }
  }, {
    key: '_renderPinUserInfo',
    value: function _renderPinUserInfo(pin) {
      var _this3 = this;

      var author = pin.author,
          created_at = pin.created_at;
      var image_url = author.image_url,
          firstName = author.firstName,
          lastName = author.lastName,
          username = author.username;

      var fromNow = _utils.format.fromNow(created_at);
      return _react2.default.createElement(
        'div',
        { className: 'pin-header' },
        _react2.default.createElement(
          'div',
          { className: 'pin-moment-user' },
          _react2.default.createElement('div', {
            className: 'pin-user-card',
            id: pin.id_str,
            onMouseEnter: function onMouseEnter() {
              return _this3.onHoverPinUserImg(pin, true);
            },
            onMouseLeave: function onMouseLeave() {
              return _this3.onLeavePinUserImg(pin);
            } }),
          _react2.default.createElement(
            'a',
            { className: 'user-img pull-left mr-10', href: '/' + username, target: '_blank' },
            _react2.default.createElement('img', {
              className: 'pin-user-img',
              alt: 'pin',
              src: image_url,
              onMouseEnter: function onMouseEnter() {
                return _configs.params.showUserCard && _this3.onHoverPinUserImg(pin);
              },
              onMouseLeave: function onMouseLeave() {
                return _configs.params.showUserCard && _this3.onLeavePinUserImg(pin);
              }
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'author' },
            _react2.default.createElement(
              'span',
              { className: 'name', onClick: function onClick() {
                  return _this3.goToUserCenter(author);
                } },
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
  }, {
    key: '_renderPinContent',
    value: function _renderPinContent(pin, readMore) {
      var _this4 = this;

      var isArticle = pin.type === 'article';
      return _react2.default.createElement(
        'div',
        { className: 'pin-body-text mt-5', onClick: function onClick() {
            return _this4.pinTextActions(pin);
          } },
        isArticle && _react2.default.createElement(
          'h3',
          { className: 'pin-article-title m-0 mb-5' },
          pin.title
        ),
        this._renderDisplayNumberText(pin, readMore, isArticle)
      );
    }
  }, {
    key: '_renderDisplayNumberText',
    value: function _renderDisplayNumberText(pin, readMore, isArticle) {
      var display40Text = _utils.jsUtils.shorten(pin.text, 40);
      var display70Text = _utils.jsUtils.shorten(pin.text, 70);

      if (isArticle) {
        // if (readMore) {
        //   return <p className="article">{pin.text}</p>;
        // }
        // else {
        //   return <p className="moment">{pin.tex}</p>;
        // }
      } else if (readMore) {} else if (pin.content) {
        return _react2.default.createElement(_Draft.SweetEditor, { contentText: pin.text });
      } else {
        // return <p className="moment">{pin.text}</p>;
      }
    }
  }, {
    key: '_renderPinFooterIcons',
    value: function _renderPinFooterIcons(pin) {
      var _this5 = this;

      var currentUser = this.props.currentUser;
      var likers = pin.likers,
          comments = pin.comments;

      var isThumbedUp = currentUser ? likers.includes(currentUser.id_str) : false;
      var faThumbsIcon = isThumbedUp ? 'fa fa-thumbs-up' : 'fa fa-thumbs-o-up';
      var thumbsUpBallon = isThumbedUp ? 'cancel this?' : 'thumbs up!';
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
              onClick: function onClick() {
                return _this5.pinTextActions(pin);
              },
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
              onClick: function onClick() {
                return _this5.onAddAndCancelThumbs(currentUser, pin, isThumbedUp);
              },
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
  }, {
    key: '_renderPinitemContent',
    value: function _renderPinitemContent(pin, showImage, readMore) {
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
          this._renderPinContent(pin, readMore)
        ),
        _react2.default.createElement(
          _Layout.Row,
          { className: '' },
          this._renderPinFooterIcons(pin)
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          pin = _props.pin,
          showImage = _props.showImage,
          specialClass = _props.specialClass,
          readMore = _props.readMore;

      var pinStyle = specialClass ? 'pin ' + specialClass + ' ' + pin.type : 'pin ' + pin.type;
      return _react2.default.createElement(
        'div',
        { className: '' + pinStyle + (readMore ? ' mb-20' : ' mb-10') },
        _react2.default.createElement(
          'div',
          { className: 'pin-body p-0' },
          this._renderPinitemContent(pin, showImage, readMore)
        )
      );
    }
  }]);

  return PinItem;
}(_react2.default.Component);

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
exports.default = PinItem;
module.exports = exports['default'];