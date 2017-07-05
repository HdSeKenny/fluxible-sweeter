import env from './env';
import configs from '../configs';

const animations = {
  configs: {
    main_sliders_did_load: false
  },

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
        } else if ($nav.hasClass('sticky')) {
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
        } else if ($ele.hasClass('fixed')) {
          $ele.removeClass('fixed');
          isScroll = true;
        }
      });
    }
  },

  main_sliders(callback) {
    jQuery(document).ready(() => {
      const revol = jQuery('.tp-banner').show().revolution({
        // dottedOverlay: 'none',
        delay: 8000,
        startwidth: 1170,
        startheight: 430,
        hideThumbs: 10,
        fullWidth: 'on',
        forceFullWidth: 'on',
        spinner: 'off',
        navigation: {
          keyboardNavigation: 'on',
          keyboard_direction: 'horizontal', //  horizontal - left/right arrows,  vertical - top/bottom arrows
          mouseScrollNavigation: 'off', // on, off, carousel
          onHoverStop: 'on', // Stop Banner Timet at Hover on Slide on/off

          touch: {
            touchenabled: 'off', // Enable Swipe Function : on/off
            swipe_treshold: 75, // The number of pixels that the user must move their finger by before it is considered a swipe.
            swipe_min_touches: 1, // Min Finger (touch) used for swipe
            drag_block_vertical: false, // Prevent Vertical Scroll during Swipe
            swipe_direction: 'horizontal'
          },
          arrows: {
            style: 'hades',
            enable: false,
            hide_onmobile: false,
            hide_onleave: true,
            hide_delay: 200,
            hide_delay_mobile: 1200,
            hide_under: 0,
            hide_over: 9999,
            tmp: '',
            rtl: false,
            left: {
              h_align: 'left',
              v_align: 'center',
              h_offset: 20,
              v_offset: 0,
              container: 'slider',
            },
            right: {
              h_align: 'right',
              v_align: 'center',
              h_offset: 20,
              v_offset: 0,
              container: 'slider',
            }
          }
        }
      });

      if (revol) {
        callback(revol);
      }
    });
  }
};

export default animations;
