import moment from 'moment';
import React from 'react';
import useUserStore from '../../stores/userStore';
import type { Tracker } from '../../types';

export interface WeekTrackerBase {
    weekStart: moment.Moment;
    trackerId: string;
}

interface WeekTrackerContextData extends WeekTrackerBase {
    tracker: Tracker | null;
}

export const WeekTrackerContext = React.createContext<WeekTrackerContextData>({
    weekStart: moment(),
    trackerId: '',
    tracker: null,
});

interface WeekTrackerProviderProps {
    children: React.ReactNode;
    value: WeekTrackerBase;
}

export const WeekTrackerProvider: React.FC<WeekTrackerProviderProps> = ({ value, children }) => {

    const {weekStart, trackerId} = value;

    const tracker: Tracker | null = useUserStore((state) => state.trackers[trackerId]) || null;

    return (
        <WeekTrackerContext.Provider value={{ weekStart, trackerId, tracker }}>
            {children}
        </WeekTrackerContext.Provider>
    );
};
