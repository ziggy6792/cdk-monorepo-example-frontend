import { format } from 'date-fns';

const DateFormatter = {
  toVerbose: (date: Date): string => format(date, 'EEEE, do MMMM, ha'),
  toLongDate: (date: Date): string => format(date, 'EEE dd/MM/yyyy HH:mm'),
  toShortDate: (date: Date): string => format(date, 'dd MMM yy'),
  toShortDay: (date: Date): string => format(date, 'EEEE'),
  toLongDay: (date: Date): string => format(date, 'EEEE, MMMM d'),
  toTime: (date: Date): string => format(date, 'HH:mm'),
};

export default DateFormatter;
