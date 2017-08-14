'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _toStyle = require('to-style');

var _toStyle2 = _interopRequireDefault(_toStyle);

var _Entry = require('../Entry');

var _Entry2 = _interopRequireDefault(_Entry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToneSelect = function (_Component) {
  _inherits(ToneSelect, _Component);

  function ToneSelect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ToneSelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ToneSelect.__proto__ || Object.getPrototypeOf(ToneSelect)).call.apply(_ref, [this].concat(args))), _this), _this.setCorrectPosition = function (areaBounds, entryBounds) {
      var width = _this.tones.offsetWidth;
      var height = _this.tones.offsetHeight;

      var style = {
        marginLeft: 0,
        left: entryBounds.left + entryBounds.width / 2 - width / 2, // eslint-disable-line no-mixed-operators
        bottom: entryBounds.bottom + entryBounds.height
      };

      if (style.left < areaBounds.left) {
        delete style.marginLeft;
        style.left = areaBounds.left;
      } else if (style.left > areaBounds.left + areaBounds.width - width) {
        // eslint-disable-line no-mixed-operators
        delete style.marginLeft;
        delete style.left;
        style.right = areaBounds.right;
      }

      if (style.bottom > areaBounds.bottom + areaBounds.height - height) {
        // eslint-disable-line no-mixed-operators
        delete style.bottom;
        style.top = entryBounds.top + entryBounds.height;
      }

      style = _toStyle2.default.object(style);

      Object.keys(style).forEach(function (property) {
        _this.tones.style[property] = style[property];
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ToneSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props$bounds = this.props.bounds,
          areaBounds = _props$bounds.areaBounds,
          entryBounds = _props$bounds.entryBounds;


      this.setCorrectPosition(areaBounds, entryBounds);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          cacheBustParam = _props.cacheBustParam,
          imagePath = _props.imagePath,
          imageType = _props.imageType,
          _props$theme = _props.theme,
          theme = _props$theme === undefined ? {} : _props$theme,
          _props$toneSet = _props.toneSet,
          toneSet = _props$toneSet === undefined ? [] : _props$toneSet,
          onEmojiSelect = _props.onEmojiSelect;


      return _react2.default.createElement(
        'div',
        { className: theme.emojiSelectPopoverToneSelect },
        _react2.default.createElement(
          'ul',
          {
            className: theme.emojiSelectPopoverToneSelectList,
            ref: function ref(element) {
              _this2.tones = element;
            }
          },
          toneSet.map(function (emoji) {
            return _react2.default.createElement(
              'li',
              {
                key: 'tone-select(' + emoji + ')',
                className: theme.emojiSelectPopoverToneSelectItem
              },
              _react2.default.createElement(_Entry2.default, {
                emoji: emoji,
                theme: theme,
                imagePath: imagePath,
                imageType: imageType,
                cacheBustParam: cacheBustParam,
                checkMouseDown: function checkMouseDown() {
                  return false;
                },
                onEmojiSelect: onEmojiSelect,
                mouseDown: true
              })
            );
          })
        )
      );
    }
  }]);

  return ToneSelect;
}(_react.Component);

ToneSelect.propTypes = {
  cacheBustParam: _propTypes2.default.string.isRequired,
  imagePath: _propTypes2.default.string.isRequired,
  imageType: _propTypes2.default.string.isRequired,
  theme: _propTypes2.default.object.isRequired,
  bounds: _propTypes2.default.shape({
    areaBounds: _propTypes2.default.shape({
      left: _propTypes2.default.number.isRequired,
      right: _propTypes2.default.number.isRequired,
      top: _propTypes2.default.number.isRequired,
      bottom: _propTypes2.default.number.isRequired,
      width: _propTypes2.default.number.isRequired,
      height: _propTypes2.default.number.isRequired
    }).isRequired,
    entryBounds: _propTypes2.default.shape({
      left: _propTypes2.default.number.isRequired,
      right: _propTypes2.default.number.isRequired,
      top: _propTypes2.default.number.isRequired,
      bottom: _propTypes2.default.number.isRequired,
      width: _propTypes2.default.number.isRequired,
      height: _propTypes2.default.number.isRequired
    }).isRequired
  }).isRequired,
  onEmojiSelect: _propTypes2.default.func.isRequired
};
exports.default = ToneSelect;