import { chunk } from 'lodash';
import moment from 'moment';

const NUM_DAYS_IN_WEEK = 7;

/**
 *
 * @param start
 * @param end
 */
export const getDatesBetween = (start: moment.Moment, end: moment.Moment): moment.Moment[] => {
    const dates: moment.Moment[] = [];
    const startClone = start.clone();
    while (startClone.isBefore(end)) {
        dates.push(startClone.clone());
        startClone.add(1, 'day');
    }
    return dates;
};

/**
 *
 */
export const getWeekChunksForMonth = (): moment.Moment[][] => {
    const monthStart = moment().startOf('month').startOf('day');

    const daysBeforeMonth: moment.Moment[] = [];
    for (let i = 0; i < monthStart.weekday(); i++) {
        daysBeforeMonth.push(monthStart.clone().add(i, 'day'));
    }

    const daysAfterMonth: moment.Moment[] = [];
    for (let i = 0; i < NUM_DAYS_IN_WEEK - monthStart.endOf('month').weekday(); i++) {
        daysAfterMonth.push(monthStart.clone().add(1, 'month').add(i, 'day'));
    }

    const daysInMonth = getDatesBetween(monthStart, monthStart.clone().endOf('month'));

    return chunk(
        [...daysBeforeMonth, ...daysInMonth, ...daysAfterMonth],
        NUM_DAYS_IN_WEEK
    );
};

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
