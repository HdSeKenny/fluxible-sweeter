import moment from 'moment';

const formatWithYear = 'DD/MM/YYYY';
const formatWithoutYear = 'h:mm A, DD/MM';

const format = {
  fromNow(date) {
    if (!date && typeof date !== 'string') {
      console.log('invalid date..');
      return '';
    }

    const dateHoursDiff = moment().diff(date, 'hours');
    const thisYear = moment().year();
    const dateYear = moment(date).year();
    const dateYearsDiff = thisYear - dateYear;
    const momented = moment(date);
    const fromNow = momented.fromNow();

    let displayDate = fromNow;

    if (dateHoursDiff > 11 && dateYearsDiff < 1) {
      displayDate = momented.format(formatWithoutYear);
    }
    else if (dateYearsDiff > 1 || dateYearsDiff === 1) {
      displayDate = momented.format(formatWithYear);
    }

    return displayDate;
  }
};


export default format;
