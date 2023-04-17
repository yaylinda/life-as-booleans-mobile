import moment from 'moment';
import React from 'react';
import useUserStore from '../../stores/userStore';

import { EMPTY_TRACKER } from '../../utilities';
import type { Tracker } from '../../types';

export interface TrackerContextBase {
    date: moment.Moment;
    trackerId: string;
    // tracker: Tracker;
}

interface TrackerContextData {
    date: moment.Moment;
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

    const {date, trackerId} = value;

    const tracker: Tracker = useUserStore((state) => state.trackers[trackerId]);

    return (
        <TrackerContext.Provider value={{ date, tracker }}>
            {children}
        </TrackerContext.Provider>
    );
};
