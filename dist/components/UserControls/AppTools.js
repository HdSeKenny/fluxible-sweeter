"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppTools = function (_React$Component) {
  (0, _inherits3.default)(AppTools, _React$Component);

  function AppTools() {
    (0, _classCallCheck3.default)(this, AppTools);
    return (0, _possibleConstructorReturn3.default)(this, (AppTools.__proto__ || (0, _getPrototypeOf2.default)(AppTools)).apply(this, arguments));
  }

  (0, _createClass3.default)(AppTools, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "app-tools" },
        _react2.default.createElement(
          "span",
          { id: "return-to-top" },
          _react2.default.createElement("i", { className: "fa fa-arrow-up" })
        )
      );
    }
  }]);
  return AppTools;
}(_react2.default.Component);

AppTools.displayName = "AppTools";
exports.default = AppTools;
module.exports = exports["default"];