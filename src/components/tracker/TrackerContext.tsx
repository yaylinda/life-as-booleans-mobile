import moment from 'moment';
import React from 'react';
import { EMPTY_TRACKER } from '../../defaultTrackers';
import useUserStore from '../../stores/userStore';

import type { Tracker } from '../../types';

export interface TrackerContextBase {
    date: moment.Moment;
    trackerId: string;
}

interface TrackerContextData {
    date: moment.Moment;
    dayEpoch: string;
    tracker: Tracker;
}

export const TrackerContext = React.createContext<TrackerContextData>({
    date: moment().startOf('day'),
    dayEpoch: '',
    tracker: EMPTY_TRACKER(''),
});

interface TrackerProviderProps {
    children: React.ReactNode;
    value: TrackerContextBase;
}

export const TrackerProvider: React.FC<TrackerProviderProps> = ({ value, children }) => {

    const {date, trackerId} = value;

    const tracker: Tracker = useUserStore((state) => state.trackers[trackerId]);

    return (
        <TrackerContext.Provider value={{ date, tracker, dayEpoch: `${date.valueOf()}`}}>
            {children}
        </TrackerContext.Provider>
    );
};
