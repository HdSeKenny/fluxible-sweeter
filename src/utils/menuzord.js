/* eslint-disable camelcase, no-param-reassign */

export default (element, options) => {
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

  $.extend(settings, options);

  // variables
  const menu_container = $(element);
  const menu = $(menu_container).children('.sweet-nav-menu');
  const menu_li = $(menu).find('li');
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
    $(menu).addClass('sweet-nav-right');
  }

  // dropdown indentation (mobile mode)
  if (settings.indentChildren) {
    $(menu).addClass('sweet-nav-indented');
  }

  // responsive behavior
  if (settings.responsive) {
    $(menu_container).addClass('sweet-nav-responsive');
    showHideButton = $(menu_container).children('.showhide');
  }

  // scrollable menu
  if (settings.scrollable) {
    if (settings.responsive) {
      $(menu).css('max-height', settings.scrollableMaxHeight).addClass('scrollable').append("<li class='scrollable-fix'></li>");
    }
  }

  // shows a dropdown
  function showDropdown(item) {
    if (settings.effect == 'fade') {
      $(item).children('.dropdown, .megamenu')
        .stop(true, true)
        .delay(settings.showDelay)
        .fadeIn(settings.showSpeed)
        .addClass(settings.animation);
    } else {
      $(item).children('.dropdown, .megamenu')
        .stop(true, true).delay(settings.showDelay)
        .slideDown(settings.showSpeed)
        .addClass(settings.animation);
    }
  }

  // hides a dropdown
  function hideDropdown(item) {
    if (settings.effect == 'fade') {
      $(item).children('.dropdown, .megamenu')
        .stop(true, true)
        .delay(settings.hideDelay)
        .fadeOut(settings.hideSpeed)
        .removeClass(settings.animation);
    } else {
      $(item).children('.dropdown, .megamenu')
        .stop(true, true).delay(settings.hideDelay)
        .slideUp(settings.hideSpeed)
        .removeClass(settings.animation);
    }
    $(item).children('.dropdown, .megamenu')
      .find('.dropdown, .megamenu')
      .stop(true, true)
      .delay(settings.hideDelay)
      .fadeOut(settings.hideSpeed);
  }

  // landscape mode
  function landscapeMode() {
    $(menu).find('.dropdown, .megamenu').hide(0);
    if (navigator.userAgent.match(/Mobi/i) || window.navigator.msMaxTouchPoints > 0 || settings.trigger == 'click') {
      $('.sweet-nav-menu > li > a, .sweet-nav-menu ul.dropdown li a').bind('click touchstart', function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).parent('li').siblings('li')
          .find('.dropdown, .megamenu')
          .stop(true, true)
          .fadeOut(300);
        if ($(this).siblings('.dropdown, .megamenu').css('display') == 'none') {
          showDropdown($(this).parent('li'));
          return false;
        } else {
          hideDropdown($(this).parent('li'));
        }
        window.location.href = $(this).attr('href');
      });
      $(document).bind('click.menu touchstart.menu', (ev) => {
        if ($(ev.target).closest('.sweet-nav').length == 0) {
          $('.sweet-nav-menu').find('.dropdown, .megamenu').fadeOut(300);
        }
      });
    } else {
      $(menu_li).bind('mouseenter', function() {
        showDropdown(this);
      }).bind('mouseleave', function() {
        hideDropdown(this);
      });
    }
  }

  // portrait mode
  function portraitMode() {
    $(menu).find('.dropdown, .megamenu').hide(0);
    $(menu).find('.indicator').each(function() {
      if ($(this).parent('a').siblings('.dropdown, .megamenu').length > 0) {
        $(this).bind('click', function(e) {
          $(menu).scrollTo({ top: 45, left: 0 }, 600);
          if ($(this).parent().prop('tagName') == 'A') {
            e.preventDefault();
          }
          if ($(this).parent('a').siblings('.dropdown, .megamenu').css('display') == 'none') {
            $(this).parent('a').siblings('.dropdown, .megamenu')
              .delay(settings.showDelay)
              .slideDown(settings.showSpeed);
            $(this).parent('a').parent('li').siblings('li')
              .find('.dropdown, .megamenu')
              .slideUp(settings.hideSpeed);
          } else {
            $(this).parent('a').siblings('.dropdown, .megamenu').slideUp(settings.hideSpeed);
          }
        });
      }
    });
  }

  // Fix the submenu on the right side
  function fixSubmenuRight() {
    const submenus = $(menu).children('li').children('.dropdown, .megamenu');
    if ($(window).innerWidth() > mobileWidthBase) {
      const menu_width = $(menu_container).outerWidth(true);
      for (let i = 0; i < submenus.length; i++) {
        if ($(submenus[i]).parent('li').position().left + $(submenus[i]).outerWidth() > menu_width) {
          $(submenus[i]).css('right', 0);
        } else {
          if (menu_width == $(submenus[i]).outerWidth() || (menu_width - $(submenus[i]).outerWidth()) < 20) {
            $(submenus[i]).css('left', 0);
          }
          if ($(submenus[i]).parent('li').position().left + $(submenus[i]).outerWidth() < menu_width) {
            $(submenus[i]).css('right', 'auto');
          }
        }
      }
    }
  }

  // show the bar to show/hide menu items on mobile
  function showMobileBar() {
    $(menu).hide(0);
    $(showHideButton).show(0).click(() => {
      if ($(menu).css('display') == 'none') {
        $(menu).slideDown(settings.showSpeed);
      } else {
        $(menu).slideUp(settings.hideSpeed).find('.dropdown, .megamenu').hide(settings.hideSpeed);
      }
    });
  }

  // hide the bar to show/hide menu items on mobile
  function hideMobileBar() {
    $(menu).show(0);
    $(showHideButton).hide(0);
  }

  // unbind events
  function unbindEvents() {
    $(menu_container).find('li, a').unbind();
    $(document).unbind('click.menu touchstart.menu');
  }

  // sweet-nav tabs
  function menuTabs() {
    function startTab(tab) {
      const TabNavs = $(tab).find('.sweet-nav-tabs-nav > li');
      const TabContents = $(tab).find('.sweet-nav-tabs-content');
      $(TabNavs).bind('click touchstart', function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(TabNavs).removeClass('active');
        $(this).addClass('active');
        $(TabContents).hide(0);
        $(TabContents[$(this).index()]).show(0);
      });
    }
    if ($(menu).find('.sweet-nav-tabs').length > 0) {
      const navTabs = $(menu).find('.sweet-nav-tabs');
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
        $(showHideButton).hide(0);
        $(menu).show(0);
        unbindEvents();
        landscapeMode();
      }
    }
  }

  startMenu();
  $(window).resize(() => {
    startMenu();
    fixSubmenuRight();
  });
};
