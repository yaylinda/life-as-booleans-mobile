import React from 'react';
import useUserStore from '../../stores/userStore';
import type { Tracker } from '../../types';
import type moment from 'moment';

export interface WeekTrackerBase {
    weekStart: moment.Moment;
    trackerId: string;
}

interface WeekTrackerContextData extends WeekTrackerBase {
    tracker: Tracker;
}

export const WeekTrackerContext = React.createContext<Partial<WeekTrackerContextData>>({});

interface WeekTrackerProviderProps {
    children: React.ReactNode;
    value: WeekTrackerBase;
}

export const WeekTrackerProvider: React.FC<WeekTrackerProviderProps> = ({ value, children }) => {

    const {weekStart, trackerId} = value;

    const tracker: Tracker = useUserStore((state) => state.trackers[trackerId]);

    return (
        <WeekTrackerContext.Provider value={{ weekStart, trackerId, tracker }}>
            {children}
        </WeekTrackerContext.Provider>
    );
};
