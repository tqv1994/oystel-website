import * as dayjs from 'dayjs';

export const dateTimeHelper = {
  formatDate: function (date?: string, format = 'MMMM DD, YYYY') {
    if (!date) {
      return '';
    }
    const dateData = new Date(date);
    const month = dateData.toLocaleString('en', { month: 'long'});
    
    return `${month} ${dateData.getDate()}, ${dateData.getFullYear()}`;
  },
};
