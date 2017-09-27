'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tabs = (0, _createReactClass2.default)({

  displayName: 'Tabs',

  propTypes: {
    selected: _propTypes2.default.number,
    children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.element])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      selected: 0
    };
  },
  getInitialState: function getInitialState() {
    return {
      selected: this.props.selected
    };
  },
  _renderTitles: function _renderTitles() {
    function labels(child, index) {
      var activeClass = this.state.selected === index ? 'active' : '';
      return _react2.default.createElement(
        'li',
        { key: index, className: activeClass },
        _react2.default.createElement(
          'span',
          { onClick: this.handleClick.bind(this, index) },
          child.props.label
        )
      );
    }

    return _react2.default.createElement(
      'ul',
      { className: 'tabs-labels' },
      this.props.children.map(labels.bind(this))
    );
  },
  _renderContent: function _renderContent() {
    return _react2.default.createElement(
      'div',
      { className: 'tabs-content' },
      this.props.children[this.state.selected]
    );
  },
  handleClick: function handleClick(index) {
    this.setState({
      selected: index
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: '' },
      this._renderTitles(),
      this._renderContent()
    );
  }
});

exports.default = Tabs;
module.exports = exports['default'];