import { useContext } from 'react';
import { TrackerContext } from './TrackerContext';

export const useTracker = () => {
    return useContext(TrackerContext);
};
