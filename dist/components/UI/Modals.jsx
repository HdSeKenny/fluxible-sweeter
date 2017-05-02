'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _ModalsFactory = require('./ModalsFactory');

var _ModalsFactory2 = _interopRequireDefault(_ModalsFactory);

var _Layout = require('./Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _Pages = require('../Pages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const shallowCompare = require('react-addons-shallow-compare');

class Modals extends _react.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return _react2.default.createElement(
      _Layout2.default.Page,
      null,
      _react2.default.createElement(_ModalsFactory2.default, { modalref: 'loginModal', title: 'Login to account', factory: _Pages.Login, size: 'modal-md' }),
      _react2.default.createElement(_ModalsFactory2.default, { modalref: 'signupModal', title: 'Sign up', factory: _Pages.signup, size: 'modal-md' }),
      _react2.default.createElement(_ModalsFactory2.default, { modalref: 'signupModal', title: 'Sign up', factory: _Pages.signup, size: 'modal-md' })
    );
  }
}
exports.default = Modals;

Modals.show = modalRef => {
  (0, _jquery2.default)(`#${modalRef}`).modal('show');
  (0, _jquery2.default)(`#${modalRef}`).find('.modal-dialog').css({ 'height': 'auto', 'max-height': '100%' });
};

Modals.hide = modalRef => {
  (0, _jquery2.default)(`#${modalRef}`).modal('hide');
};

module.exports = exports['default'];
