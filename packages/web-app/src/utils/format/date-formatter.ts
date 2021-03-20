import { format } from 'date-fns';

const DateFormatter = {
    toShortDate: (date: Date): string => format(date, 'EEE MM/dd/yyyy HH:mm'),
};

export default DateFormatter;
