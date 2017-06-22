"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Loader extends _react2.default.Component {
  render() {
    return _react2.default.createElement(
      "div",
      { className: "loading" },
      _react2.default.createElement("div", { className: "loader" })
    );
  }
}
exports.default = Loader;
module.exports = exports["default"];
