'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _animations = require('../../utils/animations');

var _animations2 = _interopRequireDefault(_animations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MainSliders = function (_React$Component) {
  (0, _inherits3.default)(MainSliders, _React$Component);

  function MainSliders(props) {
    (0, _classCallCheck3.default)(this, MainSliders);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MainSliders.__proto__ || (0, _getPrototypeOf2.default)(MainSliders)).call(this, props));

    _this.state = {
      dataCustomout: 'x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0.75;scaleY:0.75;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;',
      dataImgCuromin: 'x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;',
      dataTextCustomin: 'x:0;y:0;z:0;rotationX:90;rotationY:0;rotationZ:0;scaleX:1;scaleY:1;skewX:0;skewY:0;opacity:0;transformPerspective:200;transformOrigin:50% 0%;',
      sliders: ['/images/sliders/font-end.png', '/images/sliders/reactjs.png', '/images/sliders/great-frontend.png', '/images/sliders/life.png']
    };
    return _this;
  }

  (0, _createClass3.default)(MainSliders, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.show) {
        _animations2.default.main_sliders(function () {
          var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(revol) {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return $('.tp-banner-container').removeClass('hidden');

                  case 2:
                    setTimeout((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                      var slidesliHeight;
                      return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return $('.tp-revslider-slidesli').height();

                            case 2:
                              slidesliHeight = _context.sent;

                              $('.main-sliders').height(slidesliHeight);
                              _this2.revol = revol;

                            case 5:
                            case 'end':
                              return _context.stop();
                          }
                        }
                      }, _callee, _this2);
                    })), 1500);

                  case 3:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this2);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
      }

      window.addEventListener('resize', function () {
        if (!$('.main-sliders').hasClass('loaded')) {
          $('.main-sliders').height('auto');
          $('.main-sliders').addClass('loaded');
        }
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // eslint-disable-next-line
      this.revol && this.revol.revkill(); // clear the animation
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          dataCustomout = _state.dataCustomout,
          dataImgCuromin = _state.dataImgCuromin,
          dataTextCustomin = _state.dataTextCustomin;
      var show = this.props.show;

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
                    'data-y': '80',
                    'data-voffset': '0',
                    'data-customin': dataImgCuromin,
                    'data-customout': dataCustomout,
                    'data-speed': '800',
                    'data-start': '700',
                    'data-easing': 'Power4.easeOut',
                    'data-endspeed': '800',
                    'data-endeasing': 'Power4.easeIn' },
                  _react2.default.createElement('img', { src: '/revolution/images/woman.png', alt: 'woman', 'data-ww': '230px', 'data-hh': '280px', 'data-no-retina': true })
                ),
                _react2.default.createElement(
                  'div',
                  {
                    className: 'tp-caption large_bold_white customin customout start',
                    'data-x': '400',
                    'data-hoffset': '0',
                    'data-y': '80',
                    'data-customin': dataTextCustomin,
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
                    'data-y': '160',
                    'data-customin': dataTextCustomin,
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
              _react2.default.createElement(
                'li',
                { 'data-transition': 'zoomout', 'data-slotamount': '7', 'data-masterspeed': '1500', className: 'main-sliders-li' },
                _react2.default.createElement('img', { src: '/revolution/images/darkblurbg.jpg', alt: '' }),
                _react2.default.createElement(
                  'div',
                  {
                    className: 'tp-caption customin',
                    'data-x': '495',
                    'data-y': '140',
                    'data-customin': dataImgCuromin,
                    'data-speed': '500',
                    'data-start': '500',
                    'data-easing': 'Power3.easeInOut',
                    'data-endspeed': '300' },
                  _react2.default.createElement('img', { src: '/revolution/images/nodejs_logo.png', alt: '', 'data-ww': '150px', 'data-hh': '150px' })
                ),
                _react2.default.createElement(
                  'div',
                  {
                    className: 'tp-caption customin',
                    'data-x': '745',
                    'data-y': '140',
                    'data-customin': dataImgCuromin,
                    'data-speed': '500',
                    'data-start': '1300',
                    'data-easing': 'Power3.easeInOut',
                    'data-endspeed': '300' },
                  _react2.default.createElement('img', { src: '/revolution/images/mongodb.png', alt: '', 'data-ww': '150px', 'data-hh': '150px' })
                ),
                _react2.default.createElement(
                  'div',
                  {
                    className: 'tp-caption customin',
                    'data-x': '185',
                    'data-y': '130',
                    'data-customin': dataImgCuromin,
                    'data-speed': '500', 'data-start': '1400', 'data-easing': 'Power3.easeInOut', 'data-endspeed': '300' },
                  _react2.default.createElement('img', { src: '/revolution/images/react.png', alt: '', 'data-ww': '250px', 'data-hh': '180px' })
                ),
                _react2.default.createElement(
                  'div',
                  {
                    className: 'tp-caption large_bold_white customin customout',
                    'data-x': '428',
                    'data-y': '34',
                    'data-customin': dataTextCustomin,
                    'data-customout': dataCustomout,
                    'data-speed': '600',
                    'data-start': '1100',
                    'data-easing': 'Back.easeOut',
                    'data-endspeed': '300',
                    'data-endeasing': 'Power1.easeIn' },
                  'Web'
                ),
                _react2.default.createElement(
                  'div',
                  {
                    className: 'tp-caption medium_bold_white customin customout',
                    'data-x': '580',
                    'data-y': '51',
                    'data-customin': dataTextCustomin,
                    'data-customout': dataCustomout,
                    'data-speed': '600',
                    'data-start': '1200',
                    'data-easing': 'Back.easeOut',
                    'data-endspeed': '300',
                    'data-endeasing': 'Power1.easeIn' },
                  'Technologies'
                ),
                _react2.default.createElement(
                  'div',
                  {
                    className: 'tp-caption medium_light_white customin customout',
                    'data-x': '250',
                    'data-y': '300',
                    'data-customin': dataTextCustomin,
                    'data-customout': dataCustomout,
                    'data-speed': '600',
                    'data-start': '1200',
                    'data-easing': 'Back.easeOut',
                    'data-endspeed': '300',
                    'data-endeasing': 'Power1.easeIn' },
                  'Reactjs'
                ),
                _react2.default.createElement(
                  'div',
                  {
                    className: 'tp-caption medium_light_white customin customout',
                    'data-x': '520',
                    'data-y': '300',
                    'data-customin': dataTextCustomin,
                    'data-customout': dataCustomout,
                    'data-speed': '600',
                    'data-start': '1200',
                    'data-easing': 'Back.easeOut',
                    'data-endspeed': '300',
                    'data-endeasing': 'Power1.easeIn' },
                  'Node.js'
                ),
                _react2.default.createElement(
                  'div',
                  {
                    className: 'tp-caption medium_light_white customin customout',
                    'data-x': '760',
                    'data-y': '300',
                    'data-customin': dataTextCustomin,
                    'data-customout': dataCustomout,
                    'data-speed': '600',
                    'data-start': '1200',
                    'data-easing': 'Back.easeOut',
                    'data-endspeed': '300',
                    'data-endeasing': 'Power1.easeIn' },
                  'MongoDB'
                )
              )
            )
          )
        )
      );
    }
  }]);
  return MainSliders;
}(_react2.default.Component); /* eslint-disable all, max-len*/

MainSliders.propTypes = {
  show: _propTypes2.default.bool
};
exports.default = MainSliders;
module.exports = exports['default'];