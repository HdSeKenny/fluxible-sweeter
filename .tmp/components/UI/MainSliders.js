'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _animations = require('../../utils/animations');

var _animations2 = _interopRequireDefault(_animations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MainSliders extends _react2.default.Component {

  constructor(props) {
    super(props);
    const dataCustominMap = {
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scaleX: 0.5,
      scaleY: 0.5,
      skewX: 0,
      skewY: 0,
      opacity: 0,
      transformPerspective: 0,
      transformOrigin: '50% 50%'
    };

    const dataCustomoutMap = {
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scaleX: 0.75,
      scaleY: 0.75,
      skewX: 0,
      skewY: 0,
      opacity: 0,
      transformPerspective: 600,
      transformOrigin: '50% 50%'
    };

    this.state = {
      dataCustomout: 'x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0.75;scaleY:0.75;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;',
      sliders: ['/styles/images/sliders/font-end.png', '/styles/images/sliders/reactjs.png', '/styles/images/sliders/great-frontend.png', '/styles/images/sliders/life.png']
    };
  }

  componentDidMount() {
    const { show: show } = this.props;
    if (show) {
      _animations2.default.main_sliders(() => {
        $('.tp-banner-container').removeClass('hidden');
      });
    }
  }

  render() {
    const { sliders: sliders, dataCustomout: dataCustomout } = this.state;
    const { show: show } = this.props;

    if (!show) return;

    return _react2.default.createElement(
      'div',
      { className: 'main-sliders' },
      _react2.default.createElement(
        'div',
        { className: 'tp-banner-container hidden' },
        _react2.default.createElement(
          'div',
          { className: 'tp-banner' },
          _react2.default.createElement('div', { className: 'tp-bannertimer' }),
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              { 'data-transition': 'fade', 'data-slotamount': '7', 'data-masterspeed': '700' },
              _react2.default.createElement(
                'div',
                {
                  className: 'tp-caption customin customout',
                  'data-x': '80',
                  'data-hoffset': '100',
                  'data-y': '110',
                  'data-voffset': '0',
                  'data-customin': 'x:50;y:150;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0.5;scaleY:0.5;skewX:0;skewY:0;opacity:0;transformPerspective:0;transformOrigin:50% 50%;',
                  'data-customout': dataCustomout,
                  'data-speed': '800',
                  'data-start': '700',
                  'data-easing': 'Power4.easeOut',
                  'data-endspeed': '800',
                  'data-endeasing': 'Power4.easeIn' },
                _react2.default.createElement('img', { src: '/assets/revolution/images/woman.png', alt: 'woman', 'data-ww': '230px', 'data-hh': '280px', 'data-no-retina': true })
              ),
              _react2.default.createElement(
                'div',
                {
                  className: 'tp-caption large_bold_white customin customout start',
                  'data-x': '400',
                  'data-hoffset': '0',
                  'data-y': '100',
                  'data-customin': 'x:0;y:0;z:0;rotationX:90;rotationY:0;rotationZ:0;scaleX:1;scaleY:1;skewX:0;skewY:0;opacity:0;transformPerspective:200;transformOrigin:50% 0%;',
                  'data-customout': dataCustomout,
                  'data-speed': '1000',
                  'data-start': '500',
                  'data-easing': 'Back.easeInOut',
                  'data-endspeed': '300' },
                'Sweeter Blog'
              ),
              _react2.default.createElement(
                'div',
                {
                  className: 'tp-caption medium_bold_white skewfromrightshort customin customout',
                  'data-x': '440',
                  'data-y': '180',
                  'data-customin': 'x:50;y:150;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0.5;scaleY:0.5;skewX:0;skewY:0;opacity:0;transformPerspective:0;transformOrigin:50% 50%;',
                  'data-customout': dataCustomout,
                  'data-speed': '3000',
                  'data-start': '1500',
                  'data-easing': 'Back.easeOut',
                  'data-endspeed': '3000',
                  'data-endeasing': 'Power4.easeIn',
                  'data-captionhidden': 'on' },
                'Developer: Kenny'
              )
            ),
            _react2.default.createElement('li', { 'data-transition': 'fade', 'data-slotamount': '7', 'data-masterspeed': '1500' })
          )
        )
      )
    );
  }
}
exports.default = MainSliders;
MainSliders.propTypes = {
  show: _propTypes2.default.bool
};
module.exports = exports['default'];
