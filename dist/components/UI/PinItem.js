'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _utils = require('../../utils');

var _UI = require('../UI');

var _Layout = require('./Layout');

var _actions = require('../../actions');

var _stores = require('../../stores');

var _configs = require('../../configs');

var _Draft = require('../../plugins/Draft');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable all, camelcase */
var PinItem = function (_React$Component) {
  (0, _inherits3.default)(PinItem, _React$Component);

  function PinItem() {
    (0, _classCallCheck3.default)(this, PinItem);
    return (0, _possibleConstructorReturn3.default)(this, (PinItem.__proto__ || (0, _getPrototypeOf2.default)(PinItem)).apply(this, arguments));
  }

  (0, _createClass3.default)(PinItem, [{
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
        return _UI.Swal.warning('Login first !');
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
            )
          ),
          _react2.default.createElement(
            'p',
            { className: 'text-muted text-xs' },
            fromNow
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
        if (readMore) {
          return _react2.default.createElement(
            'p',
            { className: 'article' },
            pin.text
          );
        } else {
          return _react2.default.createElement(
            'p',
            { className: 'moment' },
            pin.tex
          );
        }
      } else if (pin.content) {
        return _react2.default.createElement(_Draft.SweetEditor, { contentText: pin.text });
      } else {
        return _react2.default.createElement(
          'p',
          { className: 'moment' },
          pin.text
        );
      }
    }
  }, {
    key: '_renderPinFooter',
    value: function _renderPinFooter(pin) {
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
        _react2.default.createElement(_Layout.Col, { size: '5 p-0' }),
        _react2.default.createElement(
          _Layout.Col,
          { size: '7 p-0 tar' },
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
      var rightSize = (showImage ? '8' : '12') + ' p-0 pin-right';
      return _react2.default.createElement(
        _Layout.Row,
        { className: 'p-0' },
        showImage && _react2.default.createElement(
          _Layout.Col,
          { size: '4 p-0 pr-15 pin-left' },
          this._renderPinitemImage(pin)
        ),
        _react2.default.createElement(
          _Layout.Col,
          { size: rightSize },
          _react2.default.createElement(
            _Layout.Row,
            { className: 'mb-5' },
            this._renderPinUserInfo(pin)
          ),
          _react2.default.createElement(
            _Layout.Row,
            { className: 'mb-10' },
            this._renderPinContent(pin, readMore)
          ),
          _react2.default.createElement(
            _Layout.Row,
            null,
            this._renderPinFooter(pin)
          )
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
        { className: pinStyle + ' mb-10' },
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