'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

var _dom = require('../utils/dom');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

    //When the component mounts, listen to click events and check if we need to
    //Call the componentClickAway function.
    componentDidMount: function () {
        if (!this.manuallyBindClickAway) this._bindClickAway();
    },
    componentWillUnmount: function () {
        this._unbindClickAway();
    },
    _checkClickAway: function (event) {
        // workround for DIT-164
        if (!this.isMounted()) {
            return;
        }

        let el = _reactDom2.default.findDOMNode(this);

        // Check if the target is inside the current component
        if (event.target !== el && !_dom2.default.isDescendant(el, event.target) && document.documentElement.contains(event.target)) {
            if (this.componentClickAway) this.componentClickAway();
        }
    },
    _bindClickAway: function () {
        // On touch-enabled devices, both events fire, and the handler is called twice,
        // but it's fine since all operations for which the mixin is used
        // are idempotent.
        _events2.default.on(document, 'click', this._checkClickAway);
    },
    _unbindClickAway: function () {
        _events2.default.off(document, 'click', this._checkClickAway);
    }
};
