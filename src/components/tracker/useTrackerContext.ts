import { useContext } from 'react';
import { TrackerContext } from './TrackerContext';

export const useTrackerContext = () => {
    return useContext(TrackerContext);
};
