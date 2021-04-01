import { format } from 'date-fns';

const DateFormatter = {
    toLongDate: (date: Date): string => format(date, 'EEE dd/MM/yyyy HH:mm'),
    toShortDate: (date: Date): string => format(date, 'dd MMM yy'),
    toDay: (date: Date): string => format(date, 'EEEE'),
    toTime: (date: Date): string => format(date, 'HH:mm'),
};

export default DateFormatter;
