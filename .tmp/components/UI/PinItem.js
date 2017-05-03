'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Layout = require('./Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PinItem extends _react.Component {

  onViewPinItem() {
    const { pin: pin } = this.props;
    this.props.onSelect(pin.id_str);
  }

  componentDidMount() {}

  GoToUserCenter(author) {
    this.context.router.push(`/${author.username}/home`);
  }

  _renderPinHeader(pin) {
    const { author: author } = pin;
    const fromNow = (0, _moment2.default)(pin.created_at).fromNow();
    return _react2.default.createElement(
      'div',
      { className: 'pin-header' },
      _react2.default.createElement(
        'div',
        { className: 'pin-moment-user', onClick: () => this.GoToUserCenter(author) },
        _react2.default.createElement(
          'span',
          { className: 'thumb-sm avatar pull-left mr-10', 'data-balloon': 'Go user center!', 'data-balloon-pos': 'left' },
          _react2.default.createElement('img', { alt: 'pin', className: '', src: author.image_url || '' })
        ),
        _react2.default.createElement(
          'strong',
          { className: 'author-name' },
          author.firstName,
          ' ',
          author.lastName,
          _react2.default.createElement(
            'small',
            { className: 'from-now fr' },
            fromNow
          )
        ),
        _react2.default.createElement(
          'p',
          { className: 'text-muted text-xs mt-5' },
          author.username
        )
      )
    );
  }

  _renderPinBody(pin, isArticle) {
    const imageStyle = {
      backgroundImage: `url(${pin.author.background_image_url})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      height: '100px'
    };
    if (isArticle) {
      const imagesUrl = pin.images_url;
      // if (imagesUrl && imagesUrl.length) {
      //   const displayImgUrl = imagesUrl[0];
      // const dimensions = sizeOf(pin.image_url);
      // console.log(dimensions.width, dimensions.height);
      return _react2.default.createElement(
        _Layout.Row,
        { className: 'p-0' },
        _react2.default.createElement(_Layout.Col, { size: '3', className: 'pin-image', onClick: () => this.onViewPinItem(), style: imageStyle }),
        _react2.default.createElement(
          _Layout.Col,
          { size: '9', className: 'pl-15' },
          _react2.default.createElement(
            'div',
            { className: '' },
            _react2.default.createElement(
              'span',
              { className: 'pin-article-title' },
              pin.title
            )
          ),
          _react2.default.createElement(
            _Layout.Row,
            { className: '' },
            _react2.default.createElement(
              _Layout.Col,
              { size: '4', className: 'p-0 pin-footer-user' },
              this._renderPinFooter(pin)
            ),
            _react2.default.createElement(
              _Layout.Col,
              { size: '8', className: 'p-0 mt-45' },
              this._renderPinFooterIcons(pin)
            )
          )
        )
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
    return _react2.default.createElement(
      'div',
      { className: 'pin-body-text mt-10 mb-10', onClick: () => this.onViewPinItem() },
      _react2.default.createElement(
        'p',
        null,
        pin.text
      )
    );
  }

  _renderPinFooter(pin) {
    const { author: author } = pin;
    return _react2.default.createElement(
      'div',
      { className: 'pin-article-user', onClick: () => this.GoToUserCenter(author) },
      _react2.default.createElement(
        'span',
        { className: 'thumb-sm avatar pull-left mr-5', 'data-balloon': 'Go user center!', 'data-balloon-pos': 'left' },
        _react2.default.createElement('img', { alt: 'pin', src: author.image_url })
      ),
      _react2.default.createElement(
        'strong',
        { className: 'author-name' },
        author.firstName,
        ' ',
        author.lastName
      ),
      _react2.default.createElement(
        'p',
        { className: 'text-muted text-xs mt-5' },
        author.username
      )
    );
  }

  _renderPinFooterIcons(pin) {
    return _react2.default.createElement(
      'div',
      { className: 'pin-footer-icons mb-5' },
      _react2.default.createElement(
        'div',
        { className: 'icon-span', onClick: () => this.onViewPinItem() },
        _react2.default.createElement('i', { className: 'fa fa-share' }),
        _react2.default.createElement(
          'span',
          { className: 'ml-5' },
          '3434'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'icon-span', onClick: () => this.onViewPinItem() },
        _react2.default.createElement('i', { className: 'fa fa-comments-o' }),
        _react2.default.createElement(
          'span',
          { className: 'ml-5' },
          '3434'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'icon-span', onClick: () => this.onViewPinItem() },
        _react2.default.createElement('i', { className: 'fa fa-thumbs-o-up' }),
        _react2.default.createElement(
          'span',
          { className: 'ml-5' },
          pin.thumbs
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
          { className: 'panel-heading text-uc p-0 mb-10' },
          !isArticle && this._renderPinHeader(pin)
        ),
        _react2.default.createElement(
          'section',
          { className: 'panel-body p-0' },
          this._renderPinBody(pin, isArticle)
        ),
        !isArticle && _react2.default.createElement(
          'footer',
          { className: 'panel-footer p-0 mt-15' },
          this._renderPinFooterIcons(pin)
        )
      )
    );
  }
}
exports.default = PinItem;
PinItem.displayName = 'PinItem';
PinItem.contextTypes = {
  router: _reactRouter.routerShape.isRequired
};
PinItem.propTypes = {
  pin: _react2.default.PropTypes.object,
  index: _react2.default.PropTypes.number,
  onSelect: _react2.default.PropTypes.func
};
module.exports = exports['default'];
