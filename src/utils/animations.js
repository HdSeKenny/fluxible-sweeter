import env from './env';
import configs from '../configs';

const animations = {
  sticky_header(element) {
    if (env.is_client) {
      const $window = $(window);
      const $nav = $(element);
      const { navbar } = configs.params;
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
        }
        else if ($nav.hasClass('sticky')) {
          $nav.removeClass('sticky');
          isScroll = true;
        }
      });
    }
  },

  fixed_left_nav(element) {
    if (env.is_client) {
      const $window = $(window);
      const $ele = $(element);
      const { leftNav } = configs.params;
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
        }
        else if ($ele.hasClass('fixed')) {
          $ele.removeClass('fixed');
          isScroll = true;
        }
      });
    }
  }
};

export default animations;