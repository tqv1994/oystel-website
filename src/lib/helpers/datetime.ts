import * as dayjs from 'dayjs';

export const dateTimeHelper = {
  formatDate: function (date?: string, format = 'MMMM DD, YYYY') {
    if (!date) {
      return '';
    }
    return dayjs(date).format(format);
  },
};
