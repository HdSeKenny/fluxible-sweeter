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
          { className: 'thumb-sm avatar pull-left mr-10' },
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
          _react2.default.createElement(_Layout.Col, { size: '4 p-0', className: 'pin-image', onClick: () => this.onViewPinItem(), style: imageStyle }),
          _react2.default.createElement(
            _Layout.Col,
            { size: '8 p-0', className: 'pl-15' },
            _react2.default.createElement(
              _Layout.Row,
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
                { size: '5', className: 'p-0 pin-footer-user' },
                this._renderPinFooter(pin)
              ),
              _react2.default.createElement(
                _Layout.Col,
                { size: '7', className: 'p-0 mt-53 tar' },
                this._renderPinFooterIcons(pin)
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: '' },
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
            'div',
            { className: '' },
            this._renderTextPin(pin)
          ),
          _react2.default.createElement(
            _Layout.Row,
            { className: '' },
            _react2.default.createElement(
              _Layout.Col,
              { size: '5', className: 'p-0 body-user' },
              this._renderPinFooter(pin)
            ),
            _react2.default.createElement(
              _Layout.Col,
              { size: '7', className: 'p-0 body-icons tar' },
              this._renderPinFooterIcons(pin)
            )
          )
        );
      }
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
    const fromNow = (0, _moment2.default)(pin.created_at).fromNow();

    return _react2.default.createElement(
      'div',
      { className: 'pin-article-user', onClick: () => this.GoToUserCenter(author) },
      _react2.default.createElement(
        'span',
        { className: 'thumb-sm avatar pull-left', 'data-balloon': 'Go user center!', 'data-balloon-pos': 'left' },
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
        { className: 'text-muted text-xs' },
        fromNow
      )
    );
  }

  _renderPinFooterIcons(pin) {
    return _react2.default.createElement(
      'div',
      { className: 'pin-footer-icons' },
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
          pin.comments.length
        )
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'icon-span',
          onClick: () => this.onViewPinItem(),
          'data-balloon': 'thumbs up!',
          'data-balloon-pos': 'top'
        },
        _react2.default.createElement('i', { className: 'fa fa-thumbs-o-up' }),
        _react2.default.createElement(
          'span',
          { className: 'ml-5' },
          pin.likers.length
        )
      )
    );
  }

  render() {
    const { pin: pin } = this.props;
    const isArticle = pin.type === 'article';
    return _react2.default.createElement(
      'div',
      { className: 'pin' },
      _react2.default.createElement(
        'div',
        { className: 'panel panel-default' },
        !isArticle && _react2.default.createElement(
          'div',
          { className: 'panel-heading text-uc p-0' },
          this._renderPinHeader(pin)
        ),
        _react2.default.createElement(
          'div',
          { className: 'panel-body p-0' },
          this._renderPinBody(pin, isArticle)
        ),
        !isArticle && _react2.default.createElement(
          'div',
          { className: 'panel-footer p-0 tar' },
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
