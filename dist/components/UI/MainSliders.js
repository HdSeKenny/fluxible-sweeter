'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModalsFactory = require('./ModalsFactory');

var _ModalsFactory2 = _interopRequireDefault(_ModalsFactory);

var _Layout = require('./Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _Pages = require('../Pages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MainSliders extends _react.Component {

  openLoginModal() {
    _ModalsFactory2.default.show('loginModal');
  }

  openSignupModal() {
    _ModalsFactory2.default.show('signupModal');
  }

  render() {
    return _react2.default.createElement(
      'section',
      { className: 'main-sliders tac' },
      _react2.default.createElement(
        'p',
        { className: 'welcome' },
        'Sweeter here, know what you want !'
      ),
      _react2.default.createElement(
        'div',
        { className: 'sliders-btns mt-15' },
        _react2.default.createElement(
          'button',
          { className: 'btn btn-default mr-10', onClick: this.openLoginModal },
          'Log in'
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-default', onClick: this.openSignupModal },
          'Signup'
        )
      )
    );
  }
}
exports.default = MainSliders;
module.exports = exports['default'];
