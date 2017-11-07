'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _Layout = require('../UI/Layout');

var _UI = require('../UI');

var _UserControls = require('../UserControls');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable all, camelcase */
var BlogSection = function (_React$Component) {
  (0, _inherits3.default)(BlogSection, _React$Component);

  function BlogSection(props) {
    (0, _classCallCheck3.default)(this, BlogSection);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BlogSection.__proto__ || (0, _getPrototypeOf2.default)(BlogSection)).call(this, props));

    _this.state = {
      selectedPin: {},
      showPinModal: false
    };
    return _this;
  }

  (0, _createClass3.default)(BlogSection, [{
    key: 'onViewPinItem',
    value: function onViewPinItem(blogs, id) {
      var _this2 = this;

      var selectedPin = blogs.find(function (p) {
        return p.id_str === id;
      });
      this.setState({ selectedPin: selectedPin, showPinModal: true }, function () {
        _UI.ModalsFactory.show('pinModal');
      });

      $('#pinModal').on('hidden.bs.modal', function () {
        if (_this2.hidePinModal) {
          _this2.hidePinModal();
        }
      });
    }
  }, {
    key: 'hidePinModal',
    value: function hidePinModal() {
      var homePage = $('.home-page');
      if (homePage && homePage.length) {
        this.setState({ selectedPin: {}, showPinModal: false });
      }
    }
  }, {
    key: 'sortBlogs',
    value: function sortBlogs(blogs, type) {
      switch (type) {
        case 'date':
          return blogs.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
          });
          break;
        default:
          return blogs.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
          });
          break;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          selectedPin = _state.selectedPin,
          showPinModal = _state.showPinModal;
      var _props = this.props,
          blogs = _props.blogs,
          currentUser = _props.currentUser;

      var sortedBlogs = this.sortBlogs(blogs);
      var specialClass = '';
      return _react2.default.createElement(
        'section',
        { className: 'blog-section' },
        sortedBlogs.map(function (pin, index) {
          return _react2.default.createElement(_UI.PinItem, {
            key: index,
            onSelect: function onSelect(id) {
              return _this3.onViewPinItem(blogs, id);
            },
            pin: pin,
            type: pin.type,
            currentUser: currentUser,
            specialClass: specialClass,
            showImage: true,
            readMore: true
          });
        }),
        _react2.default.createElement(
          _Layout.Page,
          null,
          _react2.default.createElement(_UI.ModalsFactory, {
            modalref: 'pinModal',
            pin: selectedPin,
            showModal: showPinModal,
            currentUser: currentUser,
            ModalComponent: _UserControls.PinItemModal,
            showHeaderAndFooter: false
          })
        )
      );
    }
  }]);
  return BlogSection;
}(_react2.default.Component);

BlogSection.displayName = 'BlogSection';
BlogSection.propTypes = {
  blogs: _propTypes2.default.array,
  currentUser: _propTypes2.default.object
};
BlogSection.contextTypes = {
  router: _reactRouter.routerShape.isRequired
};
exports.default = BlogSection;
module.exports = exports['default'];