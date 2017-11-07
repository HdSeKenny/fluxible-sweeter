const convertMsg = (msg) => {
  const strMsg = msg.split('_').join(' ').toLowerCase();
  const firstLetter = strMsg.charAt(0).toUpperCase();
  return `${firstLetter}${strMsg.substr(1)}`;
};

const confirmButtonColor = '#00a9da';
const closeTimer = 1500;

export default {
  text: (title, text, showLoading, cb) => {
    swal({
      title: convertMsg(title),
      text: text,
      timer: closeTimer,
      showConfirmButton: false,
      onOpen: () => {
        if (showLoading) swal.showLoading();
      }
    }).then(
      cb,
      // handling the promise rejection
      (dismiss) => {}
    );
  },

  success: (title, text, showLoading, cb) => {
    swal({
      title: convertMsg(title),
      text: text,
      type: 'success',
      confirmButtonColor,
      timer: closeTimer,
      showConfirmButton: false,
      onOpen: () => {
        if (showLoading) swal.showLoading();
      }
    }).then(cb, (dismiss) => {});
    // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
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

