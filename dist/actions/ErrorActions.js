'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ErrorActions = {};

ErrorActions.ErrorOccurred = function (context, payload, done) {
  context.dispatch('ERROR_OCCURRED', payload);
  done();
};

exports.default = ErrorActions;
module.exports = exports['default'];