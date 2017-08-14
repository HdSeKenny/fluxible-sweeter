'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _addEmoji = require('../../../modifiers/addEmoji');

var _addEmoji2 = _interopRequireDefault(_addEmoji);

var _Groups = require('./Groups');

var _Groups2 = _interopRequireDefault(_Groups);

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _ToneSelect = require('./ToneSelect');

var _ToneSelect2 = _interopRequireDefault(_ToneSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popover = function (_Component) {
  _inherits(Popover, _Component);

  function Popover() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Popover);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Popover.__proto__ || Object.getPrototypeOf(Popover)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      activeGroup: 0,
      showToneSelect: false
    }, _this.onMouseDown = function () {
      _this.mouseDown = true;
    }, _this.onMouseUp = function () {
      _this.mouseDown = false;

      if (_this.activeEmoji) {
        _this.activeEmoji.deselect();
        _this.activeEmoji = null;

        if (_this.state.showToneSelect) {
          _this.closeToneSelect();
        } else if (_this.toneSelectTimer) {
          clearTimeout(_this.toneSelectTimer);
          _this.toneSelectTimer = null;
        }
      }
    }, _this.onWheel = function (e) {
      return e.preventDefault();
    }, _this.onEmojiSelect = function (emoji) {
      var newEditorState = (0, _addEmoji2.default)(_this.props.store.getEditorState(), emoji);
      _this.props.store.setEditorState(newEditorState);
    }, _this.onEmojiMouseDown = function (emojiEntry, toneSet) {
      _this.activeEmoji = emojiEntry;

      if (toneSet) {
        _this.openToneSelectWithTimer(toneSet);
      }
    }, _this.onGroupSelect = function (groupIndex) {
      _this.groups.scrollToGroup(groupIndex);
    }, _this.onGroupScroll = function (groupIndex) {
      if (groupIndex !== _this.state.activeGroup) {
        _this.setState({
          activeGroup: groupIndex
        });
      }
    }, _this.openToneSelectWithTimer = function (toneSet) {
      _this.toneSelectTimer = setTimeout(function () {
        _this.toneSelectTimer = null;
        _this.openToneSelect(toneSet);
      }, _this.props.toneSelectOpenDelay);
    }, _this.openToneSelect = function (toneSet) {
      _this.toneSet = toneSet;

      _this.setState({
        showToneSelect: true
      });
    }, _this.closeToneSelect = function () {
      _this.toneSet = [];

      _this.setState({
        showToneSelect: false
      });
    }, _this.checkMouseDown = function () {
      return _this.mouseDown;
    }, _this.mouseDown = false, _this.activeEmoji = null, _this.toneSet = [], _this.toneSelectTimer = null, _this.renderToneSelect = function () {
      if (_this.state.showToneSelect) {
        var _this$props = _this.props,
            cacheBustParam = _this$props.cacheBustParam,
            imagePath = _this$props.imagePath,
            imageType = _this$props.imageType,
            _this$props$theme = _this$props.theme,
            theme = _this$props$theme === undefined ? {} : _this$props$theme;


        var containerBounds = _this.container.getBoundingClientRect();
        var areaBounds = _this.groups.container.getBoundingClientRect();
        var entryBounds = _this.activeEmoji.button.getBoundingClientRect();
        // Translate TextRectangle coords to CSS relative coords
        var bounds = {
          areaBounds: {
            left: areaBounds.left - containerBounds.left,
            right: containerBounds.right - areaBounds.right,
            top: areaBounds.top - containerBounds.top,
            bottom: containerBounds.bottom - areaBounds.bottom,
            width: areaBounds.width,
            height: areaBounds.width
          },
          entryBounds: {
            left: entryBounds.left - containerBounds.left,
            right: containerBounds.right - entryBounds.right,
            top: entryBounds.top - containerBounds.top,
            bottom: containerBounds.bottom - entryBounds.bottom,
            width: entryBounds.width,
            height: entryBounds.width
          }
        };

        return _react2.default.createElement(_ToneSelect2.default, {
          theme: theme,
          bounds: bounds,
          toneSet: _this.toneSet,
          imagePath: imagePath,
          imageType: imageType,
          cacheBustParam: cacheBustParam,
          onEmojiSelect: _this.onEmojiSelect
        });
      }

      return null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Popover, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('mouseup', this.onMouseUp);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('mouseup', this.onMouseUp);
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
          _props$groups = _props.groups,
          groups = _props$groups === undefined ? [] : _props$groups,
          emojis = _props.emojis,
          _props$isOpen = _props.isOpen,
          isOpen = _props$isOpen === undefined ? false : _props$isOpen;

      var className = isOpen ? theme.emojiSelectPopover : theme.emojiSelectPopoverClosed;
      var activeGroup = this.state.activeGroup;


      return _react2.default.createElement(
        'div',
        {
          className: className,
          onMouseDown: this.onMouseDown,
          onWheel: this.onWheel,
          ref: function ref(element) {
            _this2.container = element;
          }
        },
        _react2.default.createElement(
          'h3',
          { className: theme.emojiSelectPopoverTitle },
          groups[activeGroup].title
        ),
        _react2.default.createElement(_Groups2.default, {
          theme: theme,
          groups: groups,
          emojis: emojis,
          imagePath: imagePath,
          imageType: imageType,
          cacheBustParam: cacheBustParam,
          checkMouseDown: this.checkMouseDown,
          onEmojiSelect: this.onEmojiSelect,
          onEmojiMouseDown: this.onEmojiMouseDown,
          onGroupScroll: this.onGroupScroll,
          ref: function ref(element) {
            _this2.groups = element;
          }
        }),
        _react2.default.createElement(_Nav2.default, {
          theme: theme,
          groups: groups,
          activeGroup: activeGroup,
          onGroupSelect: this.onGroupSelect
        }),
        this.renderToneSelect()
      );
    }
  }]);

  return Popover;
}(_react.Component);

Popover.propTypes = {
  cacheBustParam: _propTypes2.default.string.isRequired,
  imagePath: _propTypes2.default.string.isRequired,
  imageType: _propTypes2.default.string.isRequired,
  theme: _propTypes2.default.object.isRequired,
  store: _propTypes2.default.object.isRequired,
  groups: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  emojis: _propTypes2.default.object.isRequired,
  toneSelectOpenDelay: _propTypes2.default.number.isRequired,
  isOpen: _propTypes2.default.bool
};
Popover.defaultProps = {
  isOpen: false
};
exports.default = Popover;