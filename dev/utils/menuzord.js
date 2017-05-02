'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (element, options) => {
  const settings = {
    showSpeed: 300,
    hideSpeed: 300,
    trigger: 'hover',
    showDelay: 0,
    hideDelay: 0,
    effect: 'fade',
    align: 'left',
    responsive: true,
    animation: 'none',
    indentChildren: true,
    // indicatorFirstLevel: '+',
    // indicatorSecondLevel: '+',
    scrollable: true,
    scrollableMaxHeight: 400
  };

  _jquery2.default.extend(settings, options);

  // variables
  const menu_container = (0, _jquery2.default)(element);
  const menu = (0, _jquery2.default)(menu_container).children('.sweet-nav-menu');
  const menu_li = (0, _jquery2.default)(menu).find('li');
  const mobileWidthBase = 768;

  let showHideButton;
  let bigScreenFlag = 2000; // a number greater than 'mobileWidthBase'
  let smallScreenFlag = 200; // a number less than 'mobileWidthBase'

  // dropdown/megamenu indicators
  // $(menu).children('li').children('a').each(function() {
  //   if ($(this).siblings('.dropdown, .megamenu').length > 0) {
  //     $(this).append(`<span class='indicator'>${settings.indicatorFirstLevel}</span>`);
  //   }
  // });
  // $(menu).find('.dropdown').children('li').children('a')
  //   .each(function() {
  //     if ($(this).siblings('.dropdown').length > 0) {
  //       $(this).append(`<span class='indicator'>${settings.indicatorSecondLevel}</span>`);
  //     }
  //   });

  // navigation alignment
  if (settings.align == 'right') {
    (0, _jquery2.default)(menu).addClass('sweet-nav-right');
  }

  // dropdown indentation (mobile mode)
  if (settings.indentChildren) {
    (0, _jquery2.default)(menu).addClass('sweet-nav-indented');
  }

  // responsive behavior
  if (settings.responsive) {
    (0, _jquery2.default)(menu_container).addClass('sweet-nav-responsive');
    showHideButton = (0, _jquery2.default)(menu_container).children('.showhide');
  }

  // scrollable menu
  if (settings.scrollable) {
    if (settings.responsive) {
      (0, _jquery2.default)(menu).css('max-height', settings.scrollableMaxHeight).addClass('scrollable').append("<li class='scrollable-fix'></li>");
    }
  }

  // shows a dropdown
  function showDropdown(item) {
    if (settings.effect == 'fade') {
      (0, _jquery2.default)(item).children('.dropdown, .megamenu').stop(true, true).delay(settings.showDelay).fadeIn(settings.showSpeed).addClass(settings.animation);
    } else {
      (0, _jquery2.default)(item).children('.dropdown, .megamenu').stop(true, true).delay(settings.showDelay).slideDown(settings.showSpeed).addClass(settings.animation);
    }
  }

  // hides a dropdown
  function hideDropdown(item) {
    if (settings.effect == 'fade') {
      (0, _jquery2.default)(item).children('.dropdown, .megamenu').stop(true, true).delay(settings.hideDelay).fadeOut(settings.hideSpeed).removeClass(settings.animation);
    } else {
      (0, _jquery2.default)(item).children('.dropdown, .megamenu').stop(true, true).delay(settings.hideDelay).slideUp(settings.hideSpeed).removeClass(settings.animation);
    }
    (0, _jquery2.default)(item).children('.dropdown, .megamenu').find('.dropdown, .megamenu').stop(true, true).delay(settings.hideDelay).fadeOut(settings.hideSpeed);
  }

  // landscape mode
  function landscapeMode() {
    (0, _jquery2.default)(menu).find('.dropdown, .megamenu').hide(0);
    if (navigator.userAgent.match(/Mobi/i) || window.navigator.msMaxTouchPoints > 0 || settings.trigger == 'click') {
      (0, _jquery2.default)('.sweet-nav-menu > li > a, .sweet-nav-menu ul.dropdown li a').bind('click touchstart', function (e) {
        e.stopPropagation();
        e.preventDefault();
        (0, _jquery2.default)(this).parent('li').siblings('li').find('.dropdown, .megamenu').stop(true, true).fadeOut(300);
        if ((0, _jquery2.default)(this).siblings('.dropdown, .megamenu').css('display') == 'none') {
          showDropdown((0, _jquery2.default)(this).parent('li'));
          return false;
        } else {
          hideDropdown((0, _jquery2.default)(this).parent('li'));
        }
        window.location.href = (0, _jquery2.default)(this).attr('href');
      });
      (0, _jquery2.default)(document).bind('click.menu touchstart.menu', ev => {
        if ((0, _jquery2.default)(ev.target).closest('.sweet-nav').length == 0) {
          (0, _jquery2.default)('.sweet-nav-menu').find('.dropdown, .megamenu').fadeOut(300);
        }
      });
    } else {
      (0, _jquery2.default)(menu_li).bind('mouseenter', function () {
        showDropdown(this);
      }).bind('mouseleave', function () {
        hideDropdown(this);
      });
    }
  }

  // portrait mode
  function portraitMode() {
    (0, _jquery2.default)(menu).find('.dropdown, .megamenu').hide(0);
    (0, _jquery2.default)(menu).find('.indicator').each(function () {
      if ((0, _jquery2.default)(this).parent('a').siblings('.dropdown, .megamenu').length > 0) {
        (0, _jquery2.default)(this).bind('click', function (e) {
          (0, _jquery2.default)(menu).scrollTo({ top: 45, left: 0 }, 600);
          if ((0, _jquery2.default)(this).parent().prop('tagName') == 'A') {
            e.preventDefault();
          }
          if ((0, _jquery2.default)(this).parent('a').siblings('.dropdown, .megamenu').css('display') == 'none') {
            (0, _jquery2.default)(this).parent('a').siblings('.dropdown, .megamenu').delay(settings.showDelay).slideDown(settings.showSpeed);
            (0, _jquery2.default)(this).parent('a').parent('li').siblings('li').find('.dropdown, .megamenu').slideUp(settings.hideSpeed);
          } else {
            (0, _jquery2.default)(this).parent('a').siblings('.dropdown, .megamenu').slideUp(settings.hideSpeed);
          }
        });
      }
    });
  }

  // Fix the submenu on the right side
  function fixSubmenuRight() {
    const submenus = (0, _jquery2.default)(menu).children('li').children('.dropdown, .megamenu');
    if ((0, _jquery2.default)(window).innerWidth() > mobileWidthBase) {
      const menu_width = (0, _jquery2.default)(menu_container).outerWidth(true);
      for (let i = 0; i < submenus.length; i++) {
        if ((0, _jquery2.default)(submenus[i]).parent('li').position().left + (0, _jquery2.default)(submenus[i]).outerWidth() > menu_width) {
          (0, _jquery2.default)(submenus[i]).css('right', 0);
        } else {
          if (menu_width == (0, _jquery2.default)(submenus[i]).outerWidth() || menu_width - (0, _jquery2.default)(submenus[i]).outerWidth() < 20) {
            (0, _jquery2.default)(submenus[i]).css('left', 0);
          }
          if ((0, _jquery2.default)(submenus[i]).parent('li').position().left + (0, _jquery2.default)(submenus[i]).outerWidth() < menu_width) {
            (0, _jquery2.default)(submenus[i]).css('right', 'auto');
          }
        }
      }
    }
  }

  // show the bar to show/hide menu items on mobile
  function showMobileBar() {
    (0, _jquery2.default)(menu).hide(0);
    (0, _jquery2.default)(showHideButton).show(0).click(() => {
      if ((0, _jquery2.default)(menu).css('display') == 'none') {
        (0, _jquery2.default)(menu).slideDown(settings.showSpeed);
      } else {
        (0, _jquery2.default)(menu).slideUp(settings.hideSpeed).find('.dropdown, .megamenu').hide(settings.hideSpeed);
      }
    });
  }

  // hide the bar to show/hide menu items on mobile
  function hideMobileBar() {
    (0, _jquery2.default)(menu).show(0);
    (0, _jquery2.default)(showHideButton).hide(0);
  }

  // unbind events
  function unbindEvents() {
    (0, _jquery2.default)(menu_container).find('li, a').unbind();
    (0, _jquery2.default)(document).unbind('click.menu touchstart.menu');
  }

  // sweet-nav tabs
  function menuTabs() {
    function startTab(tab) {
      const TabNavs = (0, _jquery2.default)(tab).find('.sweet-nav-tabs-nav > li');
      const TabContents = (0, _jquery2.default)(tab).find('.sweet-nav-tabs-content');
      (0, _jquery2.default)(TabNavs).bind('click touchstart', function (e) {
        e.stopPropagation();
        e.preventDefault();
        (0, _jquery2.default)(TabNavs).removeClass('active');
        (0, _jquery2.default)(this).addClass('active');
        (0, _jquery2.default)(TabContents).hide(0);
        (0, _jquery2.default)(TabContents[(0, _jquery2.default)(this).index()]).show(0);
      });
    }
    if ((0, _jquery2.default)(menu).find('.sweet-nav-tabs').length > 0) {
      const navTabs = (0, _jquery2.default)(menu).find('.sweet-nav-tabs');
      for (let i = 0; i < navTabs.length; i++) {
        startTab(navTabs[i]);
      }
    }
  }

  // return window's width
  function windowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  // navigation start function
  function startMenu() {
    fixSubmenuRight();
    if (windowWidth() <= mobileWidthBase && bigScreenFlag > mobileWidthBase) {
      unbindEvents();
      if (settings.responsive) {
        showMobileBar();
        portraitMode();
      } else {
        landscapeMode();
      }
    }
    if (windowWidth() > mobileWidthBase && smallScreenFlag <= mobileWidthBase) {
      unbindEvents();
      hideMobileBar();
      landscapeMode();
    }
    bigScreenFlag = windowWidth();
    smallScreenFlag = windowWidth();
    menuTabs();
    /* IE8 fix */
    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent) && windowWidth() < mobileWidthBase) {
      // eslint-disable-next-line no-new-wrappers
      const ieversion = new Number(RegExp.$1);
      if (ieversion == 8) {
        (0, _jquery2.default)(showHideButton).hide(0);
        (0, _jquery2.default)(menu).show(0);
        unbindEvents();
        landscapeMode();
      }
    }
  }

  startMenu();
  (0, _jquery2.default)(window).resize(() => {
    startMenu();
    fixSubmenuRight();
  });
}; /* eslint-disable camelcase, no-param-reassign */


module.exports = exports['default'];
