'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactCustomScrollbars = require('react-custom-scrollbars');

var _Group = require('./Group');

var _Group2 = _interopRequireDefault(_Group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Groups = function (_Component) {
  _inherits(Groups, _Component);

  function Groups() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Groups);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Groups.__proto__ || Object.getPrototypeOf(Groups)).call.apply(_ref, [this].concat(args))), _this), _this.onScroll = function (values) {
      var _this$props = _this.props,
          groups = _this$props.groups,
          onGroupScroll = _this$props.onGroupScroll;

      var activeGroup = 0;
      groups.forEach(function (group, index) {
        if (values.scrollTop >= group.top) {
          activeGroup = index;
        }
      });
      onGroupScroll(activeGroup);
    }, _this.onWheel = function (e) {
      // Disable page scroll, but enable groups scroll
      var _this$scrollbars$getV = _this.scrollbars.getValues(),
          clientHeight = _this$scrollbars$getV.clientHeight,
          scrollHeight = _this$scrollbars$getV.scrollHeight,
          scrollTop = _this$scrollbars$getV.scrollTop;

      if (e.deltaY > 0) {
        if (scrollTop < scrollHeight - clientHeight - e.deltaY) {
          e.stopPropagation();
        } else {
          _this.scrollbars.scrollToBottom();
        }
      } else {
        if (scrollTop > -e.deltaY) {
          // eslint-disable-line no-lonely-if
          e.stopPropagation();
        } else {
          _this.scrollbars.scrollTop();
        }
      }
    }, _this.scrollToGroup = function (groupIndex) {
      var groups = _this.props.groups;


      _this.scrollbars.scrollTop(groups[groupIndex].topList);
    }, _this.calculateBounds = function () {
      var _this$scrollbars$getV2 = _this.scrollbars.getValues(),
          scrollHeight = _this$scrollbars$getV2.scrollHeight,
          scrollTop = _this$scrollbars$getV2.scrollTop;

      if (scrollHeight) {
        var groups = _this.props.groups;

        var containerTop = _this.container.getBoundingClientRect().top - scrollTop;

        groups.forEach(function (group) {
          var groupTop = group.instance.container.getBoundingClientRect().top;
          var listTop = group.instance.list.getBoundingClientRect().top;
          group.top = groupTop - containerTop; // eslint-disable-line no-param-reassign
          group.topList = listTop - containerTop; // eslint-disable-line no-param-reassign
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Groups, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.calculateBounds();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.calculateBounds();
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
          checkMouseDown = _props.checkMouseDown,
          onEmojiSelect = _props.onEmojiSelect,
          onEmojiMouseDown = _props.onEmojiMouseDown;


      return _react2.default.createElement(
        'div',
        {
          className: theme.emojiSelectPopoverGroups,
          onWheel: this.onWheel,
          ref: function ref(element) {
            _this2.container = element;
          }
        },
        _react2.default.createElement(
          _reactCustomScrollbars.Scrollbars,
          {
            onScrollFrame: this.onScroll,
            renderTrackVertical: function renderTrackVertical() {
              return _react2.default.createElement('div', { className: theme.emojiSelectPopoverScrollbar });
            },
            renderThumbVertical: function renderThumbVertical(props) {
              return _react2.default.createElement('div', _extends({}, props, { className: theme.emojiSelectPopoverScrollbarThumb }));
            },
            ref: function ref(element) {
              _this2.scrollbars = element;
            }
          },
          groups.map(function (group, index) {
            return _react2.default.createElement(_Group2.default, {
              key: 'group#' + index + '[' + group.categories.join(',') + ']' // eslint-disable-line react/no-array-index-key
              ,
              theme: theme,
              group: group,
              emojis: emojis,
              imagePath: imagePath,
              imageType: imageType,
              cacheBustParam: cacheBustParam,
              checkMouseDown: checkMouseDown,
              onEmojiSelect: onEmojiSelect,
              onEmojiMouseDown: onEmojiMouseDown,
              ref: function ref(element) {
                group.instance = element; // eslint-disable-line no-param-reassign
              }
            });
          })
        )
      );
    }
  }]);

  return Groups;
}(_react.Component);

Groups.propTypes = {
  cacheBustParam: _propTypes2.default.string.isRequired,
  imagePath: _propTypes2.default.string.isRequired,
  imageType: _propTypes2.default.string.isRequired,
  theme: _propTypes2.default.object.isRequired,
  groups: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  emojis: _propTypes2.default.object.isRequired,
  checkMouseDown: _propTypes2.default.func.isRequired,
  onEmojiSelect: _propTypes2.default.func.isRequired,
  onEmojiMouseDown: _propTypes2.default.func.isRequired,
  onGroupScroll: _propTypes2.default.func.isRequired
};
exports.default = Groups;