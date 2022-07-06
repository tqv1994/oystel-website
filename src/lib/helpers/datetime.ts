import * as dayjs from 'dayjs';

export const dateTimeHelper = {
  formatDate: function (date?: string, format = 'MMMM DD, YYYY') {
    if (!date) {
      return '';
    }
    try {
      return dayjs(date).format(format);
    } catch (error) {
      // Fix error of dayjs
      const dateData = new Date(date);
      const month = dateData.toLocaleString('en', { month: 'long' });
      return `${month} ${dateData.getDate()}, ${dateData.getFullYear()}`;
    }
  },
};
