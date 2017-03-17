import env from './env';
var MediaSize = {
  SMALL: 350,
  MEDIUM: 768,
  LARGE: 1024
};
var Media = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
};

var OS = {
  Windows: 'Win',
  MacOS: 'Mac',
  UNIX: 'X11',
  Linux: 'Linux'
};

/**
 * get the mediaInfo by the devices information
 * @param devices
 * @returns {{deviceSize: number, media: string}}
 */
function getMediaFromDevicesInfo(devices) {
  let media = {
    deviceSize: MediaSize.LARGE,
    media: Media.LARGE
  };
  if (devices.pc) {
    media = {
      deviceSize: MediaSize.LARGE,
      media: Media.LARGE
    };
  } else if (devices.tablet) {
    media = {
      deviceSize: MediaSize.MEDIUM,
      media: Media.MEDIUM
    };
  } else if (devices.phone) {
    media = {
      deviceSize: MediaSize.SMALL,
      media: Media.SMALL
    };
  }
  return media;
}
/**
 * get the browser mediaInfo, use screen width by default, and use innerWidth if isInnerWidth is true
 * 1) getBrowserMediaInfo(): returns media info based on screen width;
 * 2) getBrowserMediaInfo(true): returns media infor based on innerWidth;
 * @returns {{deviceSize: number, media: string}}
 */
function getBrowserMediaInfo(isInnerWidth) {
  let media = {
    deviceSize: MediaSize.LARGE,
    media: Media.LARGE
  };
  if (env.CLIENT) {
    let width = isInnerWidth ? window.innerWidth : window.screen.width;
    if (width > MediaSize.LARGE) {
      media = {
        deviceSize: MediaSize.LARGE,
        media: Media.LARGE
      };
    }
    else if (width >= MediaSize.MEDIUM) {
      media = {
        deviceSize: MediaSize.MEDIUM,
        media: Media.MEDIUM
      };
    }
    else {
      media = {
        deviceSize: MediaSize.SMALL,
        media: Media.SMALL
      };
    }
  }
  return media;
}

function isBrowseBaseOnWebkit() {
  return /webkit/i.test(navigator.userAgent);
}

function isEdgeBrowser() {
  return /edge\/\d+/i.test(navigator.userAgent);
}

function getScrollBarWidth() {
  if (isEdgeBrowser()) {
    return 12;
  }
  else if (isBrowseBaseOnWebkit()) {
    return 8;
  }
  else {
    //for firefox some run on MAC browser
    if(isOperatingSystem(OS.MacOS)){
      return 0;
    }
    return 17;
  }
}

function isOperatingSystem(OSName) {
  return navigator.appVersion.indexOf(OSName) > -1;
}

module.exports = {
  MediaSize: MediaSize,
  Media: Media,
  OS: OS,
  getMediaFromDevicesInfo: getMediaFromDevicesInfo,
  getBrowserMediaInfo: getBrowserMediaInfo,
  isBrowseBaseOnWebkit: isBrowseBaseOnWebkit,
  isEdgeBrowser: isEdgeBrowser,
  isOperatingSystem: isOperatingSystem,
  getScrollBarWidth: getScrollBarWidth
};
