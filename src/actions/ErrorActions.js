const ErrorActions = {};

ErrorActions.ErrorOccurred = function (context, payload, done) {
  context.dispatch('ERROR_OCCURRED', payload);
  done();
};

export default ErrorActions;
