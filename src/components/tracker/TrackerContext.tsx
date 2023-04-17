import moment from 'moment';
import React from 'react';

import { EMPTY_TRACKER } from '../../utilities';
import type { Tracker } from '../../types';

export interface TrackerContextBase {
    date: moment.Moment;
    tracker: Tracker;
}

interface TrackerContextData extends TrackerContextBase {
    tracker: Tracker;
}

export const TrackerContext = React.createContext<TrackerContextData>({
    date: moment(),
    tracker: EMPTY_TRACKER(''),
});

interface TrackerProviderProps {
    children: React.ReactNode;
    value: TrackerContextBase;
}

export const TrackerProvider: React.FC<TrackerProviderProps> = ({ value, children }) => {

    const {date, tracker} = value;

    // const tracker: Tracker | null = useUserStore((state) => state.trackers[trackerId]) || null;

    return (
        <TrackerContext.Provider value={{ date, tracker }}>
            {children}
        </TrackerContext.Provider>
    );
};
