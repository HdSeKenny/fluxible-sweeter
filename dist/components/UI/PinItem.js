'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Layout = require('./Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PinItem extends _react.Component {

  onViewPinItem() {
    const { pin: pin } = this.props;
    this.props.onSelect(pin._id);
  }

  componentDidMount() {}

  _renderPinHeader(pin, isArticle) {
    const isMoment = pin.type === 'moment';
    const { author: author } = pin;
    const fromNow = (0, _moment2.default)(pin.dateCreated).fromNow();
    return _react2.default.createElement(
      'div',
      { className: 'pin-header' },
      isMoment && _react2.default.createElement(
        'div',
        { className: 'pin-moment' },
        _react2.default.createElement(
          'span',
          { className: 'thumb-sm avatar pull-left mr-5' },
          _react2.default.createElement('img', { alt: 'pin', src: author.avatar || '' })
        ),
        _react2.default.createElement(
          'strong',
          { className: 'author-name' },
          author.name,
          ' ',
          _react2.default.createElement(
            'small',
            { className: 'from-now fr' },
            fromNow
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'text-muted text-xs' },
          author.username
        )
      ),
      isArticle && _react2.default.createElement(
        'span',
        { className: 'pin-title' },
        pin.title
      ),
      isArticle && _react2.default.createElement('hr', null)
    );
  }

  _renderPinBody(pin, isArticle) {
    if (isArticle) {
      const imagesUrl = pin.images_url;
      // if (imagesUrl && imagesUrl.length) {
      //   const displayImgUrl = imagesUrl[0];
      // const dimensions = sizeOf(pin.image_url);
      // console.log(dimensions.width, dimensions.height);
      return _react2.default.createElement(
        'span',
        { className: 'pin-image', onClick: () => this.onViewPinItem() },
        _react2.default.createElement('img', { alt: 'pin', src: pin.image_url })
      );
      // }
      // else {
      //   return this._renderTextPin(pin);
      // }
    } else {
      return this._renderTextPin(pin);
    }
  }

  _renderTextPin(pin) {
    return _react2.default.createElement('div', null);
  }

  _renderPinFooter(pin) {
    const { author: author } = pin;
    return _react2.default.createElement(
      'div',
      { className: 'pin-article-user' },
      _react2.default.createElement(
        'span',
        { className: 'thumb-sm avatar pull-left mr-5' },
        _react2.default.createElement('img', { alt: 'pin', src: author.avatar || '' })
      ),
      _react2.default.createElement(
        'strong',
        { className: 'author-name pt-5' },
        author.name
      ),
      _react2.default.createElement(
        'span',
        { className: 'text-muted text-xs' },
        author.username
      )
    );
  }

  _renderPinFooterIcons(pin) {
    return _react2.default.createElement(
      'div',
      { className: 'pin-footer-icons' },
      _react2.default.createElement(
        'div',
        { className: 'icon-span' },
        _react2.default.createElement('i', { className: 'fa fa-share' }),
        _react2.default.createElement(
          'span',
          { className: 'ml-5' },
          '3434'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'icon-span' },
        _react2.default.createElement('i', { className: 'fa fa-comments-o' }),
        _react2.default.createElement(
          'span',
          { className: 'ml-5' },
          '3434'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'icon-span' },
        _react2.default.createElement('i', { className: 'fa fa-thumbs-o-up' }),
        _react2.default.createElement(
          'span',
          { className: 'ml-5' },
          pin.thumbs,
          'dsadsa'
        )
      )
    );
  }

  render() {
    const { pin: pin } = this.props;
    const isArticle = pin.type === 'article';
    return _react2.default.createElement(
      'pin',
      { className: 'pin' },
      _react2.default.createElement(
        'section',
        { className: 'panel panel-default mb-10' },
        _react2.default.createElement(
          'header',
          { className: 'panel-heading text-uc p-0 mb-15' },
          this._renderPinHeader(pin, isArticle)
        ),
        _react2.default.createElement(
          'section',
          { className: 'panel-body p-0 mb-15' },
          this._renderPinBody(pin, isArticle)
        ),
        _react2.default.createElement(
          'footer',
          { className: 'panel-footer p-0' },
          isArticle && this._renderPinFooter(pin),
          this._renderPinFooterIcons(pin)
        )
      )
    );
  }
}
exports.default = PinItem;
// import sizeOf from 'image-size';

PinItem.displayName = 'PinItem';
PinItem.propTypes = {
  pin: _react2.default.PropTypes.object,
  index: _react2.default.PropTypes.number,
  onSelect: _react2.default.PropTypes.func
};
module.exports = exports['default'];
