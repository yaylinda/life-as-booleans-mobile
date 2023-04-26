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
    let beforeMonth = monthStart.clone();
    while (beforeMonth.weekday() > 0) {
        beforeMonth = beforeMonth.clone().subtract(1, 'day');
        daysBeforeMonth.push(beforeMonth);
    }

    const daysInMonth = getDatesBetween(monthStart, monthStart.clone().endOf('month'));

    const daysAfterMonth: moment.Moment[] = [];
    let afterMonth = monthStart.clone().endOf('month');
    while (afterMonth.weekday() < 6) {
        afterMonth = afterMonth.clone().add(1, 'day');
        daysAfterMonth.push(afterMonth);
    }

    return chunk(
        [...daysBeforeMonth.reverse(), ...daysInMonth, ...daysAfterMonth],
        NUM_DAYS_IN_WEEK
    );
};
