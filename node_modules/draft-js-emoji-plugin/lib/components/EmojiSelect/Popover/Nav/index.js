'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Entry = require('./Entry');

var _Entry2 = _interopRequireDefault(_Entry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Nav = function Nav(_ref) {
  var _ref$theme = _ref.theme,
      theme = _ref$theme === undefined ? {} : _ref$theme,
      groups = _ref.groups,
      activeGroup = _ref.activeGroup,
      onGroupSelect = _ref.onGroupSelect;
  return _react2.default.createElement(
    'ul',
    { className: theme.emojiSelectPopoverNav },
    groups.map(function (group, index) {
      return _react2.default.createElement(
        'li',
        {
          key: 'nav-group#' + index + '[' + group.categories.join(',') + ']' // eslint-disable-line react/no-array-index-key
          ,
          className: theme.emojiSelectPopoverNavItem
        },
        _react2.default.createElement(_Entry2.default, {
          theme: theme,
          groupIndex: index,
          isActive: index === activeGroup,
          icon: group.icon,
          onGroupSelect: onGroupSelect
        })
      );
    })
  );
};

Nav.propTypes = {
  theme: _propTypes2.default.object.isRequired,
  groups: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  activeGroup: _propTypes2.default.number.isRequired,
  onGroupSelect: _propTypes2.default.func.isRequired
};

exports.default = Nav;