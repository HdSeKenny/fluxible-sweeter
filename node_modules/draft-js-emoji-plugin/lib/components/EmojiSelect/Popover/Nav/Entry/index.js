'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Entry.__proto__ || Object.getPrototypeOf(Entry)).call.apply(_ref, [this].concat(args))), _this), _this.onMouseDown = function () {
      _this.mouseDown = true;
    }, _this.onMouseUp = function () {
      if (_this.mouseDown) {
        _this.mouseDown = false;
        _this.props.onGroupSelect(_this.props.groupIndex);
      }
    }, _this.mouseDown = false, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Entry, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$theme = _props.theme,
          theme = _props$theme === undefined ? {} : _props$theme,
          icon = _props.icon,
          isActive = _props.isActive;


      return _react2.default.createElement(
        'button',
        {
          className: isActive ? theme.emojiSelectPopoverNavEntryActive : theme.emojiSelectPopoverNavEntry,
          onMouseDown: this.onMouseDown,
          onMouseUp: this.onMouseUp
        },
        icon
      );
    }
  }]);

  return Entry;
}(_react.Component);

Entry.propTypes = {
  theme: _propTypes2.default.object.isRequired,
  icon: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string]).isRequired,
  groupIndex: _propTypes2.default.number.isRequired,
  isActive: _propTypes2.default.bool,
  onGroupSelect: _propTypes2.default.func.isRequired
};
Entry.defaultProps = {
  isActive: false
};
exports.default = Entry;