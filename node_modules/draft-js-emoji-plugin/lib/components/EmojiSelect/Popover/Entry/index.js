'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _emojione = require('emojione');

var _emojione2 = _interopRequireDefault(_emojione);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = function (_Component) {
  _inherits(Entry, _Component);

  function Entry() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Entry);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Entry.__proto__ || Object.getPrototypeOf(Entry)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isFocused: false
    }, _this.onMouseUp = function () {
      if (_this.mouseDown) {
        _this.mouseDown = false;
        _this.props.onEmojiSelect(_this.props.emoji);
      }
    }, _this.onMouseDown = function () {
      _this.mouseDown = true;
      _this.props.onEmojiMouseDown(_this, _this.props.toneSet);
    }, _this.onMouseEnter = function () {
      if (!_this.props.checkMouseDown()) {
        _this.setState({ isFocused: true });
      }
    }, _this.onMouseLeave = function () {
      if (!_this.props.checkMouseDown()) {
        _this.setState({ isFocused: false });
      }
    }, _this.deselect = function () {
      _this.setState({ isFocused: false });
    }, _this.mouseDown = _this.props.mouseDown, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Entry, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          cacheBustParam = _props.cacheBustParam,
          imagePath = _props.imagePath,
          imageType = _props.imageType,
          _props$theme = _props.theme,
          theme = _props$theme === undefined ? {} : _props$theme,
          emoji = _props.emoji;
      // short name to image url code steal from emojione source code

      var shortNameForImage = _emojione2.default.emojioneList[emoji].unicode[_emojione2.default.emojioneList[emoji].unicode.length - 1];
      var fullImagePath = '' + imagePath + shortNameForImage + '.' + imageType + cacheBustParam;
      var isFocused = this.state.isFocused;


      return _react2.default.createElement(
        'button',
        {
          className: isFocused ? theme.emojiSelectPopoverEntryFocused : theme.emojiSelectPopoverEntry,
          onMouseDown: this.onMouseDown,
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave,
          onMouseUp: this.onMouseUp,
          ref: function ref(element) {
            _this2.button = element;
          }
        },
        _react2.default.createElement('img', {
          src: fullImagePath,
          className: theme.emojiSelectPopoverEntryIcon,
          draggable: false,
          role: 'presentation'
        })
      );
    }
  }]);

  return Entry;
}(_react.Component);

Entry.propTypes = {
  cacheBustParam: _propTypes2.default.string.isRequired,
  imagePath: _propTypes2.default.string.isRequired,
  imageType: _propTypes2.default.string.isRequired,
  theme: _propTypes2.default.object.isRequired,
  emoji: _propTypes2.default.string.isRequired,
  mouseDown: _propTypes2.default.bool,
  checkMouseDown: _propTypes2.default.func.isRequired,
  onEmojiSelect: _propTypes2.default.func.isRequired,
  onEmojiMouseDown: _propTypes2.default.func
};
Entry.defaultProps = {
  mouseDown: false
};
exports.default = Entry;