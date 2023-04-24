import moment from 'moment';

export const getDatesBetween = (
    start: moment.Moment,
    end: moment.Moment
): moment.Moment[] => {
    const dates: moment.Moment[] = [];
    const startClone = start.clone();
    while (startClone.isBefore(end)) {
        dates.push(startClone.clone());
        startClone.add(1, 'day');
    }
    return dates;
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
