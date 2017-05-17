'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const formatWithYear = 'DD/MM/YYYY';
const formatWithoutYear = 'h:mm A, DD/MM';

const format = {
  fromNow: function (date) {
    if (!date && typeof date !== 'string') {
      console.log('invalid date..');
      return '';
    }

    const dateHoursDiff = (0, _moment2.default)().diff(date, 'hours');
    const thisYear = (0, _moment2.default)().year();
    const dateYear = (0, _moment2.default)(date).year();
    const dateYearsDiff = thisYear - dateYear;
    const momented = (0, _moment2.default)(date);
    const fromNow = momented.fromNow();

    let displayDate = fromNow;

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
