import { useContext } from 'react';
import { WeekTrackerContext } from './WeekTrackerContext';

export const useWeekTracker = () => {
    return useContext(WeekTrackerContext);
};
