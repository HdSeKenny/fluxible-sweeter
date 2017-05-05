import env from './env';
import configs from '../configs';

const animations = {
  sticky_header(element) {
    if (env.CLIENT) {
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
  }
};

export default animations;