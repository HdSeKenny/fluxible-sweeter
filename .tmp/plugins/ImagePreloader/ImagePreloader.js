'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ImagePreloader extends _react2.default.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  onImageLoaded() {
    setTimeout(() => {
      this.setState({ loaded: true });
    }, 500);
  }

  render() {
    const { loaded: loaded } = this.state;
    const { className: className, src: src } = this.props;
    const classImage = (0, _classnames2.default)(className, 'lt-image', { '_loaded': loaded });
    return _react2.default.createElement(
      'div',
      { className: classImage },
      _react2.default.createElement('img', { className: 'preload', src: src.preload, alt: 'preload' }),
      _react2.default.createElement('img', { className: 'content', src: src.content, alt: 'content', onLoad: this.onImageLoaded.bind(this) })
    );
  }
}
exports.default = ImagePreloader;
ImagePreloader.propTypes = {
  className: _propTypes2.default.string,
  src: _propTypes2.default.string
};
module.exports = exports['default'];
