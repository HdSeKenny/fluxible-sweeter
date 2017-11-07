'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var convertMsg = function convertMsg(msg) {
  var strMsg = msg.split('_').join(' ').toLowerCase();
  var firstLetter = strMsg.charAt(0).toUpperCase();
  return '' + firstLetter + strMsg.substr(1);
};

var confirmButtonColor = '#00a9da';
var closeTimer = 1500;

exports.default = {
  text: function text(title, _text, showLoading, cb) {
    swal({
      title: convertMsg(title),
      text: _text,
      timer: closeTimer,
      showConfirmButton: false,
      onOpen: function onOpen() {
        if (showLoading) swal.showLoading();
      }
    }).then(cb,
    // handling the promise rejection
    function (dismiss) {});
  },

  success: function success(title, text, showLoading, cb) {
    swal({
      title: convertMsg(title),
      text: text,
      type: 'success',
      confirmButtonColor: confirmButtonColor,
      timer: closeTimer,
      showConfirmButton: false,
      onOpen: function onOpen() {
        if (showLoading) swal.showLoading();
      }
    }).then(cb, function (dismiss) {});
    // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
  },

  Info: function Info(msg) {
    swal({
      title: 'Info',
      text: convertMsg(msg),
      type: 'info',
      timer: closeTimer
    });
  },

  error: function error(msg) {
    swal({
      title: convertMsg(msg),
      type: 'error',
      confirmButtonColor: '#F27474',
      timer: 2000
    });
  },

  warning: function warning(msg, cb) {
    swal({
      title: convertMsg(msg),
      type: 'warning',
      confirmButtonColor: '#F8BB86'
    }, function () {
      if (cb) {
        cb();
      }
    });
  },

  confirm: function confirm(msg, confirmText, callback) {
    swal({
      title: convertMsg(msg) + '?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: confirmText,
      closeOnConfirm: false,
      showLoaderOnConfirm: true
    }, function () {
      setTimeout(function () {
        callback();
      }, 500);
    });
  }
};
module.exports = exports['default'];