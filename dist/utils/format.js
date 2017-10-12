'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatWithYear = 'DD/MM/YYYY';
var formatWithoutYear = 'h:mm A, DD/MM';

var format = {
  fromNow: function fromNow(date) {
    if (!date && typeof date !== 'string') {
      console.log('invalid date..');
      return '';
    }

    var dateHoursDiff = (0, _moment2.default)().diff(date, 'hours');
    var thisYear = (0, _moment2.default)().year();
    var dateYear = (0, _moment2.default)(date).year();
    var dateYearsDiff = thisYear - dateYear;
    var momented = (0, _moment2.default)(date);
    var fromNow = momented.fromNow();

    var displayDate = fromNow;

    if (dateHoursDiff > 11 && dateYearsDiff < 1) {
      displayDate = momented.format(formatWithoutYear);
    } else if (dateYearsDiff > 1 || dateYearsDiff === 1) {
      displayDate = momented.format(formatWithYear);
    }

    return displayDate;
  }
};

exports.default = format;
module.exports = exports['default'];