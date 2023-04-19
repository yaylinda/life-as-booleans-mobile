import moment from 'moment';
import uuid from 'react-native-uuid';
import type { Tracker } from './types';

export const getWeekStart = () => {
    const momentDate = moment();
    const dayOfWeek = momentDate.day();

    // If the given date is already a Sunday, return the given date.
    if (dayOfWeek === 0) {
        return momentDate.startOf('day');
    }

    // Otherwise, subtract the dayOfWeek (in days) from the given date to get the closest past Sunday.
    return momentDate.subtract(dayOfWeek, 'days').startOf('day');
};
