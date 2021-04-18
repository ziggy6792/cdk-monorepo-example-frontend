import { format } from 'date-fns';

const formatDate = (date: Date, formatFunc: (date: Date) => string, defaultString = 'TBD') => (date ? formatFunc(date) : defaultString);

const DateFormatter = {
  toVerbose: (date: Date, defaultString = 'TBD'): string => formatDate(date, (d) => format(d, 'EEEE, do MMMM, ha'), defaultString),
  toLongDate: (date: Date, defaultString = 'TBD'): string => formatDate(date, (d) => format(d, 'EEE dd/MM/yyyy HH:mm'), defaultString),
  toShortDate: (date: Date, defaultString = 'TBD'): string => formatDate(date, (d) => format(d, 'dd MMM yy'), defaultString),
  toShortDay: (date: Date, defaultString = 'TBD'): string => formatDate(date, (d) => format(d, 'EEEE'), defaultString),
  toLongDay: (date: Date, defaultString = 'TBD'): string => formatDate(date, (d) => format(d, 'EEEE, MMMM d'), defaultString),
  toTime: (date: Date, defaultString = 'TBD'): string => formatDate(date, (d) => format(d, 'HH:mm'), defaultString),
  toDay: (date: Date, defaultString = 'TBD'): string => formatDate(date, (d) => format(d, 'EEEE'), defaultString),
  toDayAndTime: (date: Date, defaultString = 'TBD'): string => formatDate(date, (d) => format(d, 'EEE HH:mm'), defaultString),
};

export default DateFormatter;
