
const convertMsg = (msg) => {
  const strMsg = msg.split('_').join(' ').toLowerCase();
  const firstLetter = strMsg.charAt(0).toUpperCase();
  return `${firstLetter}${strMsg.substr(1)}`;
};

const confirmButtonColor = '#00a9da';
const closeTimer = 2000;

export default {
  success: (msg, cb) => {
    swal({
      title: convertMsg(msg),
      type: 'success',
      confirmButtonColor,
      timer: closeTimer
    }, () => {
      if (cb) {
        cb();
      }
    });
  },

  Info: (msg) => {
    swal({
      title: 'Info',
      text: convertMsg(msg),
      type: 'info',
      timer: closeTimer
    });
  },

  error: (msg) => {
    swal({
      title: convertMsg(msg),
      type: 'error',
      confirmButtonColor: '#F27474',
      timer: 2000
    });
  },

  warning: (msg, cb) => {
    swal({
      title: convertMsg(msg),
      type: 'warning',
      confirmButtonColor: '#F8BB86'
    }, () => {
      if (cb) {
        cb();
      }
    });
  },

  confirm: (msg, confirmText, callback) => {
    swal({
      title: `${convertMsg(msg)}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: confirmText,
      closeOnConfirm: false,
      showLoaderOnConfirm: true
    }, () => {
      setTimeout(() => {
        callback();
      }, 500);
    });
  }
};

