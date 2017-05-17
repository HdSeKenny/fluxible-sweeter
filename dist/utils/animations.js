'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

var _configs = require('../configs');

var _configs2 = _interopRequireDefault(_configs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const animations = {
  sticky_header: function (element) {
    if (_env2.default.CLIENT) {
      const $window = $(window);
      const $nav = $(element);
      const { navbar: navbar } = _configs2.default.params;
      const stickyHeight = navbar.sticky_header_height;
      const fadeSpeed = navbar.fade_speed;
      let isScroll = true;

      $window.on('scroll', () => {
        const scrollTop = $window.scrollTop();
        if (scrollTop > stickyHeight) {
          if (isScroll === true) {
            $nav.fadeOut(fadeSpeed, () => {
              $nav.addClass('sticky').fadeIn(fadeSpeed);
            });
            isScroll = false;
          }
        } else if (isScroll === false) {
          $nav.removeClass('sticky');
          isScroll = true;
        } else if ($nav.hasClass('sticky')) {
          $nav.removeClass('sticky');
          isScroll = true;
        }
      });
    }
  },
  fixed_left_nav: function (element) {
    if (_env2.default.CLIENT) {
      const $window = $(window);
      const $ele = $(element);
      const { leftNav: leftNav } = _configs2.default.params;
      const leftNavHeight = leftNav.left_nav_height;
      const fadeSpeed = leftNav.fade_speed;
      let isScroll = true;

      $window.on('scroll', () => {
        const scrollTop = $window.scrollTop();
        if (scrollTop > leftNavHeight) {
          if (isScroll === true) {
            $ele.fadeOut(fadeSpeed, () => {
              $ele.addClass('fixed').fadeIn(fadeSpeed);
            });
            isScroll = false;
          }
        } else if (isScroll === false) {
          $ele.removeClass('fixed');
          isScroll = true;
        } else if ($ele.hasClass('fixed')) {
          $ele.removeClass('fixed');
          isScroll = true;
        }
      });
    }
  }
};

exports.default = animations;
module.exports = exports['default'];
