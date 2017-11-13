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

var _reactSlick = require('react-slick');

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MainSliders = function (_React$Component) {
  (0, _inherits3.default)(MainSliders, _React$Component);

  function MainSliders(props) {
    (0, _classCallCheck3.default)(this, MainSliders);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MainSliders.__proto__ || (0, _getPrototypeOf2.default)(MainSliders)).call(this, props));

    _this.state = {
      sliderSettings: {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        // autoplaySpeed: 1000,
        fade: true,
        lazyLoad: true,
        arrows: false,
        adaptiveHeight: true
      },
      images: ['/images/sliders/reactjs.png', '/images/sliders/great-frontend.png', '/images/sliders/life.png']
    };
    return _this;
  }

  (0, _createClass3.default)(MainSliders, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ showSlider: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var show = this.props.show;
      var _state = this.state,
          sliderSettings = _state.sliderSettings,
          images = _state.images;


      if (!show || _utils.env.is_server) return _react2.default.createElement('div', null);
      return _react2.default.createElement(
        'div',
        { className: 'main-sliders mb-10' },
        this.state.showSlider && _react2.default.createElement(
          _reactSlick2.default,
          sliderSettings,
          images.map(function (image, index) {
            return _react2.default.createElement(
              'div',
              { key: index },
              _react2.default.createElement('img', { alt: 'slider-' + index, src: image })
            );
          })
        )
      );
    }
  }]);
  return MainSliders;
}(_react2.default.Component);

MainSliders.propTypes = {
  show: _propTypes2.default.bool
};
exports.default = MainSliders;
module.exports = exports['default'];