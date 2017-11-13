'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

var _configs = require('../configs');

var _configs2 = _interopRequireDefault(_configs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animations = {
  configs: {
    main_sliders_did_load: false
  },

  backToTop: function backToTop(element) {
    var $window = $(window);
    $window.on('scroll', function () {
      var navbar = _configs2.default.params.navbar;

      var stickyHeight = navbar.sticky_header_height;
      if ($window.scrollTop() > stickyHeight) {
        $(element).fadeIn(200);
      } else {
        $(element).fadeOut(200);
      }
    });
    $(element).click(function () {
      $('body, html').animate({
        scrollTop: 0
      }, 500);
    });
  },
  sticky_header: function sticky_header(element) {
    if (_env2.default.is_client) {
      var $window = $(window);
      var $nav = $(element);
      var navbar = _configs2.default.params.navbar;

      var stickyHeight = navbar.sticky_header_height;
      var fadeSpeed = navbar.fade_speed;
      var isScroll = true;

      $window.on('scroll', function () {
        var scrollTop = $window.scrollTop();
        if (scrollTop > stickyHeight) {
          if (isScroll === true) {
            $nav.fadeOut(fadeSpeed, function () {
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
  fixed_left_nav: function fixed_left_nav(element) {
    if (_env2.default.is_client) {
      var $window = $(window);
      var $ele = $(element);
      var leftNav = _configs2.default.params.leftNav;

      var leftNavHeight = leftNav.left_nav_height;
      var fadeSpeed = leftNav.fade_speed;
      var isScroll = true;

      $window.on('scroll', function () {
        var scrollTop = $window.scrollTop();
        if (scrollTop > leftNavHeight) {
          if (isScroll === true) {
            $ele.fadeOut(fadeSpeed, function () {
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